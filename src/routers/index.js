/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:59
 * @LastEditTime: 2020-12-09 11:56:37
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
// import errorRouter from './router-error'
import legoEditRouter from './router-legoEdit' // 编辑区 有菜单
import legoPreviewRouter from './router-legoPreview' // 预览区 无菜单
import pageManageRouter from './router-pageManage'
import configRouter from './router-config'
import iframeRouter from './router-iframe'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/generate',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "document-lego-login" */ '@/views/user/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "document-lego-register" */ '@/views/user/register')
    },
    {
      path: '/lego/view',
      name: 'legoView',
      component: () => import(/* webpackChunkName: "document-lego-view" */ '@/views/lego/view'),
      children: [ 
        ...legoPreviewRouter
      ]
    },
    {
      path: '/lego/preview/:id',
      name: 'legoPreview',
      component: () => import(/* webpackChunkName: "document-lego-preview" */ '@/views/lego/preview')
    },
    {
      path: '/lego',
      name: 'legeIndex',
      redirect: '/lego/edit/list',
      component: () => import(/* webpackChunkName: "document-lego-index" */ '@/views/lego/index'),
      children: [ 
        ...legoEditRouter
      ]
    },
    {
      path: '/view/:id',
      name: 'viewShortPath',
      component: () => import(/* webpackChunkName: "document-lego-view-short" */ '@/views/lego/view/short')
    },
    {
      path: '/',
      name: 'index',
      redirect: '/config',
      component: () => import(/* webpackChunkName: "document-index" */ '@/views/index'),
      children: [ 
        ...pageManageRouter,
        ...configRouter,
        ...iframeRouter
        // ...errorRouter
      ]
    }
  ]
})
