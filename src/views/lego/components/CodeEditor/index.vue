<template>
  <div id="container" ref="container" style="height:100%"></div>
</template>
<script>
import * as monaco from 'monaco-editor'

export default {
  props: {
    codes: {
      type: String,
      default: '{}'
    },
    language: {
      type: String,
      default: 'html'
    },
    theme: { // 颜色主题 默认 vs 高亮 hc-black  深色 vs-dark
      type: String,
      default: 'vs'
    },
    editorOptions: {
      type: Object,
      default: () => ({
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false, // 只读
        cursorStyle: 'line', // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false,
        fontSize: 28, // 字体大小
        autoIndent: true, // 自动布局
        MinimapPosition: true
        // quickSuggestionsDelay: 500,   // 代码提示延时
      })
    }
  },
  data() {
    return {
      codesCopy: null // 内容备份
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      const self = this
      self.$refs.container.innerHTML = ''
      self.monacoEditor = monaco.editor.create(self.$refs.container, {
        value: self.codesCopy || self.codes,
        language: self.language,
        theme: self.theme, // vs, hc-black, or vs-dark
        editorOptions: self.editorOptions
      })
      self.$emit('onMounted', self.monacoEditor) // 编辑器创建完成回调
      self.monacoEditor.onDidChangeModelContent((event) => {
        // 编辑器内容changge事件
        self.codesCopy = self.monacoEditor.getValue()
        self.$emit('onCodeChange', self.monacoEditor.getValue(), event)
      })
    }
  }
}
</script>
