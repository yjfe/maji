/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-04-26 10:10:22
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '名称',
    type: 'DetailImg',
    key: '',
    height: '200px',
    width: '200px',
    gap: 5,
    errorMsg: '暂无图片'
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  }
}
