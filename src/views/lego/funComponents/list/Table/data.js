import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Table'
    },
    title: 'string', // 标题
    titleLocation: 'string', // 标题位置
    hasPagination: { // 分页 1 显示 2 隐藏
      type: 'number',
      default: 1
    },
    buttonList: 'array', // 表格按钮配置
    tableSelect: { // 表格勾选 0 关 1 开
      type: 'number',
      default: 0
    },
    tableThSelect: { // 选择列  0 关 1 开
      type: 'number',
      default: 0
    },
    optionsType: { // 数据来源：1 独立接口获取 2 页面接口获取
      type: 'number',
      default: 2
    },
    height: 'string', // 高度
    layout: { // 表格配置
      type: 'array',
      default: [
        {
          label: '列1',
          key: 'key1',
          fixed: false, 
          openType: 0 
        }
      ]
    }
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    totalKey: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    apiUrl: [{ 
      validator(rule, value, callback) {
        if (this.optionsType === 1 && !value) {
          callback(new Error('请输入请求地址'))
        }
        callback()
      }, 
      trigger: 'blur' 
    }]
  }
}
