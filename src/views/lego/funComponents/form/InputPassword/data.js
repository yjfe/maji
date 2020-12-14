/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:33:46
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'InputPassword'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string',
    value: 'any',
    placeholder: 'string', // input attrs placeholder 
    remark: 'string', // 表单底部的备注
    md5: { // md5加密
      type: 'boolean',
      default: true
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
