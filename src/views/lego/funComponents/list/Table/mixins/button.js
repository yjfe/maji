/*
 * @Author: your name
 * @Date: 2020-06-15 15:36:24
 * @LastEditTime: 2020-10-15 17:22:46
 * @LastEditors: Please set LastEditors
 * @Description: preview页面中的按钮功能
 * @FilePath: \generate\src\views\lego\funComponents\list\Table\mixins\button.js
 */ 
import Vue from 'vue'
import { iframeDownload } from '@/utils'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import * as httpAgent from '@/utils/http'
import { 
  getDialogQuery, 
  legoRouterLink, 
  getActionQuery,
  openQuoteDialog
} from '@/views/lego/utils'

export default {
  methods: {
    /**
     * @method: 按钮权限解析判断
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-23 16:46:20
     */
    getPageButtonAuth({ auth, state, data }) {
      try {
        // 是否开启权限校验
        if (!this.isCheckAuch) return true
        let isShow = true
        // 处理权限值
        if (auth && !this.pageButtonAuth[auth]) {
          return false
        }
        // 处理状态规则
        if (state) {
          // 在正则语句中插入值
          Object.keys(data).forEach((key) => {
            state = state.replace(new RegExp(`${key}([=||!])`, 'g'), `${data[key]}$1`)
          })
          // eslint-disable-next-line
          isShow = eval(state)
        }
        return isShow
      } catch (error) {
        return false
      }
    },
    /**
     * @method: 点击事件解析 表格头部事件
     * @param option{Object} 按钮配置
     * @param query{Object} 表格行参数
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 11:52:25
     */
    handleClickTableAction(option, e) {
      // 编辑页面加点击无效
      if (!this.isEdit) {
        const formData = this.getTableActionQuery(option, this.tableSelect)
        // 按钮事件分发
        this.switchButtonAction(option, formData, 'table', this.tableData, e)
      }
    },
    /**
     * @method: 点击事件解析 表格行事件
     * @param option{Object} 按钮配置
     * @param query{Object} 表格行参数
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 11:52:25
     */
    handleClickRowAction(btnOption, query, e) {
      // 编辑页面加点击无效
      if (!this.isEdit) {
        const formData = getActionQuery(btnOption.query, query)
        this.switchButtonAction(btnOption, formData, 'th', query, e)
      }
    },
    /**
     * @method: 解析事件类型
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-08 11:35:19
     */
    switchButtonAction(btnOption, formData, place = 'th', rowData, e) {
      const { type } = btnOption
      switch (type) {
        case 'link': // 跳转链接
          this.actionLink(btnOption, formData, rowData)
          break
        case 'confirm': // 确认弹窗
          if (place === 'table') {
            const data = { ...getDialogQuery({ ...this.pageQuery }), ...formData }
            this.actionConfirm(btnOption, data, rowData, 'confirm')
          } else {
            this.actionConfirm(btnOption, formData, rowData, 'confirm')
          }
          break
        case 'popoverConfirm': // 确认弹出框
          if (place === 'table') {
            const data = { ...getDialogQuery({ ...this.pageQuery }), ...formData }
            this.actionConfirm(btnOption, data, rowData, 'popoverConfirm', e)
          } else {
            this.actionConfirm(btnOption, formData, rowData, 'popoverConfirm', e)
          }
          break  
        case 'dialog': // 弹出层
          this.actionDialog(btnOption, formData, place)
          break
        case 'export': // 导出
          if (place === 'table') {
            const data = { ...getDialogQuery({ ...this.pageQuery }), ...formData }
            this.actionExport(btnOption, data, place)
          } else {
            this.actionExport(btnOption, formData, place)
          }
          break
        default:
          break
      }
    },
    /**
     * @method: 支持多选的数据处理
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-23 16:54:55
     */
    getTableActionQuery(option, data) {
      try {
        let { query } = option
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
            if (value && label) {
              formData[label] = value
            }
          } else if (isObject.length === 1) {
            if (isChange.lenth === 2) {
              // 解析对象转化  如 pageId=id 
              [label, value] = isChange
            } else {
              value = key
              label = key
            }
            if (label && value) {
              const arr = []
              data.forEach(item => item[value] && arr.push(item[value]))
              if (arr.length === 0) {
                formData[label] = this.pageQuery[value] || arr
              } else {
                formData[label] = arr
              }
            }
          }
        })
        return formData
      } catch (error) {
        console.log(error)
        return {}
      }
    },
    /**
     * @method: 点击事件转发 -> 跳转链接
     * @param option{Object} 按钮配置
     * @param query{Object} 请求参数
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 14:20:58
     */
    actionLink(option, query = {}, row) {
      legoRouterLink(this.getTextRender(option.url, row), option.openType, query)
    },
    /**
     * @method: 点击事件转发 -> 确认事件
     * @param option{Object} 按钮配置
     * @param query{Object} 请求参数
     * @param rowData{Object} 当前行参数
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 14:20:58
     */
    actionConfirm(option, query = {}, rowData = {}, type = 'confirm', e = {}) {
      const { url, message } = option
      try {
        Object.keys(query).forEach((key) => {
          if (Array.isArray(query[key]) && query[key].length < 1) {
            this.$message.error('请先选择表格内的数据！')
            throw new Error('请先选择表格内的数据！')
          }
        })
        const messageStr = this.getTextRender(message, rowData).replace(/\n/g, '<br>')
        let fun
        if (type === 'popoverConfirm') {
          fun = this.popoverConfirmEvent(messageStr, e)
        } else {
          fun = this.confirmEvent(messageStr)
        }
        fun.then(() => {
          const apiData = apiResolver(url)
          httpAgent[apiData.type](apiData.url, 
            { ...apiData.requestQuery, ...query }, 
            { 
              context: this, 
              successMsg: '操作成功', 
              noAuth: true, 
              preview302: true, 
              ...apiData.option 
            }).then(() => {
            this.getList()
          })
        })
      } catch (error) {
        // 监控为主，不报错
        // console.error(error)
      }
    },
    /**
     * @Date: 2020-06-19 16:03:57
     * @method: 以弹出窗的形式的确认框
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    confirmEvent(messageStr) {
      return this.$confirm(messageStr, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    /**
     * @Date: 2020-06-19 16:03:57
     * @method: 以弹出框的形式的确认框
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    popoverConfirmEvent(messageStr, e) {
      return this.openPopover(messageStr, e)
    },
    /**
     * @method: 点击事件转发 -> 弹出层
     * @param option{Object} 按钮配置
     * @param query{Object} 请求参数
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 17:43:05
     */
    actionDialog(option, query = {}) {
      openQuoteDialog({
        width: option.dialogWidth,
        id: option.quotePageId,
        query,
        refresh: this.getList
      })
    },
    
    /**
     * @method: 按钮转换出请求地址给上传事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-19 17:06:37
     */
    buttonApiResolver(url) {
      const uploadUrl = apiResolver(url).url
      return uploadUrl
    },
    /**
     * @method: 
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-19 17:12:17
     */
    handleImportSuccess(res = {}) {
      this.$message.success(res.msg || res.errorMsg || '上传成功')
      // 导入成功
      this.getList()
    },
    /**
     * @method: 按钮事件解析 - 导出事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-19 17:15:45
     */
    actionExport(btnOption, formData) {
      const { url, requestQuery, option } = apiResolver(btnOption.url)
      const exportData = { ...requestQuery, ...this.query, ...formData }
      const exportType = btnOption.exportType || 0
      if (exportType === 0) {
        // 直接导出
        const queryArr = []
        Object.keys(exportData).forEach(item => queryArr.push(`${item}=${exportData[item]}`))
        const queryStr = queryArr.join('&')
        let httpUrl = ''
        if (/^(https|http|\/)/.test(url)) {
          httpUrl = `${url}${queryStr ? `?${queryStr}` : ''}`
        } else {
          httpUrl = `${window.location.protocol}${url}?${queryStr ? `?${queryStr}` : ''}`
        }
        // 判断是否是导出直接下载文件
        if (/.(xsls|pdf|doc|docx|txt|rar|zip|xls)/.test(httpUrl)) {
          // 直接下载
          iframeDownload(httpUrl)
        } else {
          // 执行一次接口，确认参数正确、文件存在
          httpAgent.GET(httpUrl, {}, { 
            context: this, 
            noAuth: true, 
            noCheck: true, 
            preview302: true, 
            ...option 
          }).then((res) => {
            if (res.data && (res.data.msg || res.data.errorMessage)) {
              this.$message.error(res.data.msg || res.data.errorMessage)
            } else {
              // 拿到的是文件流，iframe下载
              iframeDownload(httpUrl)
            }
          })
        }
      } else {
        // 外部导出 - 各项目自定义接收
        window.parent.postMessage(
          {
            act: 'export',
            msg: {
              id: this.item.id,
              exportType,
              url,
              query: exportData
            }
          },
          '*'
        )
      }
    },
    /**
     * @Date: 2019-11-04 16:30:30
     * @method: 表格内的跳转链接
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleTdAction(tr, row) {
      const formData = getActionQuery(tr.query, row)
      // 必须存在url
      if (tr.url) {
        /** 
         * tr.openType 打开方式
         * 1：内部打开
         * 2：外部打开
         * 3：新页面打开
         * 4：弹出层打开
         * */ 
        if (tr.openType === 3) {
          this.actionDialog(Object.assign({}, tr, { quotePageId: tr.url }), formData, 'td')
        } else {
          this.actionLink(tr, formData, formData)
        }
      }
    },
    /**
     * @Date: 2019-11-04 16:30:44
     * @method: 外部导入
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleOutsideImport(e) {
      const query = { ...this.pageQuery, ...this.getTableActionQuery(e.options, this.tableSelect) }
      const { url, requestQuery } = apiResolver(e.options.url)
      window.parent.postMessage({
        act: 'import',
        msg: {
          id: this.item.id,
          file: e.file,
          url,
          query: { ...requestQuery, ...query },
          key: e.options.apiName
        }
      }, '*')
    },
    /**
     * @method: 初始化按钮的状态规则判断
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    initButtonStateRule(layout = []) {
      layout.forEach((item) => {
        if (item.type === 'action') {
          item.btnList.forEach((btn) => {
            if (btn.state && typeof btn.state === 'string') {
              btn.stateRule = btn.state
                .replace(/(\s*\|\|\s*)/g, '||') // 处理空格
                .replace(/(\s*&&\s*)/g, '&&') // 处理空格
                .replace(/!:/g, '!=') // 兼容旧方案
                .replace(/:/g, '==') // 兼容旧方案
                .replace(/,/g, '&&') // 兼容旧方案
            }
          })
        }
      })
    },
    /**
     * @Date: 2020-06-22 10:13:06
     * @method: 按钮事件 - 弹出框确认
     * @param messageStr{string} 消息内容文本
     * @param e{domNode} dom节点
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    openPopover(messageStr, e) {
      return new Promise((resolve, reject) => {
        const btnNode = e.target 
        const style = `pointerEvents:none;display:block;position: fixed;
          left:${btnNode.offsetLeft}px;top:${btnNode.offsetTop}px;height:32px;width:${btnNode.offsetWidth}px`
        const node = document.createElement('div')
        // const that = this
        document.body.appendChild(node)
        new Vue({ // eslint-disable-line
          el: node,
          components: {
            ElPopover: () => import('element-ui/lib/popover'),
            ElButton: () => import('element-ui/lib/button')
          },
          data() {
            return {
              style: style,
              messageStr: messageStr
            }
          },
          mounted() {
            setTimeout(() => {
              this.$refs.ElPopover.doShow()
            }, 100)
          },
          methods: {
            handleClose() {
              this.$refs.ElPopover.doClose()
              reject()
            },
            handleRemove() {
              // 关闭窗口销毁vue和dom
              const dom = this.$refs.ElPopover.$el
              setTimeout(() => {
                this.$destroy()
                dom.remove()
              }, 200)
            },
            handleSuccess() {
              this.$refs.ElPopover.doClose()
              resolve()
            }
          },
          render() {
            return <ElPopover
              ref="ElPopover"
              placement="top"
              width="200"
              onHide={this.handleRemove}>
              <p>{this.messageStr}</p>
              <div style="text-align: right; margin: 0">
                <ElButton size="mini" type="text" onClick={this.handleClose}>取消</ElButton>
                <ElButton type="primary" size="mini" onClick={this.handleSuccess}>确定</ElButton>
              </div>
              <div style={this.style} slot="reference"></div>
            </ElPopover>
          }
        })
      })
    }
  }
}
