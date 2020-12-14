/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:08:44
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'FileUpload'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string', // 字段名
    value: 'any', // value 
    remark: 'string', // 表单底部的备注
    apiUrl: 'string', // 接口配置 - 接口地址
    apiName: { // 接口配置 - 上传字段名称
      type: 'string',
      default: 'data'
    },
    size: { // 限制大小
      type: 'number',
      default: 5
    },
    maxNum: { // 数量限制
      type: 'number',
      default: 1
    },
    fileType: { // 支持格式
      type: 'array',
      default: ['xls', 'xlsx']
    }
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
    apiName: [{ required: true, message: '请输入接收参数', trigger: 'blur' }],
    apiUrl: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
    maxNum: [{ required: true, message: '请输入最大上传数量', trigger: 'blur' }],
    size: [{ 
      type: 'number',
      required: true,
      message: '请输入限制大小',
      trigger: 'blur' 
    }],
    fileType: [
      { 
        type: 'array', 
        required: true,
        message: '请选择图片格式', 
        trigger: 'blur' 
      }
    ]
  },
  fileType: ['xls', 'xlsx', 'csv', 'doc', 'docx', 'ppt', 'pdf', 'zip', 'rar', 'apk', 'groovy', 'java', 'txt', 'class']
}
