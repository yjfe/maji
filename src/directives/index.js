/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-22 14:16:18
 * @LastEditTime: 2019-11-25 18:04:32
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import store from '@/store'

Vue.directive('auth', {
  inserted(el, binding) {
    const { buttonAuth } = store.getters
    const { value } = binding
    if (value && !buttonAuth[value]) {
      el.parentNode.removeChild(el)
    }
  }
})

Vue.directive('buttonState', {
  update(el, binding) {
    const { state, data } = binding.value
    try {
      const query = state.split(',')
      let isShow = true
      query.forEach((key) => {
        const isObject = key.split(':')
        if (isObject.length === 2) {
          const label = isObject[0]
          const value = isObject[1]
          // eslint-disable-next-line
          if (data[label] != value) {
            isShow = false
          }
        }
      })
      if (!isShow) {
        el.parentNode.removeChild(el)
      } else {
        el.parentNode.appendChild(el)
      }
    } catch (error) {
      return true
    }
  }
})
