/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-12-07 10:51:19
 * @LastEditTime: 2020-12-09 15:44:51
 * @LastEditors: Please set LastEditors
 */
const { hostname } = window.location
const globalConfig = {
  projectName: '麻鸡搭建系统'
}

switch (hostname) {
  case 'generate.huoxingplan.com':
    Object.assign(globalConfig, {
      env: 'online'
    })
    break
  default:
    Object.assign(globalConfig, {
      env: 'tx'
    })
    break
}
export default globalConfig
