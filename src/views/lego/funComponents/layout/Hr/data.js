/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 18:01:38
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Hr'
    },
    color: { // 颜色
      type: 'string',
      default: '#333333'
    },
    top: { // 上边距
      type: 'number',
      default: 10
    },
    bottom: { // 下边距
      type: 'number',
      default: 10
    }
  },
  rules: {
  }
}
