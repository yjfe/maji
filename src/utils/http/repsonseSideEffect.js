/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:53
 * @LastEditTime: 2020-12-01 15:17:33
 * @LastEditors: Please set LastEditors
 */
import {
  Message
} from 'element-ui'
/**
 * response 过滤器
 *
 * @export
 * @param {*} res
 * @returns
 */
export default function sideEffectDefault(state, res) {
  const { options = {} } = res
  if (state === 'start') {
    if (options && options.context) {
      // eslint-disable-next-line no-underscore-dangle
      if (options.context._isVue) {
        options.context.loading = true
      } else if (options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        if (options.context.parentNode.disabled !== undefined) {
          options.context = options.context.parentNode
        }
        options.context.disabled = true
      }
    }
  } else if (state === 'complete') {
    if (options && options.context) {
      // eslint-disable-next-line no-underscore-dangle
      if (options.context._isVue) {
        options.context.loading = false
        options.context = null
      } else if (options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        options.context.disabled = false
      }
    }
    if (options && options.successMsg) {
      Message({
        message: options.successMsg,
        type: 'success',
        duration: 2 * 1000
      })
    }
  } else if (state === 'filterError' || state === 'ajaxError') {
    if (options.isErrorMessage) return
    options.isErrorMessage = true
    if (options && options.context) {
      // eslint-disable-next-line no-underscore-dangle
      if (options.context._isVue) {
        options.context.loading = false
        options.context = null
      } else if (options.context.nodeType === 1) { // options为dom对象则修改disabled状态
        options.context.disabled = false
      }
    }
    if (!(options && options.errorMsg === 'none')) {
      Message({
        message: options.errorMsg || res.error.responseText || '网络错误',
        type: 'error',
        duration: 2 * 1000
      })
    }
  }
}
