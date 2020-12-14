/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 14:15:23
 * @LastEditTime: 2020-12-09 11:24:15
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'
/**
 * @method: 获取列表
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:41
 */
export function queryList(params, options) {
  return httpAgent.POST('txy/pages/list', params, options)
}
/**
 * @method: 查询日志
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:12:19
 */
export function queryLog(params, options) {
  return httpAgent.POST('txy/pages/logPage', params, options)
}
/**
 * @method: 回滚版本列表
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:11:55
 */
export function queryVersion(params, options) {
  return httpAgent.POST('txy/pages/version/list', params, options)
}
/**
 * @method: 更新回滚指定版本
 * @param {type} 
 * @return:   
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:11:47
 */
export function updateVersion(params, options) {
  return httpAgent.POST('txy/pages/version/update', params, options)
}

/**
 * @method: 查找权限用户
 * @param {type} 
 * @return:   
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-19 10:11:47
 */
export function queryAuthUser(params, options) {
  return httpAgent.GET('txy/pages/getAuthority', params, options)
}

/**
 * @method: 查询项目列表
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-25 10:35:52
 */
export function getProjectList(params, options) {
  return httpAgent.POST('txy/project/findAll', params, options)
}

/**
 * @method: 查询权限用户
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-25 10:35:52
 */
export function getAuthInfo(params, options) {
  return httpAgent.POST('txy/pages/findAllAuthority', params, options)
}
/**
 * @method: 查询权限用户 - 赋予权限
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-25 10:35:52
 */
export function updateAuth(params, options) {
  return httpAgent.POST('txy/pages/authority', params, options)
}

/**
 * @method: 更新上下线状态
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-16 10:21:07
 */
export function updateStatus(params, options) {
  return httpAgent.POST('txy/pages/updatePageStatus', params, options)
}
