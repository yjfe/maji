/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:54:52
 * @LastEditors: Please set LastEditors
 */
export default {
  baseData: {
    type: 'Quote',
    quotePageId: ''
  },
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Quote'
    },
    quotePageId: 'string'
  },
  rules: {
    quotePageId: [
      { required: true, message: '请输入项目ID', trigger: 'blur' }
    ]
  }
}
