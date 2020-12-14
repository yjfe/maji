<template>
  <PreviewBox :indicator="false" class="img-group-upload">
    <template v-for="(item, index) in myValue">
      <div class="img-group-item" v-if="myValue" :key="index" :style="style">
        <button type="button">
          <img :src="item" />
        </button>
        <template v-if="!disabled">
          <i @click="handleRemove(index)" class="el-icon-close"></i>
          <i @click="handleMoveLeft(index)" v-show="index > 0" class="el-icon-arrow-left"></i>
          <i
            @click="handleMoveRight(index)"
            v-show="index < myValue.length - 1"
            class="el-icon-arrow-right"
          ></i>
          <div class="item-reload" @click="handleReload(index)">重新上传</div>
        </template>
      </div>
    </template>
    <div
      class="img-group-item error"
      v-for="(item, index) in errorFiles"
      :key="`error${index}`"
      :style="style"
    >
      <button type="button">
        <img :src="item" />
      </button>
      <div class="item-reload" :disabled="disabled" @click="handleReload(null)">重新上传</div>
    </div>
    <template v-for="(item, index) in uploadFiles">
      <div
        class="img-group-item"
        v-if="item.status === 'uploading'"
        :key="`load${index}`"
        :style="style"
        v-loading="item.status === 'uploading'"
      >
        <button type="button">
          <img :src="item.url" />
        </button>
      </div>
    </template>
    <template v-if="!$listeners.add">
      <span @mousemove="reloadIndex = null">
        <ImgUpload
          v-show="!isHidden"
          ref="upload"
          class="img-group-add"
          list-type="picture-card"
          :style="style"
          v-if="!myDisabled"
          :multiple="multiple"
          :height="height"
          :width="width"
          :size="size"
          :headers="headers"
          :action="action"
          :disabled="myDisabled || disabled"
          :validate-event="false"
          :is-crop="isCrop"
          :crop-props="cropProps"
          :data="data"
          :accept="accept"
          :formatList="formatList"
          :name="name"
          :withCredentials="withCredentials"
          v-bind="$attrs"
          @change="handleChange"
          @error="handleError"
          @progress="handleProgress"
        />
      </span>
    </template>
    <template v-else>
      <div v-if="!(myDisabled || disabled)" @click="handle" class="img-group-add" :style="style">
        <button type="button"><i class="el-icon-plus"></i></button>
      </div>
    </template>
  </PreviewBox>
</template>

<script>
import dispatch from '@/mixins/dispatch'
import ImgUpload from '../../ImgUpload'
import PreviewBox from '../../PreviewBox'

export default {
  componentName: 'ImgGroupUpload',
  mixins: [dispatch],
  components: {
    ImgUpload,
    PreviewBox
  },
  props: {
    /**
     * @prop {Array} value 图片数组
     */
    value: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: true
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} validateEvent 是否触发表单校验  默认: true
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Number, String} width 每个上传方块卡片的宽度 默认: 150
     */
    width: {
      type: [Number, String],
      default: 150
    },
    /**
     * @prop {Number, String} height 每个上传方块卡片的高度 默认: 150
     */
    height: {
      type: [Number, String],
      default: 150
    },
    /**
     * @prop {Boolean} limit 允许最大上传文件个数 默认: 0
     */
    limit: {
      type: Number,
      default: 0
    },
    /**
     * @prop {Number} size 限制文件大小  默认: 1024 * 1024 * 5
     */
    size: {
      type: Number
    },
    /**
     * @prop {Object} headers 上传接口携带headers
     */
    headers: {
      type: Object
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
     * @prop {Boolean} withCredentials 携带cookie跨域  默认: true
     */
    withCredentials: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Object} data 上传图片文件包含的参数，也包含了限制图片大小判断，固定宽（width,height）,最大宽高（maxWidth,maxHeight）
     */
    data: {
      type: Object
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
     * @prop {String} accept 上传文件限制 默认： image/jpeg,image/png
     */
    accept: {
      type: String,
      default: 'image/jpeg,image/png'
    },
    /**
     * @prop {String} name 上传的key 默认: data
     */
    name: {
      type: String,
      default: 'data'
    },
    /**
     * @prop {Boolean} disabled 禁用 默认: false
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        width: typeof this.width === 'string' ? this.width : `${parseInt(this.width, 10) + 2}px`,
        height: typeof this.height === 'string' ? this.width : `${parseInt(this.width, 10) + 2}px`
      }
    },
    uploadFiles() {
      return this.loadend && this.$refs.upload ? this.$refs.upload.$children[0].$children[0].uploadFiles : []
    }
  },
  watch: {
    value(value) {
      this.myDisabled = !!this.limit && (this.value.length >= this.limit || this.myValue.length >= this.limit)
      this.isHidden = false
      this.myValue = value
    }
  },
  data() {
    return {
      myDisabled: !!this.limit && this.value.length >= this.limit,
      myValue: this.value,
      reloadIndex: null,
      loadend: false,
      errorFiles: [],
      isHidden: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadend = true
    })
  },
  methods: {
    handleChange(data) {
      if (this.myValue && !this.myDisabled) {
        if (this.reloadIndex !== null) {
          this.$set(this.myValue, this.reloadIndex, data.url)
          this.reloadIndex = null
        } else {
          this.myValue.push(data.url)
        }
        this.change()
      }
    },
    handleRemove(index) {
      this.myValue.splice(index, 1)
      this.change()
    },
    change() {
      /**
       * @description: 值的变化后的回调
       * @param {Array} value 图片数组
       */
      this.$emit('change', this.myValue)
      this.$emit('input', this.myValue)
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', this.myValue)
        this.dispatch(this, 'ElFormItem', 'el.form.blur', this.myValue)
      }
    },
    handle() {
      this.$emit('add')
    },
    handleMoveLeft(index) {
      const arr = Object.assign([], this.myValue)
      const str = arr[index]
      arr[index] = arr[index - 1]
      arr[index - 1] = str
      this.myValue = arr
      this.change()
    },
    handleMoveRight(index) {
      const arr = Object.assign([], this.myValue)
      const str = arr[index]
      arr[index] = arr[index + 1]
      arr[index + 1] = str
      this.myValue = arr
      this.change()
    },
    /**
     * @description: 重新上传
     * @param {type}
     * @return:
     */
    handleReload(index) {
      this.reloadIndex = index
      if (this.value.length === this.limit) {
        this.isHidden = true
        this.myDisabled = false
      }
      this.$nextTick(() => {
        if (this.$refs.upload) {
          this.$refs.upload.$el.querySelector('input[type="file"]').click()
        }
      })
    },
    /**
     * @description: 上传失败
     * @param {type}
     */
    handleError(err, file) {
      this.errorFiles.push(file.url)
      this.isHidden = false
    },
    /**
     * @description: 开始上传
     * @param {type}
     */
    handleProgress() {
      this.$set(this, 'errorFiles', [])
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
