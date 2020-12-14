<template>
  <el-drawer
    :visible.sync="drawer"
    direction="rtl"
    destroy-on-close
    size="50%"
    :withHeader="false"
    :show-close="false">
    <h2>代码展示</h2>
    <div class="button-box">
      <el-button type="primary" @click="handleSubmit">更新代码</el-button>
      <el-button type="primary" @click="handleCopy">复制代码</el-button>
    </div>
    <el-alert
      title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可。"
      type="warning"
      show-icon
      :closable="false"
      description="可以直接复制测试环境的JSON到正式环境导入，注意页面类型。"
      effect="light">
    </el-alert>
    <el-alert
      title="随便玩可能导致数据无法修复"
      type="error"
      show-icon
      :closable="false"
      effect="light">
    </el-alert>
    <div class="code-height">
      <CodeEditor 
        :codes="jsonData" 
        language="json"
        @onCodeChange="handleUpdate"/>
    </div>
  </el-drawer>
</template>
<script>
import CodeEditor from '@/views/lego/components/CodeEditor/index.vue'
import { copyText } from '@/utils'

export default {
  name: 'JsonDialog',
  components: {
    CodeEditor
  },
  data() {
    return {
      editor: null,
      jsonData: '',
      drawer: false,
      newCode: ''
    }
  },
  methods: {
    open(data) {
      // 对象转json，格式化
      this.jsonData = JSON.stringify(data, null, '  ')
      this.newCode = this.jsonData
      this.drawer = true
    },
    handleUpdate(code) {
      this.newCode = code
    },
    handleCopy() {
      copyText(this.newCode)
    },
    handleSubmit() {
      try {
        // 从富文本取值
        const { idModule, floorList, pagesModuleId } = JSON.parse(this.newCode)
        // 设置vuex中idModule的值
        this.$store.dispatch('manage/setModule', {})
        // 设置vuex中floorList的值
        this.$store.dispatch('manage/setFloor', [])
        // 解决数据不刷新问题
        this.$nextTick(() => {
          this.$store.dispatch('manage/setModule', idModule)
          this.$store.dispatch('manage/setFloor', floorList)
          this.$store.dispatch('manage/setPagesModuleId', pagesModuleId)
          this.$store.dispatch('manage/setActiveId', '')
          this.$store.dispatch('manage/setActiveId', pagesModuleId)
        })  
        this.drawer = false
      } catch (error) {
        // 弹出错误信息
        this.$message.error(error.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.button-box{
  margin-left: 20px;
}
.code-height{
  height: calc(100vh - 280px)
}
</style>
