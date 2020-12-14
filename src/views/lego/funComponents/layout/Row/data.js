/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:57:13
 * @LastEditors: Please set LastEditors
 */
import manageJson from '@/views/lego/funComponents/manage.json'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'Row'
    },
    title: { // 标题
      type: 'string',
      default: '主标题'
    },
    desc: { // 描述
      type: 'string',
      default: '描述'
    },
    layout: { // 布局
      type: 'array',
      default: [
        {
          col: 24,
          module: new Date().getTime()
        }
      ]
    }
  },
  rules: {
    layout: [{ 
      type: 'array', required: true, message: '至少添加一个组件', trigger: 'blur' 
    }]
  },
  moduleFun: manageJson.layoutRowItems
}
