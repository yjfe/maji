/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 18:01:07
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Tabs'
    },
    label: { // 名称
      type: 'string',
      default: '名称'
    },
    value: 'any',
    searchScope: { // 搜索范围 0 全局 1指定组件
      type: 'number',
      default: 0
    },
    hasSearch: { // 开启搜索
      type: 'boolean',
      default: false
    },
    layout: { // 选项配置
      type: 'array',
      default: [
        {
          label: '选项1',
          value: '0'
        }
      ]
    },
    searchTarget: 'array'
  },
  rules: {
    value: [
      { required: true, message: '请输入选中默认tab', trigger: 'blur' }
    ],
    key: [
      // { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  }
}
