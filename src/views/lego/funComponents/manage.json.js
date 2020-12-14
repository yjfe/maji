/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-09 17:40:03
 * @LastEditors: Please set LastEditors
 */
const pageConfig = {
  PagesForm: {
    name: '表单页面'
  },
  PagesList: {
    name: '列表页面'
  },
  PagesDetail: {
    name: '详情页面'
  }
}
const formComponents = {
  Input: {
    name: '单行文本',
    icon: 'iconbiaodanzujian-shurukuang'
  },
  Textarea: {
    name: '多行文本',
    icon: 'iconwenben'
  },
  Radio: {
    name: '单选框',
    icon: 'icondanxuankuangxuanzhong'
  },
  Checkbox: {
    name: '多选框',
    icon: 'iconduoxuanzhijiao',
    preview: ''
  },
  Select: {
    name: '下拉框',
    icon: 'iconxialakuangbiaodan'
  },
  TimePick: {
    name: '时间选择器',
    icon: 'iconshijianxuanzeqi'
  },
  DatePick: {
    name: '日期选择器',
    icon: 'iconriqixuanzeqi'
  },
  DateTimePick: {
    name: '日期时间选择器',
    icon: 'iconriqishijianxuanzeqi'
  },
  FileUpload: {
    name: '文件上传',
    icon: 'iconfuhao-anniu',
    preview: ''
  },
  ImgUpload: {
    name: '图片上传',
    icon: 'iconfuhao-tupianshangchuan'
  },
  InputNumber: {
    name: '数字输入框',
    icon: 'iconfuhao-shuzishurukuang'
  },
  InputCode: {
    name: '卡号输入框',
    icon: 'iconkahaoshuru'
  },
  AddressCascader: {
    name: '地理位置',
    icon: 'icondiliweizhi'
  },
  Cascader: {
    name: '级联下拉框',
    icon: 'iconjilianxialakuang',
    preview: ''
  },
  Editor: {
    name: '富文本',
    icon: 'iconbiaodanzu',
    preview: ''
  },
  VideoUpload: {
    name: '视频上传',
    icon: 'iconfuhao-tupianshangchuan',
    preview: ''
  },
  FormGroup: {
    name: '表单组',
    icon: 'iconbiaodanzu',
    preview: ''
  },
  InputPassword: {
    name: '密码输入框',
    icon: 'iconbiaodanzujian-shurukuang',
    preview: ''
  }
}
const layoutComponents = {
  Title: {
    name: '标题',
    icon: 'iconbiaoti'
  },
  Img: {
    name: '图片展示',
    icon: 'icontupian',
    preview: ''
  },
  Content: {
    name: '描述文本',
    icon: 'iconwenben',
    preview: ''
  },
  Hr: {
    name: '分割线',
    icon: 'iconfengexian',
    preview: ''
  },
  Row: {
    name: '栅栏布局',
    icon: 'iconbuju',
    preview: ''
  },
  Quote: {
    name: '引用组件',
    icon: 'iconyinyongzujian',
    preview: ''
  },
  Tabs: {
    name: 'tab组件',
    icon: 'iconTabzujian',
    preview: ''
  }
}
const privateComponents = {
}
const listComponents = {
  Search: {
    name: '筛选区',
    icon: 'iconsousuo',
    preview: ''
  },
  Table: {
    name: '表格',
    icon: 'iconbiaoge',
    preview: ''
  }
}
const detailComponents = {
  DetailText: {
    name: '文本',
    icon: 'iconbiaodanzujian-shurukuang',
    preview: ''
  },
  DetailRadio: {
    name: '单选框',
    icon: 'icondanxuankuangxuanzhong',
    preview: ''
  },
  DetailCheckbox: {
    name: '多选框',
    icon: 'iconduoxuanzhijiao',
    preview: ''
  },
  DetailSelect: {
    name: '下拉框',
    icon: 'iconxialakuangbiaodan',
    preview: ''
  },
  DetailTable: {
    name: '表格显示',
    icon: 'iconbiaoge',
    preview: ''
  },
  DetailImg: {
    name: '图片',
    icon: 'icontupian1',
    preview: ''
  },
  DetailCharts: {
    name: '图表-扇形',
    icon: 'icontubiao',
    preview: ''
  },
  DetailChartsXY: {
    name: '图表-坐标系',
    icon: 'icontubiao',
    preview: ''
  },
  DetailPanel: {
    name: '面板',
    icon: 'iconmianban',
    preview: ''
  },
  DetailEditor: {
    name: '富文本',
    icon: 'iconbiaodanzu',
    preview: ''
  },
  DetailVideo: {
    name: '视频详情',
    icon: 'icontupian1',
    preview: ''
  }
}
function addtType(obj = {}, typeName = '') {
  for (const key in obj) {
    obj[key].type = typeName
  }
  return obj
}
const componentsInfo = {
  ...addtType(pageConfig, 'pages'),
  ...addtType(formComponents, 'form'), 
  ...addtType(layoutComponents, 'layout'), 
  ...addtType(privateComponents, 'private'),
  ...addtType(listComponents, 'list'),
  ...addtType(detailComponents, 'detail')
}
const formItems = [
  'Input', 
  'Textarea',
  'InputPassword',
  'Radio', 
  'Checkbox', 
  'Select', 
  'TimePick', 
  'DatePick', 
  // 'DateTimePick',
  'FileUpload', 
  'ImgUpload', 
  'VideoUpload',
  'InputNumber', 
  'InputCode', 
  'AddressCascader',
  'Cascader',
  // 'InputTest',
  'Editor', 
  'FormGroup'
]
const layoutItems = [
  'Title', 
  'Img', 
  'Content', 
  'Hr', 
  'Row', 
  // 'Quote', 
  'Tabs'
]
const privateItems = [
  // 'ItemSelect', 
  // 'OrderSelect'
]
// const listItems = ['Table', 'Search']
const listItems = [
  'Table',
  'Search'
]
const detailItems = [
  'DetailText',
  'DetailRadio',
  'DetailCheckbox',
  'DetailSelect',
  // 'DetailTable',
  'DetailImg',
  'DetailCharts',
  'DetailChartsXY',
  'DetailPanel',
  'DetailEditor',
  'DetailVideo'
]
const layoutRowItems = {
  PagesForm: [...formItems, ...detailItems, 'Table'],
  PagesDetail: [...detailItems, 'Table'],
  PagesList: ['DetailPanel', 'Table']
}
export default {
  componentsInfo,
  formItems,
  layoutItems,
  privateItems,
  listItems,
  detailItems,
  layoutRowItems
}
