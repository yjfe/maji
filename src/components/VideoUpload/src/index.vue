<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-12-09 11:08:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="video-upload" v-loading="loading">
    <div class="video-upload-preview" v-if="value">
      <i v-if="!disabled" @click.stop="handleRemove" class="el-icon-close"></i>
      <video
        :src="value"
        controls="controls"
        class="video-box"
        :poster="`${value}?vframe/jpg/offset/1`"
      >
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <el-upload
      v-if="!disabled"
      :class="{ isPreview: value }"
      :key="key"
      :data="{ token: qiniuToken }"
      :action="videoAction"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :show-file-list="false"
      :accept="accept"
      v-bind="$attrs"
      drag
    >
      <template v-if="!value">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <el-button v-else type="primary" class="edit-button">修改</el-button>
    </el-upload>
    <div v-if="hasTips" class="video-upload-tips"
      >只能上传{{ accept }}文件{{ styleMsg }}，且不超过{{ sizeMsg }}</div
    >
  </div>
</template>
<script>
import * as httpAgent from '@/utils/http'

export default {
  name: 'ViedoUpload',
  props: {
    /**
     * @prop {String} value 视频地址
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * @prop {Object} data 上传文件包含的参数，也包含了限制视频尺寸大小判断，固定宽（width,height）,最大宽高（maxWidth,maxHeight）
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * @prop {String} fileName 文件名
     */
    fileName: {
      type: String,
      default: ''
    },
    /**
     * @prop {String} qiniuAction 七牛token获取地址  默认: cdnadmin/admin/upload/videoKen.json
     */
    qiniuAction: {
      type: String,
      default: 'cdnadmin/admin/upload/videoKen.json'
    },
    /**
     * @prop {String} videoAction 七牛上传地址  默认: //upload.qiniup.com/
     */
    videoAction: {
      type: String,
      default: '//upload.qiniup.com/'
    },
    /**
     * @prop {String} accept 限制上传格式  默认: .mkv,.mp4
     */
    accept: {
      type: String,
      default: '.mkv,.mp4'
    },
    /**
     * @prop {Number} size 限制上传大小  默认: 1024 * 1024 * 10
     */
    size: {
      type: Number,
      default: 1024 * 1024 * 10
    },
    /**
     * @prop {Boolean} hasTips 显示限制规则提示  默认: true
     */
    hasTips: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} disabled 禁用  默认: false
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeMsg() {
      const mb = (this.size / 1024 / 1024).toFixed(2)
      if (mb < 1) {
        return `${this.size / 1024}KB`
      }
      return `${mb}MB`
    },
    styleMsg() {
      let str = this.data.width || this.data.height ? '尺寸为' : ''
      if (this.data.width) {
        str += !this.data.height ? `宽度${this.data.width}px` : `${this.data.width}px`
      }
      if (this.data.height) {
        str += !this.data.width ? `高度${this.data.height}px` : `*${this.data.height}px`
      }
      str += (this.data.width || this.data.height) && (this.data.maxWidth || this.data.maxHeight) ? '，' : ''
      str += this.data.maxWidth || this.data.maxHeight ? '最大为' : ''
      if (this.data.maxWidth) {
        str += !this.data.maxHeight ? `宽度${this.data.maxWidth}px` : `${this.data.maxWidth}px`
      }
      if (this.data.maxHeight) {
        str += !this.data.maxWidth ? `高度${this.data.maxHeight}px` : `*${this.data.maxHeight}px`
      }
      return str
    }
  },
  data() {
    return {
      file: {},
      qiniuToken: '',
      key: Math.random()
        .toString(36)
        .substr(2),
      loading: false,
      videoSize: {}
    }
  },
  mounted() {
    this.getQiniuToken()
  },
  methods: {
    /**
     * @method: 获取七牛token
     * @param {type}
     * @return:
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-22 15:12:29
     */
    getQiniuToken() {
      httpAgent.POST(this.qiniuAction).then((res) => {
        this.qiniuToken = res.response.data.uptoken
      })
    },
    handleBeforeUpload(file) {
      this.file = file
      const { size } = file
      if (this.size && size > this.size) {
        this.$message.error(`上传文件大小限制最大${this.sizeMsg}`)
        this.loading = false
        return false
      }
      const formatReg = new RegExp(this.accept.replace(/,/g, '|'), 'i')
      if (!formatReg.test(file.name)) {
        this.$message.error('格式不正确,请重新上传')
        return false
      }

      if (this.data && (this.data.maxHeight || this.data.maxWidth || this.data.height || this.data.width)) {
        const that = this
        const loadImageAsync = () => new Promise((resolve, reject) => {
          const url = URL.createObjectURL(file)
          const video = document.createElement('video')
          video.src = url
          video.onloadedmetadata = () => {
            // Revoke when you don't need the url any more to release any reference
            URL.revokeObjectURL(url)

            that.videoSize = {
              height: video.videoHeight,
              width: video.videoWidth
            }

            if (that.data.maxHeight && that.data.maxWidth) {
              // 判断最大高宽双条件
              if (that.videoSize.height > that.data.maxHeight || that.videoSize.width > that.data.maxWidth) {
                that.$message.error(
                  `视频尺寸限制为最大宽度${that.data.maxWidth}, 最大高度${that.data.maxHeight}，请重新上传`
                )
                reject()
              } else {
                resolve()
              }
            } else if (that.data.maxHeight || that.data.maxWidth) {
              // 判断最大高宽单条件
              if (that.data.maxHeight && that.data.maxHeight < that.videoSize.height) {
                that.$message.error(`视频尺寸限制最大高度${that.data.maxHeight}，请重新上传`)
                reject()
              } else if (that.data.maxWidth && that.data.maxWidth < that.videoSize.width) {
                that.$message.error(`视频尺寸限制最大宽度${that.data.maxWidth}，请重新上传`)
                reject()
              } else {
                resolve()
              }
            } else if (that.data.height && that.data.width) {
              // 判断高宽双条件
              if (that.data.height === that.videoSize.height && that.data.width === that.videoSize.width) {
                resolve()
              } else {
                that.$message.error(
                  `视频尺寸限制为${that.data.width}*${that.data.height}，请重新上传`
                )
                reject()
              }
            } else if (that.data.height || that.data.width) {
              // 判断高宽单条件
              if (that.data.height && that.data.height !== that.videoSize.height) {
                that.$message.error(`视频尺寸限制高度${that.data.height}，请重新上传`)
                reject()
              } else if (that.data.width && that.data.width !== that.videoSize.width) {
                that.$message.error(`视频尺寸限制宽度${that.data.width}，请重新上传`)
                reject()
              } else {
                resolve()
              }
            } else {
              resolve()
            }
          }
          video.load() // fetches metadata
        })
        const loadReaderAsync = evt => new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (src) => {
            resolve(loadImageAsync(src.target.result))
          }
          reader.readAsDataURL(evt)
        })

        return loadReaderAsync(file)
      }
      return true
    },
    handleProgress() {
      this.loading = true
    },
    handleSuccess(res) {
      this.loading = false
      if (res.key && res.hash) {
        const file = {
          fileName: this.file.name,
          value: res.key,
          height: this.videoSize.height,
          width: this.videoSize.width
        }
        this.$emit('input', file.value)
          .$emit('update:fileName', file.fileName)
          .$emit('change', file)
        this.key = Math.random()
          .toString(36)
          .substr(2)
      } else {
        if (res) {
          if (!this.$listeners.exception) {
            this.$message.error(res.msg || '文件上传失败')
          }
        }
        this.loading = false
      }
    },
    handleError(err, file) {
      //eslint-disable-line
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    },
    // 删除文件
    handleRemove() {
      this.$confirm('此操作将删除该视频, 是否继续?', '提示', { type: 'warning' })
        .then(() => {
          this.$emit('input', '')
            .$emit('update:fileName', '')
            .$emit('change', {
              value: '',
              fileName: ''
            })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less">
@import '~styles/var';
.video-upload {
  display: inline-block;
  position: relative;
  width: 360px;
  height: 200px;
  .file-upload {
    display: block;
    .el-upload {
      width: 100%;
      .editor-import-video-btn {
        width: 100% !important;
        height: 100px;
        display: block;
        .el-icon-plus {
          font-size: 28px;
          color: #8c939d;
        }
        &:hover {
          .el-icon-plus {
            font-size: 28px;
            color: @color-primary;
          }
        }
      }
    }
  }
  .video-tag {
    width: 100%;
  }
  .el-upload-list {
    max-width: 360px;
  }
  &-preview {
    position: relative;
    overflow: hidden;
    width: 360px;
    height: 180px;
    border: 1px dashed #d9d9d9;
    background-color: #fff;
    .video-box {
      width: 360px;
      height: 180px;
    }
    .el-icon-close {
      position: absolute;
      top: -18px;
      right: -18px;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:before {
        z-index: 11;
        position: absolute;
        right: 5px;
        top: 5px;
      }
      &:after {
        border: 18px solid transparent;
        content: '';
        z-index: 10;
        right: 0;
        top: 0;
        position: absolute;
        border-top-color: #999;
        border-right-color: #999;
      }
      &:hover {
        &:after {
          border-top-color: #ff4949;
          border-right-color: #ff4949;
        }
      }
    }
    .edit-button {
      position: absolute;
      background: @color-primary;
      top: 0;
      left: 0;
      color: #fff;
      z-index: 100;
      height: 30px;
      font-size: 14px;
      border-radius: 0;
      padding: 0;
      display: none;
      i {
        font-size: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    &:hover {
      .el-icon-close {
        top: 0;
        right: 0;
        display: block;
      }
    }
  }
  .isPreview {
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    opacity: 0;
    .el-upload-dragger {
      height: 30px;
      width: 80px;
      border: 0;
      background: transparent;
      border-radius: 0;
      &:hover {
        border: 0;
      }
    }
  }
  &:hover {
    .isPreview {
      opacity: 1;
    }
  }
  &-tips {
    line-height: 20px;
    color: @color-black-base;
  }
}
</style>
