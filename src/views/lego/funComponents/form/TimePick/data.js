/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 16:56:09
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'TimePick'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'any', // value 
    remark: 'string', // 表单底部的备注
    isRange: { // 范围选择
      type: 'boolean',
      default: false
    },
    valueFormat: { // 标签文本
      type: 'string',
      default: 'HH:mm:ss'
    },
    selectableRange: 'array' // 快捷搜索
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
  }
}
