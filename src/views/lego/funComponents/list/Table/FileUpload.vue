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
      :with-credentials="true"
      >
        <slot></slot>
    </el-upload>
  </div>
</template>
<script>
// import {dispatch} from '@/mixins'

export default {
  componentName: 'FileUpload',
  // mixins: [dispatch],
  props: {
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    fileAccept: {
      type: String,
      default: '.zip,.rar,.xls,.xlsx,.txt'
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    maxfileSize: {
      // 文件最大size
      type: Number,
      default: null
    },
    action: {
      type: String,
      default: '/upload/file'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    uploadUrl() {
      const prefix = process.env.NODE_ENV === 'development' ? '/api' : ''
      return `${prefix}${this.action}`
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
  methods: {
    handleBeforeUpload(file) {
      const size = file.size / 1024 / 1024
      if (this.maxfileSize && size > this.maxfileSize) {
        this.$message.error(`上传文件大小限制最大${this.maxfileSize}MB`)
        return false
      }
      const fileType = /\.\w+$/.exec(file.name)[0]
      if (!this.fileAccept || (fileType && this.fileAccept.split(',').indexOf(fileType) > -1)) {
        if (this.options && this.options.exportType === 1) {
          this.$emit('outside', { options: this.options, file })
          return false
        } 
        return true
      }
      this.$message.error(`上传文件格式不正确,请上传${this.fileAccept}格式文件`)
      return false
    },
    handleProgress() {
      this.loading = true
    },
    handleSuccess(res) {
      this.loading = false
      if (res.code === '0' || res.code === 0 || res.errorCode === '0' || res.errorCode === 0) {
        if (this.showFileList) {
          this.myFileList.push({
            name: res.data.id,
            path: res.data.url
          })
          this.$emit('update:fileList', this.myFileList)
        }
        this.$emit('on-change', res.data)
        this.$emit('success', res)
        // if (this.validateEvent) {
        //   // 触发表单校验
        //   this.dispatch(this, 'ElFormItem', 'el.form.change', this.myFileList)
        //   this.dispatch(this, 'ElFormItem', 'el.form.blur', this.myFileList)
        // }
        this.key = Math.random()
          .toString(36)
          .substr(2)
      } else {
        this.$emit('exception', res)
        if (res) {
          if (!this.$listeners.exception) {
            this.$message.error(res.msg || res.errorMessage || '文件上传失败')
          }
        }
      }
    },
    handleError(err, file) {
      //eslint-disable-line
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    },
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
    // handleDownload (e) {
    //   // console.log(e.target.nodeName)
    //   // if (/^img$/i.test(e.target.nodeName)) {
    // }
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
