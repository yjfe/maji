/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 16:54:26
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'DatePick'
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
      default: 'yyyy-MM-dd'
    },
    selectableRange: 'array' // 快捷搜索
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }]
  },
  // 日期类型的枚举
  typeEnum: {
    'yyyy-MM-dd HH:mm:ss': {
      type: 'datetime',
      rangeType: 'datetimerange',
      hasRange: true,
      hasQuick: true,
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    },
    'yyyy-MM-dd HH:mm': {
      type: 'datetime',
      rangeType: 'datetimerange',
      hasRange: true,
      hasQuick: true,
      valueFormat: 'yyyy-MM-dd HH:mm'
    },
    'yyyy-MM-dd': {
      type: 'date',
      rangeType: 'daterange',
      hasRange: true,
      hasQuick: true,
      valueFormat: 'yyyy-MM-dd'
    },
    'MM-dd': {
      type: 'date',
      rangeType: 'daterange',
      hasRange: true,
      hasQuick: true,
      valueFormat: 'MM-dd'
    },
    dd: {
      type: 'date',
      rangeType: 'daterange',
      hasRange: true,
      hasQuick: true,
      valueFormat: 'dd'
    },
    'yyyy 第 WW 周': {
      type: 'week',
      rangeType: 'week',
      hasRange: false,
      hasQuick: false,
      valueFormat: 'yyyy-MM-dd'
    },
    'yyyy-MM': {
      type: 'month',
      rangeType: 'monthrange',
      hasRange: true,
      hasQuick: false,
      valueFormat: 'yyyy-MM'
    },
    yyyy: {
      type: 'year',
      rangeType: 'year',
      hasRange: false,
      hasQuick: false,
      valueFormat: 'yyyy'
    }
  },
  quickSelectEnum: [ 
    3, 7, 14, 30, 60, 180, 360
  ]
}
