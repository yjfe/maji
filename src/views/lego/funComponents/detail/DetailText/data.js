/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-08-27 15:44:47
 * @LastEditors: yamanashi12
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '名称',
    type: 'DetailText',
    key: '',
    formatValue: ''
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  }
}
