import Vue from 'vue'
import router from '@/routers'
import store from '@/store'
import { cloneDeep } from '@/utils'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import manageJson from '@/views/lego/funComponents/manage.json'
import Schema from './schema'

/**
 * @description: 打开选择组件框
 * @param {type}componentName 组件名
 * @param {type}fileName 文件名 
 * @return: 配置数据或组件
 */
export function getComponentFile(componentName, fileName) {
  const path = `${manageJson.componentsInfo[componentName].type}/${componentName}`
  // 完整数据
  if (fileName === 'data') {
    return cloneDeep(require(`@/views/lego/funComponents/${path}/data.js`).default)
  } 
  // 取schema
  if (fileName === 'schema') {
    return require(`@/views/lego/funComponents/${path}/data.js`).default.schema || {}
  }
  return require(`@/views/lego/funComponents/${path}/${fileName}.vue`).default
}

/**
 * @description: 组件数据schema化，也可用于初始化数据
 * @param {type}data 数据 
 * @return: 配置数据或组件
 */
export function schemaData(data) {
  const componentName = data.type
  const schemaRule = getComponentFile(componentName, 'schema')
  return new Schema(schemaRule, data)
}

/**
 * @description: 获取组件basedata数据，初始化使用
 * @param {type}componentName 组件名
 * @return: 配置数据或组件
 */
export function getComponentData(componentName) {
  // 从schema初始化对数据
  const fromSchema = schemaData({ type: componentName })
  // 兼容未补全schema的组件
  if (Object.keys(fromSchema).length > 1) {   
    return fromSchema
  }
  // 返回基础信息
  return getComponentFile(componentName, 'data').baseData
}

// 获取路由参数的移除无用参数
export function getRouteQuery({ ...query }) {
  delete query.env
  delete query.v
  delete query.pageStatus
  delete query.total
  delete query.isCheckAuth
  return query
}

// 弹出层参数初始化
export function getDialogQuery({ ...query }) {
  delete query.env
  delete query.v
  delete query.pageStatus
  delete query.total
  delete query.pageIndex
  delete query.pageSize
  delete query.isCheckAuth
  return query
}

// 按钮事件 - 链接跳转的解析
// url       链接
// openType  打开方式  0 内部打开  1 外部打开 2 新窗口打开
// query     参数
export function legoRouterLink(url, openType = 0, query = {}) {
  if (!url) return
  let data = query
  let apiUrl = url
  // 根据环境变量处理url
  data = apiResolver(url)
  query = { ...data.requestQuery, ...query }
  apiUrl = data.url
  // 判断打开方式
  if (openType === 0 || openType === 2) {
    // iframe内部打开
    if (/^(http:\/\/|https:\/\/|\/\/)/.test(apiUrl)) {
      // eslint-disable-next-line 
      const goUrl = isGenerateProjectUrl(formatUrl(apiUrl, query))
      // //开头的外部地址
      if (openType === 2) {
        window.open(encodeURI(goUrl))
      } else {
        window.location.href = goUrl
      }
    } else if (openType === 2) {
      // eslint-disable-next-line 
      const goUrl = isGenerateProjectUrl(formatUrl(apiUrl, query))
      window.open(encodeURI(goUrl))
    } else if (apiUrl === router.history.current.path) {
      // 当跳转地址等于本地页面
      router.go(0)
    } else {
      router.push({
        path: apiUrl,
        query
      })
    }
  } else if (openType === 1) {
    // 外部打开，发给父项目
    window.parent.postMessage(
      {
        act: 'routerLink',
        msg: {
          path: url,
          query
        }
      },
      '*'
    )
  }
}

// 判断是否麻鸡项目地址  因为已经有项目页面配置上去了，所以只能通过短改长，之后再考虑优化
export function isGenerateProjectUrl(url) {
  return url.replace(/^\/(lego|generate\/lego)/, '/generate/lego')
}

// 获取按钮事件中的参数配置解析
export function getActionQuery(query, allQuery) {
  if (!query) return {}
  query = query.split(',')
  const formData = {}
  query.forEach((key) => {
    const isObject = key.split(':')
    const isChange = key.split('=')
    let label
    let value
    if (isObject.length === 2) {
      // 解析常参数  如 state:2 
      [label, value] = isObject
      if (label && value) {
        formData[label] = value
      }
    } else if (isChange.length === 2) {
      // 解析对象转化  如 pageId=id 
      [label] = isChange
      value = allQuery[isChange[1]]
    } else {
      label = key
      value = allQuery[label]
      formData[label] = allQuery[label]
    }
    if (label && value) {
      formData[label] = value
    }
  })
  return formData
}

// 规范化url，get请求拼接
export function formatUrl(url, query) {
  const str = Object
    .keys(query)
    // eslint-disable-next-line 
    .filter(item => !isNull(item))
    .map(item => `${item}=${query[item]}`)
    .join('&')
  if (str) {
    return `${url}?${str}`
  }
  return url
}

// 判断是否为空值
export function isNull(str) {
  return !str && str !== 0 && typeof str !== 'boolean'
}

// 打开弹出框
// id        页面id
// width     宽度
// query     参数
// refresh   弹出窗关闭的数据刷新接口
export function openQuoteDialog({ 
  id, width, query, refresh 
}) {
  const node = document.createElement('div')
  // const that = this
  document.body.appendChild(node)
  new Vue({ // eslint-disable-line
    el: node,
    store,
    components: {
      ViewDialog: () => import('@/views/lego/view/dialog')
    },
    data() {
      return {
        pageId: id,
        query
      }
    },
    methods: {
      handleClose() {
        this.$destroy()
      },
      handleRefresh() {
        if (refresh && typeof refresh === 'function') {
          refresh()
        }
      }
    },
    render() {
      return <ViewDialog 
        pageId={this.pageId} 
        onClose={this.handleClose} 
        onRefresh={this.handleRefresh} 
        dialogQuery={this.query} 
        width={width}/>
    }
  })
}

// 模板文本转化
export function getTextRender(template, context) {
  if (template) {
    return template
      .replace(/\{\{(.*?)\}\}/g, (match, key) => (isNull(context[key]) ? '' : context[key]))
      .replace(/\n/g, '<br>')
  }
  return template
}

/**
 * @Date: 2020-06-18 15:10:49
 * @method: 自定义事件的str转function
 * @param data{Object} 组件配置对象
 * @param event{string} 事件类型 
 * @param context{Object} this 上下文 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function useCodeEvent(data = {}, event = '', context) {
  // 匹配事件名
  const str = data.componentEvent ? data.componentEvent[event] : ''
  if (str && !store.getters['manage/isEdit']) {
    /* eslint-disable */
    // 获取参数
    const params = str.match(/\((.+?)\)/)[1].replace(/\s+/g, '').split(',')
    // 获取方法内容
    const functionBody = str.replace(new RegExp(`^([\\s\\S]*)(${params[params.length - 1]})\\)[\\n|\\s]*\\{`), '').replace(/\}[.|\n|\s]*$/, '')
    // 创建function 返回
    return new Function(...params, functionBody).bind(context)
  }
  return () => {}
}
