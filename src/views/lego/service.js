/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-02 17:35:50
<<<<<<< HEAD
 * @LastEditTime: 2020-11-02 17:25:21
=======
 * @LastEditTime: 2020-12-01 15:04:57
>>>>>>> 剥离核心功能
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'

/**
 * @method: 编辑
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:35
 */
export function update(params, options) {
  return httpAgent.POST('txy/pages/update', params, options)
}
/**
 * @method: 新增
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:30
 */
export function save(params, options) {
  return httpAgent.POST('txy/pages/add', params, options)
}
/**
 * @method: 最新详情
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:30
 */
export function getNewData(params, options) {
  return httpAgent.POST('txy/pages/getLatestByPagesId', params, options)
}
/**
 * @method: 指定版本
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:30
 */
export function getVersionData(params, options) {
  return httpAgent.POST('txy/pages/getById', params, options)
}
/**
 * @method: 最新正式环境 详情 带权限
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:30
 */
export function getAuthData(params, options) {
  return httpAgent.POST('txy/pages/preview', params, options)
}
