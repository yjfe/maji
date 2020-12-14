/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:59
 * @LastEditTime: 2020-06-22 15:57:20
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '/lego/edit/list',
    name: 'legoEditList',
    meta: {
      title: '列表页编辑'
    },
    component: () => import(/* webpackChunkName: "document-lego-edit" */ '@/views/lego/edit/list')
  },
  {
    path: '/lego/edit/form',
    name: 'legoEditForm',
    meta: {
      title: '表单页编辑'
    },
    component: () => import(/* webpackChunkName: "document-lego-edit" */ '@/views/lego/edit/form')
  },
  {
    path: '/lego/edit/detail',
    name: 'legoEditDetail',
    meta: {
      title: '详情页编辑'
    },
    component: () => import(/* webpackChunkName: "document-lego-edit" */ '@/views/lego/edit/detail')
  }
]
