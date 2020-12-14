/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:17:57
 * @LastEditTime: 2020-12-01 15:10:51
 * @LastEditors: Please set LastEditors
 */
import { Message } from 'element-ui'
import historyDataUpdate from '@/views/lego/unifyHistoryDataUpdate'
import { schemaData } from '@/views/lego/utils'

// state
const state = {
  isEdit: false,
  floorList: [], // 总数据
  activeIndex: undefined, // 选择楼层
  nowData: {}, // 当前编辑数据
  idModule: {}, // id对照表
  activeId: '', // 当前选中的Id值
  pagesModuleId: '', // 页面配置项 - 页面id
  quoteIdModule: {}, // 引用数据，缓存不可编辑的
  level: sessionStorage.getItem('level') || 3
}

// getters
const getters = {
  isEdit: state => state.isEdit,
  floorList: state => state.floorList,
  activeIndex: state => state.activeIndex,
  nowData: state => state.nowData,
  activeId: state => state.activeId,
  idModule: state => state.idModule,
  pagesModuleId: state => state.pagesModuleId,
  quoteIdModule: state => state.quoteIdModule,
  level: state => state.level
}

// actions
const actions = {
  /**
   * @method: 设置编辑状态
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-06-24 11:04:59
   */
  setIsEdit({ commit }, value) {
    commit('SET_IS_EDIT', value)
  },
  /**
   * @method: 设置页面配置信息
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-29 11:37:08
   */
  setPagesModuleId({ commit }, value) {
    commit('SET_PAGES_MODULE_ID', value)
  },
  /**
   * @method: vuex数据初始化
   * @param {type} 
   * @return: 
   * @Author: yamanashi12（yamanashi12@qq.com）
   * @Date: 2019-05-28 11:39:53
   */
  setLegoInit({ commit, dispatch }, { floorList, idModule, pagesModuleId }) {
    dispatch('setActiveIndex', undefined)
    commit('SET_FLOOR', floorList || [])
    commit('SET_MODULE', idModule || {})
    commit('SET_PAGES_MODULE_ID', pagesModuleId || '')
    commit('SET_ACTIVE_ID', pagesModuleId || '')
  },
  /**
   * @description: 替换全部楼层
   * @param {type} 
   * @return: 
   */
  setFloor({ commit }, params) {
    commit('SET_FLOOR', params)
  },
  /**
   * @description: 替换全部模块数据
   * @param {type} 
   * @return: 
   */
  setModule({ commit }, params) {
    commit('SET_MODULE', params)
  },
  /**
   * @description: 添加楼层 数据
   * @param {type} 
   * @return: 
   */
  addFloorList({ commit, dispatch, state }, { id, data, index }) {
    // 增加逻辑 禁止多个搜索框
    const reg = /^(Search)[0-9]/
    if (reg.test(id) && state.floorList.find(item => reg.test(item))) {
      Message.error('只能添加一个筛选区组件')
      return
    }
    const lastIndex = state.activeIndex === undefined ? state.floorList.length : 0
    dispatch('addModule', { id, data })
    dispatch('setActiveId', id)
    dispatch('setActiveIndex', index || state.activeIndex + 1 || lastIndex)
    commit('ADD_FLOOR_LIST', { id, index: index || state.activeIndex })
  },
  /**
   * @description: 添加一个模块数据
   * @param {type} 
   * @return: 
   */
  addModule({ commit }, params) {
    const { id, data } = params
    // 获取schema规则
    try {
      // schemaRule规则校验
      commit('ADD_MODULE', { [id]: schemaData(data) })
    } catch (error) {
      console.error(new Error('错误的组件类型'))
    }
  },
  /**
   * @description: 添加多个模块数据
   * @param {type} 
   * @return: 
   */
  addModules({ dispatch }, params) {
    Object.keys(params).forEach(key => dispatch('addModule', { id: key, data: params[key] }))
  },
  /**
   * @description: 设置楼层选择
   * @param {type} 
   * @return: 
   */
  setActiveIndex({ commit }, params) {
    commit('SET_ACTIVE_INDEX', params)
  },
  /**
   * @description: 上移
   * @param {type} 
   * @return: 
   */
  moveTop({ commit }) {
    commit('MOVE_TOP')
  },
  /**
   * @description: 下移
   * @param {type} 
   * @return: 
   */
  moveBottom({ commit }) {
    commit('MOVE_BOTTOM')
  },
  /**
   * @description: 交换位置
   * @param {type} 
   * @return: 
   */
  moveInsert({ commit }, params) {
    commit('MOVE_INSERT', params)
  },
  /**
   * @description: 删除
   * @param {type} 
   * @return: 
   */
  removeFloor({ commit, dispatch, state }, params) {
    const index = state.floorList.indexOf(params)
    const len = index - 1
    const goId = len >= 0 ? state.floorList[len] : ''
    commit('REMOVE_FLOOR', index)
    dispatch('removeModule', { module: params, go: goId })
  },
  /**
   * @description: 删除模块
   * @param {type} 
   * @return: 
   */
  removeModule({ commit, state }, params) {
    const { module, go } = params
    if (!module) return
    function getALLChildren(id, arr) {
      Object.keys(state.idModule).forEach((key) => {
        const item = state.idModule[key]
        if (item.parent === id) {
          arr.push(key)
          getALLChildren(key, arr)
        }
      })
      return arr
    }
    const delId = getALLChildren(module, [module])
    if (delId.length !== 0) {
      commit('RESET_NOW_MODULE', go)
    }
    commit('REMOVE_MODULE', delId)
  },
  /**
   * @description: 当前选中的id
   * @param {type} 
   * @return: 
   */
  setActiveId({ commit }, params) {
    commit('SET_ACTIVE_ID', params)
  },
  /**
   * @description: 设置引用组件的数据模型
   * @param {type} 
   * @return: 
   */
  setQuoteIdModule({ commit }, params) {
    Object.keys(params).forEach((key) => {
      try {
        const data = params[key]
        params[key] = schemaData(data)
      } catch (error) {
        console.error(new Error('错误的组件类型'))
      }
    })
    commit('SET_QUOTE_ID_MODULE', params)
  },
  /**
   * @description: 设置操作级别
   * @param {type} 
   * @return: 
   */
  setLevel({ commit }, params) {
    commit('SET_LEVEL', params)
  }
}
// mutations
const mutations = {
  SET_IS_EDIT(state, params) {
    state.isEdit = params
  },
  SET_PAGES_MODULE_ID(state, params) {
    state.pagesModuleId = params
  },
  SET_FLOOR(state, params) {
    state.floorList = params
  },
  SET_ACTIVE_INDEX(state, params) {
    state.activeIndex = params
  },
  ADD_MODULE(state, params) {
    // 统一的数据入口旧数据兼容 升级
    historyDataUpdate(params)
    // 不在设置当前选择id，分开处理
    // state.activeId = params.id
    Object.assign(state.idModule, params)
    // if (state.activeIndex !== undefined) {
    //   state.floorList.splice(state.activeIndex + 1, 0, params)
    // } else {
    //   state.floorList.push(params)
    // }
  },
  ADD_FLOOR_LIST(state, { id, index }) {
    if (index) {
      state.floorList.splice(index, 0, id)
    } else if (state.activeIndex !== undefined) {
      state.floorList.splice(state.activeIndex + 1, 0, id)
    } else {
      state.floorList.push(id)
    }
  },
  MOVE_TOP(state) {
    const arr = state.floorList
    const index = state.activeIndex
    arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]))
    state.activeIndex -= 1
  },
  MOVE_BOTTOM(state) {
    const arr = state.floorList
    const index = state.activeIndex
    arr.splice(index + 1, 1, ...arr.splice(index, 1, arr[index + 1]))
    state.activeIndex += 1
  },
  MOVE_INSERT(state, { start, end }) {
    const arr = state.floorList
    arr.splice(end, 0, arr.splice(start, 1)[0])
    // str = arr[start]
    // arr[start] = arr[end]
    // arr[end] = str
    state.activeIndex = end
    state.activeId = state.floorList[end]
  },
  REMOVE_FLOOR(state, params) {
    state.floorList.splice(params, 1)
  },
  REMOVE_MODULE(state, params) {
    params.forEach(item => delete state.idModule[item])
  },
  SET_ACTIVE_ID(state, params) {
    state.activeId = params
  },
  SET_MODULE(state, params) {
    // 统一的数据入口旧数据兼容 升级
    historyDataUpdate(params)
    state.idModule = params
  },
  RESET_NOW_MODULE(state, params) {
    // 删除某组件后清空选中
    state.activeId = params || ''
    state.activeIndex = null
  },
  SET_QUOTE_ID_MODULE(state, params) {
    Object.assign(state.quoteIdModule, params)
  },
  SET_LEVEL(state, params) {
    sessionStorage.setItem('level', params)
    state.level = params
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
