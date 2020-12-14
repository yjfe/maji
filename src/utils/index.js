/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:53
 * @LastEditTime: 2020-06-04 15:54:45
 * @LastEditors: Please set LastEditors
 */
import { Message } from 'element-ui'

/**
 * 搜索参数更新URL地址
 *
 * @export
 * @returns
 */
export function searchUpdateRoute(query, context) {
  let nQuery = Object.assign({}, query)
  for (const name in nQuery) { // 清除 值为null|undefined
    if (nQuery[name] === null || nQuery[name] === undefined || nQuery[name] === '' || ['pageTotal', 'total'].indexOf(name) !== -1) {
      delete nQuery[name]
    }
  }
  if (!nQuery.pageIndex) {
    const pagesQuery = {}
    pagesQuery.pageIndex = 1
    nQuery = Object.assign({}, nQuery, pagesQuery)
  }
  if (!nQuery.pageSize) {
    const pagesQuery = {}
    pagesQuery.pageSize = 15
    nQuery = Object.assign({}, nQuery, pagesQuery)
  }
  if (context) {
    context.$router.push({ path: context.$router.history.current.path, query: nQuery })
  }
}
/**
 * 搜索参数更新URL地址  新的 不处理pageindex pagesieze
 *
 * @export
 * @returns
 */
export function searchUpdate(query, context) {
  const nQuery = Object.assign({}, query)
  for (const name in nQuery) { // 清除 值为null|undefined
    if (nQuery[name] === null || nQuery[name] === undefined || nQuery[name] === '' || ['pageTotal', 'total'].indexOf(name) !== -1) {
      delete nQuery[name]
    }
  }
  if (context) {
    context.$router.push({ path: context.$router.history.current.path, query: nQuery })
  }
}
/**
 * 获取cookie
 *
 * @export
 * @returns
 */
export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}

/**
 * @description: iframe 下载文件
 * @param downUrl {type} 下载地址
 * @param outTime {type} 销毁时间 = 超时
 * @return: 
 */
export function iframeDownload(downUrl, outTime = 60 * 100000) {
  const prefix = process.env.NODE_ENV === 'development' ? '/api' : ''
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  if (!/^(http|ftp|https):\/\/.*/.test(downUrl)) {
    downUrl = prefix + downUrl
  }
  iframe.src = encodeURI(downUrl)
  document.body.appendChild(iframe)
  setTimeout(
    // eslint-disable-next-line func-names
    function () {
      this.remove()
    }.bind(iframe),
    outTime
  )
  iframe.onload = () => {
    // 拿到iframe 的window对象
    const iframeWin = iframe.contentWindow 
    window.haha = iframe
    if (/(errorMessage|msg)/.test(iframeWin.document.body.innerText)) { 
      // window.document.body.innerText获取页面上的纯文本
      const obj = JSON.parse(iframeWin.document.body.innerText)
      Message({
        message: obj.errorMessage || obj.msg || '未知错误',
        type: 'error',
        duration: 2 * 1000
      })
    }
  }
}

export function dispatch(context, componentName, eventName, params) {
  let parent = context.$parent || context.$root
  let name = parent.$options.componentName
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.componentName
    }
  }
  if (parent) {
    // eslint-disable-next-line prefer-spread
    parent.$emit.apply(parent, [eventName].concat(params))
  }
}

/**
 * @description: 深拷贝 
 * @param {type} 
 * @return: 
 */
export function cloneDeep(source) {
  let result = {}
  if (Array.isArray(source)) {
    result = []
    source.forEach((item) => {
      result.push(typeof item === 'object' ? cloneDeep(item) : item)
    })
  } else {
    for (const key in source) {
      result[key] = typeof source[key] === 'object' ? cloneDeep(source[key]) : source[key]
    } 
  }
  return result
}


/**
 * @description: 颜色解析 
 * @param {type} 
 * @return: 
 */
export function colorRestore(str) {
  const len = str.length
  let rgb = []
  if (len <= 7) {
    if (len === 4) {
      str = str.substr(1)
      str += str
    } else if (len === 7) {
      str = str.substr(1)
    }
    let i = 0
    while (i < 6) {
      const c = parseInt(str.substr(i, 2), 16)
      rgb.push(c)
      i += 2
    }
  } else {
    str.replace(/\((.*?)\)/g, (item) => {
      const rgbStr = item.substr(1, item.length - 2)
      rgb = rgbStr.split(',').map(item => parseInt(item, 10)).splice(0, 3)
    })
  }
  return rgb
}
/**
 * @method: 文本复制
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-06 17:35:44
 */
export function copyText(str) {
  const target = document.createElement('div')
  target.id = 'tempTarget'
  target.style.opacity = '0'
  target.innerText = str
  const range = document.createRange()
  const target2 = document.body.appendChild(target)
  try {
    range.selectNode(target)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    Message.success('复制成功')
  } catch (e) {
    Message.success('复制失败')
  }
  target.remove()
  target2.remove()
}
