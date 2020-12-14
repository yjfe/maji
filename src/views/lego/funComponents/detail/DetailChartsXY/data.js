/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-04-01 10:19:50
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  baseData: {
    label: '',
    type: 'DetailChartsXY',
    height: '400',
    key: '',
    optionsType: 1, // 数据来源
    xName: '横坐标',
    xKey: '',
    yName: '纵坐标',
    hasDataZoom: 2, // 缩略轴
    yOptions: [{
      label: '名称1',
      value: 'key1',
      handleType: '', // 操作类型
      openType: 0, // 操作 - 跳转 - 打开方式
      chartType: 'line', // 数据图形
      color: '#409eef',
      lineStyle: 'solid', // 连线样式
      hasApices: false, // 显示极值
      symbolType: null, // 标记样式
      isArea: false
    }],
    filterOptions: [], // 快捷筛选 筛选字段
    chartSendKey: '', // 快捷筛选 默认筛选字段名
    filterDefaultValue: 'key1' // 快捷筛选 默认初始项目
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
  },
  predefineColors: [
    '#409eef',
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
  ],
  lineStyleTypeEnums: ['solid', 'dashed', 'dotted'],
  chartType: [
    {
      value: 'line',
      label: '折线'
    },
    {
      value: 'bar',
      label: '柱状'
    }
  ],
  symbolType: [
    {
      value: 'none',
      label: '无'
    },
    {
      value: null,
      label: '空心圆'
    },
    {
      value: 'circle',
      label: '圆形'
    },
    {
      value: 'rect',
      label: '方形'
    },
    {
      value: 'roundRect',
      label: '圆角方形'
    },
    {
      value: 'triangle',
      label: '三角形'
    },
    {
      value: 'diamond',
      label: '菱形'
    },
    {
      value: 'pin',
      label: '标记'
    },
    {
      value: 'arrow',
      label: '箭头'
    }
  ]
}
