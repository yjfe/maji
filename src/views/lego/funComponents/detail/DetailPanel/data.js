/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-11-05 10:56:44
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '名称',
    type: 'DetailPanel',
    key: '',
    color: '#333333',
    formatValue: '',
    textAlign: 'center',
    imgSrc: ''
  },
  rules: {
    // label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  }
}
