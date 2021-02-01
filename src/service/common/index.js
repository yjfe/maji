/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:01
 * @LastEditTime: 2021-02-01 10:46:23
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'

/**
 * 获取按钮权限
 *
 * @export
 * @returns
 */
export function getButtonAuth(params, options) {
  return new Promise((resolve) => {
    httpAgent.GET('/automatedadmin/admin/buttonAll.json', params, options).then((res) => {
      const obj = {}
      res.data.forEach((item) => { obj[item] = true })
      resolve(obj)
    })
  })
}

/**
 * 获取登录用户名
 *
 * @export
 * @returns
 */
export function getLoginUser(params, options) {
  return httpAgent.POST('txy/admin/getUserInfo', params, options)
}
