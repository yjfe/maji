/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 14:15:23
 * @LastEditTime: 2020-12-09 11:22:20
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'

export function queryList(params, options) {
  return httpAgent.POST('txy/project/list', params, options)
}

export function save(params, options) {
  return httpAgent.POST('txy/project/add', params, options)
}

export function update(params, options) {
  return httpAgent.POST('txy/project/update', params, options)
}
/**
 * @method: 查询日志
 * @param {type} 
 * @return: 
 */
export function queryLog(params, options) {
  return httpAgent.POST('txy/project/logPage', params, options)
}
