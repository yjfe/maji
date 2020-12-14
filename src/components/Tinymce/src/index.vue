<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-11-30 14:23:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="tinymce-container editor-container">
    <textarea :id="id" class="tinymce-textarea" />
    <div class="editor-custom-btn-container" v-if="addImg || addVideo">
      <UploadResource
        v-if="!disabled"
        :imgAction="imgAction"
        :videoAction="videoAction"
        color="#1890ff"
        class="editor-upload-btn"
        :addImg="addImg"
        :addVideo="addVideo"
        v-bind="$attrs"
        @successCBK="imageSuccessCBK"
      />
    </div>
  </div>
</template>

<script>
// 富文本
import UploadResource from './UploadResource'
import baseSetting from './setting'
// import './langs/zh_CN'

const INIT = 0
const INPUT = 1
const CHANGED = 2

export default {
  components: { UploadResource },
  props: {
    value: {
      type: String,
      default: ''
    },
    setup: {
      type: Function,
      default: () => {}
    },
    addImg: {
      type: Boolean,
      default: true
    },
    addVideo: {
      type: Boolean,
      default: true
    },
    imgAction: {
      type: String,
      default: ''
    },
    videoAction: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      editor: null,
      status: INIT,
      backup: ''
    }
  },
  watch: {
    value(val) {
      if (this.status === CHANGED) return (this.status = INPUT)
      if (!this.editor || !this.editor.initialized) return // fix editor plugin is loading and set content will throw error.
      this.editor.setContent(val)
    }
  },
  created() {
    this.id = `vue-tinymce-${Date.now()}`
    if (typeof tinymce === 'undefined') throw new Error('tinymce undefined')
  },
  mounted() {
    this.$nextTick(() => {
      const setting = Object.assign({}, baseSetting, {
        selector: `#${this.id}`,
        readonly: this.disabled,
        language: 'zh_CN',
        content_css_cors: true,
        setup: (editor) => {
          this.setup(editor)
          this.editor = editor
          editor.on('init', () => {
            // console.log('init', this.value);
            editor.setContent(this.value)
            editor.on('input change undo redo execCommand KeyUp', () => {
              if (this.status === INPUT || this.status === INIT) return (this.status = CHANGED)
              this.$emit('input', editor.getContent())
            })
            editor.on('NodeChange', () => {
              this.$emit('input', editor.getContent())
            })
          })
        }
      })
      console.log(setting)
      window.tinymce.init(setting)
      // window.tinymce.init({
      //   selector: '#aaaa',
      //   language: 'zh_CN'
      // })
    })
  },
  methods: {
    imageSuccessCBK({ type, value }) {
      let html = ''
      const { id } = this
      switch (type) {
        case 'img':
          html = this.saveImg(value)
          break
        case 'video':
          html = this.saveVideo(value)
          break
        default:
          break
      }
      window.tinymce.get(id).insertContent(html)
    },
    saveImg(arr) {
      let html = ''
      arr.forEach((v) => {
        html += `<img class="wscnph" src="${v}" >`
      })
      return html
    },
    saveVideo(file) {
      return `<video 
        width="${file.width}" 
        height="${file.height}" 
        src="${file.value}" 
        controls="controls" 
        poster="${file.value}?vframe/jpg/offset/1">
          <source src="${file.value}" />
        </video>`
    }
  },
  beforeDestroy: () => {
    if (this.editor) {
      this.editor.remove()
    }
  }
}
</script>
<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 2005;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
