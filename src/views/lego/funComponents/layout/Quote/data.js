/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 16:02:23
 * @LastEditors: Please set LastEditors
 */
export default {
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
