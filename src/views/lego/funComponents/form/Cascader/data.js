/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 15:59:42
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Cascader'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'array', // value
    placeholder: 'string', // input attrs placeholder 
    // codeKey: { // 标签文本
    //   type: 'string',
    //   default: 'parentLevelId'
    // },
    apiUrl: 'string', // 接口配置 - 接口地址
    valueKey: { // 接口配置 - value字段名
      type: 'string',
      default: 'categoryLevelId'
    },
    labelKey: { // 接口配置 - label字段名
      type: 'string',
      default: 'categoryLevelName'
    },
    level: { // 显示层级
      type: 'number',
      default: 3
    },
    checkStrictly: { // 任意级别选择 true 开 false 关
      type: 'boolean',
      default: false
    },
    multiple: { // true 多选 false 单选
      type: 'boolean',
      default: false
    },
    emitPath: { // 选中节点值 true 末尾节点 false 数组节点
      type: 'boolean',
      default: false
    }
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    codeKey: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    valueKey: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    labelKey: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    level: [{ required: true, message: '请输入层级', trigger: 'blur' }],
    apiUrl: [{ required: true, message: '请输入接口地址', trigger: 'blur' }]
  }
}
