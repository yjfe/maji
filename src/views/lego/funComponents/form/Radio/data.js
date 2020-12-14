/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 16:39:17
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Radio'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'any', // value 
    remark: 'string', // 表单底部的备注
    optionsType: { // 标签文本
      type: 'number',
      default: 2
    },
    apiUrl: 'string', // 接口配置 - 接口地址
    dataKey: 'string', // 接口配置 - 数组字段名
    valueKey: { // value字段名
      type: 'string',
      default: 'value'
    },
    labelKey: { // label字段名
      type: 'string',
      default: 'label'
    },
    valueType: { // value数据类型
      type: 'string',
      default: 'number'
    },
    options: { // value数据类型
      type: 'array',
      default: [{
        label: '选项1',
        value: '0'
      }]
    }
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    apiUrl: [{ 
      validator(rule, value, callback) {
        if (this.optionsType === 1 && !value) {
          callback(new Error('请输入请求地址'))
        }
        callback()
      }, 
      trigger: 'blur' 
    }],
    valueKey: [{ 
      validator(rule, value, callback) {
        if (this.optionsType === 1 && !value) {
          callback(new Error('请输入选项值Key'))
        }
        callback()
      }, 
      trigger: 'blur' 
    }],
    labelKey: [{ 
      validator(rule, value, callback) {
        if (this.optionsType === 1 && !value) {
          callback(new Error('请输入选项名Key'))
        }
        callback()
      }, 
      trigger: 'blur' 
    }]
  }
}
