/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 14:15:23
 * @LastEditTime: 2020-11-04 15:50:45
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'

export function login(params, options) {
  return httpAgent.POST('txy/user/login', params, options)
}

export function register(params, options) {
  return httpAgent.POST('txy/user/register', params, options)
}
