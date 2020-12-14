/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:01
 * @LastEditTime: 2020-12-09 11:26:52
 * @LastEditors: Please set LastEditors
 */
import { map } from 'rxjs/operators'
import * as httpAgent from '@/utils/http'

/**
 * 获取按钮权限
 *
 * @export
 * @returns
 */
export function getButtonAuth(params, options) {
  return httpAgent.GET('txy/admin/buttonAll.json', params, options).pipe(
    map((res) => {
      const obj = {}
      res.data.forEach((item) => { obj[item] = true })
      return obj
    })
  )
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
