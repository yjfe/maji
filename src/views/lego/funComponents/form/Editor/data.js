/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 16:59:44
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Editor'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'any', // value 
    remark: 'string', // 表单底部的备注
    extend: { // value数据类型
      type: 'array',
      default: ['addImg', 'addVideo']
    }
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
    // value: [{ required: true, message: '请输入默认值', trigger: 'blur' }],
    // placeholder: [{ required: true, message: '请输入提示文本', trigger: 'blur' }]
  }
}
