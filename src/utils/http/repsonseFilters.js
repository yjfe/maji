/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:53
 * @LastEditTime: 2021-01-19 16:37:02
 * @LastEditors: Please set LastEditors
 */
import { Message } from 'element-ui'
import { httpError302 } from './plubs/preivew302'

const isDev = process.env.NODE_ENV === 'development'
const loginLink = '/login.index'
/**
 * response 过滤器
 *
 * @export
 * @param {*} res
 * @returns
 */
export default function filterResponse(config = {}, res = {}) {
  const { options = {} } = config
  if (options.noCheck) { 
    // 忽略过滤器
    return {
      data: res.data,
      response: res
    }
  }
  if (res.code === 400) {
    if (options.preview302) {
      httpError302()
    } else if (options.noAuth) {
      // 开发环境登录鉴权
      Message({
        message: '请先到特定系统登录',
        type: 'error',
        duration: 2 * 1000
      })
      // eslint-disable-next-line no-throw-literal
      throw {
        response: res,
        status: res.status,
        request: res.request,
        responseText: res.data && (res.data.errorMessage || res.data.msg) ? res.data.errorMessage || res.data.msg : '网络错误',
        errorCode: res.data && (res.data.errorCode || res.data.code) !== undefined ? res.data.errorCode || res.data.code : 1
      }
    } else if (!isDev) {
      Message({
        message: '请先登录',
        type: 'error',
        duration: 2 * 1000,
        onClose() {
          window.location.href = loginLink
        }
      })
      // 正式环境未登录跳转
      window.location.href = loginLink
    } 
  } else if (res.data && res.data.code === 2 && !isDev && !options.noAuth) {
    Message({
      message: '无权限',
      type: 'error',
      duration: 2 * 1000,
      onClose() {
        window.location.href = loginLink
      }
    })
  } else if (!res.data || (res.data.errorCode !== 0 && res.data.code !== 0) || res.status !== 200) {
    // eslint-disable-next-line
    throw {
      response: res,
      status: res.status,
      request: res.request,
      responseText: res.data && (res.data.errorMessage || res.data.msg) ? res.data.errorMessage || res.data.msg : '网络错误',
      errorCode: res.data && (res.data.errorCode || res.data.code) !== undefined ? res.data.errorCode || res.data.code : 1
    }
  }
  return {
    data: res.data.data,
    response: res
  }
}
