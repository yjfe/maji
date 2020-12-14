/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 16:32:28
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '名称',
    type: 'DetailVideo',
    key: '',
    height: 'auto',
    width: '300px',
    value: ''
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  }
}
