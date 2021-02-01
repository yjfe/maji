<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2021-01-20 15:50:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div v-loading="loading" class="file-upload">
    <el-upload
      v-bind="$attrs"
      :key="key"
      :action="uploadUrl"
      :headers="headers"
      :fileAccept="fileAccept"
      :validateEvent="validateEvent"
      :maxfileSize="maxfileSize"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :file-list="myFileList"
    >
      <slot></slot>
    </el-upload>
  </div>
</template>
<script>
import dispatch from '@/mixins/dispatch'

export default {
  componentName: 'FileUpload',
  mixins: [dispatch],
  props: {
    /**
     * @prop {Object} showFileList 是否显示文件数组
     */
    showFileList: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Object} fileList 文件数组
     */
    fileList: {
      type: Array,
      default: () => []
    },
    /**
     * @prop {Object} headers 上传接口的headers
     */
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {String} fileAccept 文件类型，默认: '.zip,.rar,.xls,.xlsx,.txt'
     */
    fileAccept: {
      type: String,
      default: '.zip,.rar,.xls,.xlsx,.txt'
    },
    /**
     * @prop {Boolean} validateEvent 是否触发表单验证
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Number} maxfileSize 文件大小限制，单位mb
     */
    maxfileSize: {
      // 文件最大size
      type: Number,
      default: null
    },
    /**
     * @prop {String} action 文件上传接口地址
     */
    action: {
      type: String,
      default: '/upload/file'
    }
  },
  computed: {
    uploadUrl: () => {
      try {
        const prefix = process.env.NODE_ENV === 'development' ? '/api' : ''
        return `${prefix}${this.action}`
      } catch (error) {
        return ''
      }
    }
  },
  data() {
    return {
      key: Math.random()
        .toString(36)
        .substr(2),
      loading: false,
      myFileList: this.fileList
    }
  },
  watch: {
    fileList(value) {
      this.myFileList = value
    }
  },
  methods: {
    /**
     * @method: 上传前拦截器，处理文件格式
     * @param {Object} file 文件流
     * @return {Boolean} 拦截器结果是否通过
     */
    handleBeforeUpload(file) {
      const size = file.size / 1024 / 1024
      if (this.maxfileSize && size > this.maxfileSize) {
        this.$message.error(`上传文件大小限制最大${this.maxfileSize}MB`)
        return false
      }
      const fileType = /\.\w+$/.exec(file.name)[0]
      if (!this.fileAccept) {
        return true
      }
      if (fileType && this.fileAccept.split(',').indexOf(fileType) > -1) {
        return true
      }
      this.$message.error(`上传文件格式不正确,请上传${this.fileAccept}格式文件`)
      return false
    },
    /**
     * @method: 开启loading
     */
    handleProgress() {
      this.loading = true
    },
    /**
     * @method: 上传成功回调
     * @param {Object} res 接口返回data
     */
    handleSuccess(res) {
      this.loading = false
      if (res.errorCode === '0' || res.errorCode === 0 || res.code === '0' || res.code === 0) {
        if (this.showFileList) {
          this.myFileList.push({
            name: res.data.id || res.data.name,
            path: res.data.url || res.data.path
          })
          this.$emit(
            'update:fileList',
            this.myFileList.map(item => ({
              name: item.name,
              path: item.path
            }))
          )
        }
        this.$emit('on-change', res.data)
        this.$emit('success', res)
        if (this.validateEvent) {
          // 触发表单校验
          this.dispatch(this, 'ElFormItem', 'el.form.change', this.myFileList)
          this.dispatch(this, 'ElFormItem', 'el.form.blur', this.myFileList)
        }
        this.key = Math.random()
          .toString(36)
          .substr(2)
      } else {
        this.$emit('exception', res)
        if (res) {
          if (!this.$listeners.exception) {
            this.$message.error(res.msg || '文件上传失败')
          }
        }
      }
    },
    /**
     * @method: 上传失败回调
     * @param {Object} err 错误信息
     * @param {Object} file 文件流
     * @param {Array} fileList 文件数组
     */
    handleError(err, file) {
      //eslint-disable-line
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    },
    /**
     * @method: 获取接口信息
     * @param {Number} code 地址code
     * @param {Number} level 省市区层级
     * @return {Promise} rxjs function 请求接口方法
     */
    handleRemove(file, fileList) {
      if (this.showFileList) {
        this.myFileList = fileList.map(item => ({
          name: item.name,
          path: item.path
        }))
        this.$emit('update:fileList', this.myFileList)
        this.key = Math.random()
          .toString(36)
          .substr(2)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.file-upload {
  display: inline-block;
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -7px;
  }
  .is-uploading {
    .el-upload-list__item-status-label {
      display: none;
    }
    .el-progress__text {
      right: 30px !important;
    }
  }
  .el-loading-spinner {
    margin-top: -10px;
    .circular {
      height: 20px;
      width: 20px;
    }
  }
}
.el-upload-list__item {
  transition: none !important;
}
</style>
