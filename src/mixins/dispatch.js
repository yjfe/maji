/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-01-10 16:06:46
 * @LastEditTime: 2020-11-08 10:47:12
 * @LastEditors: Please set LastEditors
 */
export default {
  methods: {
    dispatch(context, componentName, eventName, params) {
      let parent = context.$parent || context.$root
      let name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        // eslint-disable-next-line prefer-spread
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    }
  }
}
