/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-19 16:37:49
 * @LastEditTime: 2020-11-26 14:41:05
 * @LastEditors: Please set LastEditors
 */

export default [
  {
    path: '/iframe/*',
    component: () => import(/* webpackChunkName: "generate-system-system" */ '@/views/iframe/index')
  }
]
