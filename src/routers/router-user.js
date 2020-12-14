/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 09:31:50
 * @LastEditTime: 2020-12-09 11:52:29
 * @LastEditors: Please set LastEditors
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "document-lego-login" */ '@/views/user/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "document-lego-register" */ '@/views/user/register')
  }
]
