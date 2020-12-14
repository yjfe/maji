/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:41:28
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Content'
    },
    value: 'string',
    color: { // 颜色
      type: 'string',
      default: '#333333'
    }
  },
  rules: {
    value: [{ required: true, message: '请输入描述文本', trigger: 'blur' }]
  }
}
