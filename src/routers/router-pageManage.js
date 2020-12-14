/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 09:31:50
 * @LastEditTime: 2020-03-24 10:17:49
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '/page/manage',
    name: 'pageManage',
    meta: {
      title: '页面管理'
    },
    component: () => import(/* webpackChunkName: "document-page-manage" */ '@/views/pageManage')
  },
  {
    path: '/page/count',
    name: 'pageCount',
    meta: {
      title: '页面管理'
    },
    component: () => import(/* webpackChunkName: "document-page-Count" */ '@/views/pageCount/index')
  }
]
