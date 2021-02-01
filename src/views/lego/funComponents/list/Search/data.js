/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-25 15:09:10
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Search'
    },
    searchScope: { // 搜索方式 1 指定组件 0 全局
      type: 'number',
      default: 0
    },
    searchTarget: 'array', // 选择的组件
    layout: { // 搜索框的表单
      type: 'array',
      default: [
        {
          col: 6
        }
      ]
    }
  },
  rules: {},
  moduleFun: [
    'Input', 
    'Radio', 
    'Checkbox', 
    'Select', 
    'TimePick', 
    'DatePick', 
    // 'DateTimePick',
    'InputNumber', 
    'InputCode', 
    'AddressCascader',
    'Cascader'
  ]
}
