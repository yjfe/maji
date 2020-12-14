/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 18:42:38
 * @LastEditors: Please set LastEditors
 */
export default {
  baseData: {
    title: '',
    type: 'PagesForm',
    action: [
      {
        label: '确定',
        type: 'submit', 
        styles: {
          color: 'primary' 
        },
        props: {
          saveApiUrl: '',
          updateApiUrl: ''
        }
      },
      {
        label: '返回',
        type: 'back', 
        styles: {
          color: 'default'
        },
        props: {
          closeRefresh: true
        }
      }
    ],
    apiUrl: '',
    envApi: {}
  },
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'PagesForm'
    },
    title: 'string', // 标题
    detailApiUrl: 'string', // 接口配置 - 详情接口
    authValue: 'string', // 页面权限 
    envApi: 'object', // 环境变量配置
    action: { // 按钮配置
      type: 'array',
      default: [
        {
          label: '确定',
          type: 'submit', 
          styles: {
            color: 'primary' 
          },
          props: {
            saveApiUrl: '',
            updateApiUrl: ''
          }
        },
        {
          label: '返回',
          type: 'back', 
          styles: {
            color: 'default'
          },
          props: {
            closeRefresh: true
          }
        }
      ]
    }
  },
  rules: {
    title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }]
  }
}
