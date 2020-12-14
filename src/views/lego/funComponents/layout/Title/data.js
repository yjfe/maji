/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 18:02:17
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Title'
    },
    desc: { // 描述
      type: 'string',
      default: '描述'
    },
    title: { // 主标题
      type: 'string',
      default: '主标题'
    }
  },
  rules: {
    title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }]
  }
}
