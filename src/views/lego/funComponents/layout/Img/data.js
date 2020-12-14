/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:54:13
 * @LastEditors: Please set LastEditors
 */
export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Img'
    },
    bgColor: { // 背景色
      type: 'string',
      default: 'rgba(0, 0, 0, 0)'
    },
    marginTop: { // 上外边距
      type: 'number',
      default: 10
    },
    marginBottom: { // 下外边距
      type: 'number',
      default: 10
    },
    paddingTop: { // 上内边距
      type: 'number',
      default: 0
    },
    paddingBottom: { // 下内边距
      type: 'number',
      default: 0
    },
    value: 'array',
    align: { // 布局
      type: 'string',
      default: 'left'
    },
    width: { // 图片宽度
      type: 'string',
      default: 'auto'
    },
    height: { // 图片高度
      type: 'string',
      default: 'auto'
    }
  },
  rules: {
    value: [{ 
      type: 'array', required: true, message: '请选择一张图片', trigger: 'blur' 
    }]
  }
}
