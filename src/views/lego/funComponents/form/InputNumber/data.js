/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:34:43
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'InputNumber'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string',
    value: 'any',
    placeholder: 'string', // input attrs placeholder 
    remark: 'string', // 表单底部的备注
    controls: { // 控制按钮 true 显示 false 隐藏
      type: 'boolean',
      default: false
    },
    precision: { // 精确小数N位
      type: 'number',
      default: 0
    },
    min: { // 最小值
      type: 'number',
      default: 0
    },
    max: { // 最大值
      type: 'number',
      default: 9999
    },
    step: { // 计数器长
      type: 'number',
      default: 1
    }
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    precision: [{ 
      type: 'number', 
      required: true, 
      message: '请输入精确小数位数', 
      trigger: 'blur' 
    }]
  }
}
