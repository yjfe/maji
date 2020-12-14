/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 15:51:56
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    grade: [{ 
      type: 'number', 
      required: true, 
      message: '请选择级别', 
      trigger: 'blur' 
    }]
  },
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'AddressCascader'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'array', // value
    grade: { // 显示层级
      type: 'number',
      default: 4
    },
    world: { // true 国际 false 国内
      type: 'boolean',
      default: false
    }
  }
}
