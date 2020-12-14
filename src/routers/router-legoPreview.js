/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:59
 * @LastEditTime: 2019-07-05 16:37:55
 * @LastEditors: yamanashi12
 */
export default [
  {
    path: 'detail/:id',
    name: 'legoViewDetail',
    meta: {
      title: '详情页预览'
    },
    component: () => import(/* webpackChunkName: "document-lego-view-detail" */ '@/views/lego/view/ModelDetail')
  },
  {
    path: 'list/:id',
    name: 'legoViewList',
    meta: {
      title: '列表页预览'
    },
    component: () => import(/* webpackChunkName: "document-lego-view-list" */ '@/views/lego/view/ModelList')
  },
  {
    path: 'form/:id',
    name: 'legoViewForm',
    meta: {
      title: '表单页预览'
    },
    component: () => import(/* webpackChunkName: "document-lego-view-form" */ '@/views/lego/view/ModelForm')
  }
]
