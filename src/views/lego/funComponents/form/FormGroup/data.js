/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:20:06
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'
import manageJson from '@/views/lego/funComponents/manage.json'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'FormGroup'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string',
    value: 'array',
    layout: { // 布局管理配置
      type: 'array',
      default: [{
        col: 8
      }]
    },
    max: { // 最大数量
      type: 'number',
      default: 5
    },
    min: { // 最小数量
      type: 'number',
      default: 1
    },
    maxWitch: { // 最大宽度
      type: 'number'
    }
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    max: [{ 
      type: 'number', 
      required: true, 
      message: '请输入最大数量', 
      trigger: 'blur' 
    }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ]
  },
  moduleFun: [
    ...manageJson.formItems,
    ...manageJson.layoutItems,
    ...manageJson.detailItems
  ]
}
