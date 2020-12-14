/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:40:11
 * @LastEditors: Please set LastEditors
 */
import validator from '@/utils/validator'

export default {
  schema: {
    type: { // 组件类型
      type: 'string',
      default: 'VideoUpload'
    },
    label: { // 标签文本
      type: 'string',
      default: '名称'
    },
    key: 'string',
    value: 'any',
    size: { // 上传文件大小限制
      type: 'number',
      default: 2048
    },
    fileType: { // 上传文件类型
      type: 'array',
      default: ['mkv', 'mp4']
    },
    maxNum: { // 最大上传数量
      type: 'number',
      default: 5
    },
    uploadType: { // 上传模式： 0 单图模式 1 多图模式
      type: 'number',
      default: 0
    }
  },
  rules: {
    key: [
      { required: true, message: '请输入字段名', trigger: 'blur' },
      validator.rule.keyCode
    ],
    label: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
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
  fileTypeEnums: ['mkv', 'mp4', 'flv', 'avi', 'rmvb']
}
