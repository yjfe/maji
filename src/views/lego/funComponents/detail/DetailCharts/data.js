/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime : 2020-01-06 16:54:48
 * @LastEditors  : Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '',
    type: 'DetailCharts',
    height: '400',
    key: '',
    chartType: 'pie',
    optionsType: 1,
    xName: '横坐标',
    xKey: '',
    yName: '纵坐标',
    yOptions: [{
      label: '名称1',
      value: 'key1',
      handleType: '',
      openType: 0
    }],
    // 筛选字段
    filterOptions: [],
    // 默认筛选字段
    chartSendKey: '',
    filterDefaultValue: 'key1'
  },
  rules: {
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    // apiUrl: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
    xName: [{ required: true, message: '请输入横坐标名称', trigger: 'blur' }],
    xKey: [
      { required: true, message: '请输入横坐标字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    yName: [{ required: true, message: '请输入纵坐标名称', trigger: 'blur' }]
  }
}
