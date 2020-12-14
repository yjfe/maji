/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime : 2020-01-15 15:46:51
 * @LastEditors  : Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '名称',
    type: 'DetailEditor',
    value: '',
    styles: 0
  },
  rules: {
    label: [
      { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
    // value: [{ required: true, message: '请输入默认值', trigger: 'blur' }],
    // placeholder: [{ required: true, message: '请输入提示文本', trigger: 'blur' }]
  }
}
