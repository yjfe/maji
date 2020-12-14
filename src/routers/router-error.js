/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:21:13
 * @LastEditTime: 2020-11-26 15:03:04
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "generate-system-system" */ '@/views/system/NotFound')
  }
]
