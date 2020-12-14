<template>
  <div>
    <PreviewBox
      :indicator="false"
      :title="title"
      :class="{ 'img-upload': !$slots.default, 'img-upload-value': !$slots.default && value }"
      v-loading="loading"
      :style="style"
    >
      <button v-if="!$slots.default" type="button">
        <i v-if="!disabled" @click="handleRemove" class="el-icon-close"></i>
        <img v-if="value" :src="value" class="avatar" />
        <i v-else class="el-icon-plus"></i>
      </button>
      <el-upload
        ref="upload"
        v-bind="$props"
        :action="uploadUrl"
        :name="name"
        :data="data"
        :showFileList="showFileList"
        :headers="headers"
        :accept="accept"
        :before-upload="handleBeforeUpload"
        :on-progress="handleProgress"
        :on-success="handleSuccess"
        :on-error="handleError"
        :multiple="multiple"
      >
        <slot v-if="$slots.default"></slot>
        <button type="button" class="img-upload-value-button" v-if="!$slots.default && value"
          >修改</button
        >
      </el-upload>
    </PreviewBox>
    <div class="el-upload__tip" v-if="isTip"
      >{{ styleMsg ? `${styleMsg}，` : '' }}文件大小请不要超过{{ sizeMsg }}.</div
    >
  </div>
</template>
<script>
/* eslint-disable */
import dispatch from '@/mixins/dispatch'
import PreviewBox from '../../PreviewBox'

export default {
  componentName: 'ImgUpload',
  components: {
    PreviewBox
  },
  mixins: [dispatch],
  props: {
    /**
     * @prop {Boolean} isTip 显示文件限制提示  默认: false
     */
    isTip: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {String} value 图片url
     */
    value: {
      type: String
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Object} headers 上传接口携带headers
     */
    headers: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {String} accept 上传文件限制 默认： image/jpeg,image/png
     */
    accept: {
      type: String,
      default: 'image/jpeg,image/png'
    },
    /**
     * @prop {Number} size 限制文件大小  默认: 1024 * 1024 * 5
     */
    size: {
      type: Number,
      default: 1024 * 1024 * 5
    },
    /**
     * @prop {Boolean} validateEvent 是否触发表单校验  默认: true
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {String} formatList 上传文件限制 默认： ['.png', '.jpeg', '.jpg']
     */
    formatList: {
      type: Array,
      default() {
        return ['.png', '.jpeg', '.jpg']
      }
    },
    /**
     * @prop {String} action 图片上传请求地址
     */
    action: {
      required: false,
      default: '/cdnadmin/admin/upload/uploadPic_json.json'
    },
    isCrop: {
      type: Boolean,
      default: false
    },
    cropProps: {
      type: Object
    },
    /**
     * @prop {Object} data 上传图片文件包含的参数，也包含了限制图片大小判断，固定宽（width,height）,最大宽高（maxWidth,maxHeight）
     */
    data: {
      type: Object
    },
    /**
     * @prop {String} name 上传的key 默认: data
     */
    name: {
      type: String,
      default: 'data'
    },
    /**
     * @prop {Number, String} width 每个上传方块卡片的宽度 默认: 150
     */
    width: {
      type: [String, Number],
      default: 148
    },
    /**
     * @prop {Number, String} height 每个上传方块卡片的高度 默认: 150
     */
    height: {
      type: [String, Number],
      default: 148
    },
    multiple: {
      type: Boolean,
      default: false
    },
    withCredentials: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} disabled 禁用 默认: false
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      title: document.all ? '可能要双击才能选择文件' : ''
    }
  },
  computed: {
    uploadUrl: function() {
      const prefix = process.env.NODE_ENV === 'development' ? '/api' : ''
      return `${prefix}${this.action}`
    },
    style() {
      return {
        width: typeof this.width === 'string' ? this.width : parseInt(this.width) + 'px',
        height: typeof this.height === 'string' ? this.width : parseInt(this.height) + 'px'
      }
    },
    sizeMsg() {
      const mb = (this.size / 1024 / 1024).toFixed(2)
      if (mb < 1) {
        return `${this.size / 1024}KB`
      } else {
        return `${mb}MB`
      }
    },
    styleMsg() {
      let str = this.data.width || this.data.height ? '尺寸为' : ''
      if (this.data.width) {
        str += !this.data.height ? `宽度${this.data.width}px` : `${this.data.width}px`
      }
      if (this.data.height) {
        str += !this.data.width ? `高度${this.data.height}px` : `*${this.data.height}px`
      }
      str +=
        (this.data.width || this.data.height) && (this.data.maxWidth || this.data.maxHeight)
          ? '，'
          : ''
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
  methods: {
    handleBeforeUpload(file) {
      let formatReg = new RegExp(this.formatList.join('|'), 'i')
      if (file.size > this.size) {
        this.$message.error(`上传的文件不能超过${this.sizeMsg}`)
        return false
      }
      if (!formatReg.test(file.name)) {
        this.$message.error('图片格式不正确,请重新上传')
        return false
      }
      if (this.disabled) {
        return false
      }
      if (
        this.data &&
        (this.data.maxHeight || this.data.maxWidth || this.data.height || this.data.width)
      ) {
        let _this = this
        function loadImageAsync(url) {
          return new Promise(function(resolve, reject) {
            var image = new Image()
            image.onload = function() {
              let imgInfo = {
                height: this.height,
                width: this.width
              }
              if (_this.data.maxHeight && _this.data.maxWidth) {
                // 判断最大高宽双条件
                if (imgInfo.height > _this.data.maxHeight || imgInfo.width > _this.data.maxWidth) {
                  _this.$message.error(
                    `图片尺寸限制为最大宽度${_this.data.maxWidth}, 最大高度${_this.data.maxHeight}，请重新上传`
                  )
                  reject()
                } else {
                  resolve()
                }
              } else if (_this.data.maxHeight || _this.data.maxWidth) {
                // 判断最大高宽单条件
                if (_this.data.maxHeight && _this.data.maxHeight < imgInfo.height) {
                  _this.$message.error(`图片尺寸限制最大高度${_this.data.maxHeight}，请重新上传`)
                  reject()
                } else if (_this.data.maxWidth && _this.data.maxWidth < imgInfo.width) {
                  _this.$message.error(`图片尺寸限制最大宽度${_this.data.maxWidth}，请重新上传`)
                  reject()
                } else {
                  resolve()
                }
              } else if (_this.data.height && _this.data.width) {
                // 判断高宽双条件
                if (_this.data.height === imgInfo.height && _this.data.width === imgInfo.width) {
                  resolve()
                } else {
                  _this.$message.error(
                    `图片尺寸限制为${_this.data.width}*${_this.data.height}，请重新上传`
                  )
                  reject()
                }
              } else if (_this.data.height || _this.data.width) {
                // 判断高宽单条件
                if (_this.data.height && _this.data.height !== imgInfo.height) {
                  _this.$message.error(`图片尺寸限制高度${_this.data.height}，请重新上传`)
                  reject()
                } else if (_this.data.width && _this.data.width !== imgInfo.width) {
                  _this.$message.error(`图片尺寸限制宽度${_this.data.width}，请重新上传`)
                  reject()
                } else {
                  resolve()
                }
              } else {
                _this.data.width = imgInfo.width
                _this.data.height = imgInfo.height
                resolve()
              }
            }
            image.src = url
          })
        }
        function loadReaderAsync(evt) {
          return new Promise(function(resolve, reject) {
            let reader = new FileReader()
            reader.onload = function(src) {
              resolve(loadImageAsync(src.target.result))
            }
            reader.readAsDataURL(evt)
          })
        }
        return loadReaderAsync(file)
      }
    },
    handleProgress(value) {
      this.$emit('progress', value)
      this.loading = true
    },
    handleSuccess(res, file, fileList) {
      this.loading = false
      let url = res.url || res.data
      if (
        (res.errorCode === '0' || res.errorCode === 0 || res.code === '0' || res.code === 0) &&
        url
      ) {
        /**
         * @description: 上传成功-数据改变
         * @param {Object} res 成功对象
         */
        this.$emit('change', Object.assign(res, { url }))
        /**
         * @description: 上传成功
         * @param {String} url cdn图片地址
         */
        this.$emit('success', url)
        this.$emit('input', url).$emit('blur')
        if (this.validateEvent) {
          // 触发表单校验
          this.dispatch(this, 'ElFormItem', 'el.form.change', [url])
          this.dispatch(this, 'ElFormItem', 'el.form.blur', [url])
        }
      } else {
        /**
         * @description: 上传异常
         * @param {Object} res 错误对象
         */
        this.$emit('exception', res)
        this.$message.error(res.errorMsg || res.msg || '文件上传失败')
      }
    },
    handleError(err, file) {
      /**
       * @description: 上传失败
       * @param {Object} res 错误对象
       */
      this.$emit('error', err)
      this.$message.error(`"${file.name}"文件上传失败`)
      this.loading = false
    },
    handleRemove() {
      this.$emit('change', '').$emit('input', '')
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', '')
        this.dispatch(this, 'ElFormItem', 'el.form.blur', '')
      }
    }
  }
}
</script>
<style lang="less">
@import '~styles/var';
.el-upload__tip {
  margin-top: 0;
}
.is-error .img-upload {
  border-color: @color-error;
}
.img-upload {
  border: 1px dashed @border-color-base;
  border-radius: 3px;
  display: inline-block;
  height: 150px;
  width: 150px;
  vertical-align: middle;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: @color-primary;
    .el-icon-plus {
      font-size: 28px;
      color: @color-primary;
    }
  }
  box-sizing: border-box;
  button {
    padding: 0;
    border: 0;
    outline: none;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: transparent;
    cursor: pointer;
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }
    img {
      max-width: 100%;
      max-height: 100%;
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
        z-index: 100;
        position: absolute;
        right: 5px;
        top: 5px;
      }
      &:after {
        border: 18px solid transparent;
        content: '';
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
    &:hover {
      .el-icon-close {
        top: 0;
        right: 0;
        display: block;
      }
    }
  }
  .el-upload {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 90;
    &__input {
      position: absolute\0;
      top: 0\0;
      right: 0\0;
      height: 100%\0;
      width: 100%\0;
      opacity: 0\0;
      display: block\0;
    }
  }
  &-value {
    .el-upload {
      height: 30px;
      bottom: -30px;
      background: rgba(0, 0, 0, 0.6);
      &:hover {
        background: @color-primary;
      }
    }
    &:hover .el-upload {
      bottom: 0px;
    }
    &-button {
      color: #fff;
      height: 30px;
      font-size: 14px;
      i {
        font-size: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
}
</style>
