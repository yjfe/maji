/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 09:31:50
 * @LastEditTime: 2019-09-26 10:01:32
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '/config',
    name: 'config',
    meta: {
      title: '页面管理'
    },
    component: () => import(/* webpackChunkName: "document-config" */ '@/views/config')
  }
]
