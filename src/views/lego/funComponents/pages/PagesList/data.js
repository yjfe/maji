/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 18:41:46
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'PagesList'
    },
    title: 'string', // 标题
    apiUrl: 'string', // 接口配置 - 列表接口
    authValue: 'string', // 页面权限 
    envApi: 'object', // 环境变量配置
    action: { // 按钮配置
      type: 'array',
      default: [
        {
          label: '返回',
          type: 'back', 
          styles: {
            color: 'default'
          },
          props: {}
        }
      ]
    }
  },
  rules: {
    title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }]
    // apiUrl: [{ required: true, message: '请输入接口地址', trigger: 'blur' }]
    // apiName: [{ required: true, message: '请输入识别名称', trigger: 'blur' }],
    // envTest: [{ required: true, message: '请输入测试环境地址', trigger: 'blur' }],
    // envOnline: [{ required: true, message: '请输入正式环境地址', trigger: 'blur' }]
  }
}
