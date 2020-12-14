/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:57
 * @LastEditTime: 2020-11-26 14:42:30
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/service/common'
import manage from './modules/manage'
// import MenuList from '@/views/menu.json'

Vue.use(Vuex)

// state
const state = {
  loading: false,
  layoutGrid: true, // 是否栅格布局
  menuList: [
    {
      menuName: '页面管理',
      url: '/page/manage'
    },
    {
      menuName: '项目管理',
      url: '/config'
    }
  ],
  breadcrumb: [],
  buttonAuth: {},
  pageButtonAuth: {}, // 配置页面权限
  nowProject: {},
  userInfo: {}
}

// getters
const getters = {
  loading: state => state.loading,
  layoutGrid: state => state.layoutGrid,
  menuList: state => state.menuList,
  breadcrumb: state => state.breadcrumb,
  buttonAuth: state => state.buttonAuth,
  pageButtonAuth: state => state.pageButtonAuth,
  nowProject: state => state.nowProject,
  userInfo: state => state.userInfo
}

// actions
const actions = {
  /**
   * @method: 设置按钮权限
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-27 15:50:04
   */
  getButtonAuth({ commit }) {
    const ButtonAuth = sessionStorage.getItem('ButtonAuth')
    if (ButtonAuth) {
      commit('SET_BUTTON_AUTH', JSON.parse(ButtonAuth))
    } else {
      api.getButtonAuth().then((res) => {
        commit('SET_BUTTON_AUTH', res)
      })
    }
  },
  /**
   * @method: 设置配置页按钮权限
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-27 15:50:04
   */
  setPageButtonAuth({ commit }, { data, type }) {
    if (data && data.length > 0) {
      const obj = {}
      data.forEach((item) => { obj[item] = true })
      commit('SET_PAGE_BUTTON_AUTH', {
        data: obj,
        type
      })
    }
  },
  /**
   * @method: 根据页面权限获取权限值
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-08-22 17:47:05
   */
  getIframeAuth({ commit }) {
    // TODO: 请求接口获取权限
    try {
      // eslint-disable-next-line
      const value = window.top.__VUE_DEVTOOLS_GLOBAL_HOOK__.store.getters.buttonAuth
      commit('SET_BUTTON_AUTH', value)
    } catch (error) {
      return false
    }
  },
  /**
   * @method: 获取菜单列表
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-28 14:20:46
   */
  getMenuList({ state }) {
    if (Array.isArray(state.menuList) && state.menuList.length === 0) {
      // commit('MenuList', MenuList)
      // api.getMenuList().then((res) => {
      //   commit('MenuList', res.data)
      // })
    }
  },
  
  /**
   * @method: 获取用户信息
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-28 14:20:46
   */
  // eslint-disable-next-line no-unused-vars
  async getUserInfo({ commit }) {
    const res = await window.tcbApp.auth().getCurrenUser()
    if (res) {
      window.uuid = res.uid
      commit('SET_USER_NAME', { 
        userName: res.customUserId
      })
    }
  },
  /**
   * @method: 设置当前项目
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-27 15:50:24
   */
  setNowProject({ commit }, value) {
    commit('SET_NOW_PROJECT', value)
  },
  /**
   * @method: 设置左侧菜单布局
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-27 15:50:33
   */
  setLayoutGrid({ commit }, value) {
    commit('LayoutGrid', value)
  }
}

// mutations
const mutations = {
  LayoutGrid(state, value) {
    // 设置左侧siderBar是否可见
    state.layoutGrid = value
  },
  SetBreadcrumb(state, value) {
    state.breadcrumb = value
  },
  MenuList(state, value) {
    // 将子菜单拿出来
    const setArr = (list) => {
      list.map((item) => {
        if (item.chirdMenuList && item.chirdMenuList.length > 0) {
          item.chirdMenuList = setArr(item.chirdMenuList)
        }
        return item
      })
      return list
    }
    state.menuList = setArr(value)
  },
  SET_BUTTON_AUTH(state, value) {
    Object.assign(state.buttonAuth, value)
  },
  SET_PAGE_BUTTON_AUTH(state, { data, type }) {
    if (type === 'add') {
      Object.assign(state.pageButtonAuth, data)
    } else if (type === 'new') {
      state.pageButtonAuth = data
    }
  },
  SET_PROJECT_LIST(state, value) {
    state.projectList = value
  },
  SET_NOW_PROJECT(state, value) {
    state.nowProject = value
  },
  SET_USER_NAME(state, value) {
    state.userInfo = value
  }
}

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    manage
  },
  strict: false
})

export default store
