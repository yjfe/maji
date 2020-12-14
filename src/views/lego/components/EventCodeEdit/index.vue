<template>
  <el-drawer
    class="event-code-edit"
    :visible.sync="drawer"
    direction="rtl"
    destroy-on-close
    size="800px"
    @closed="handleClose"
    :withHeader="false"
    :show-close="false">
    <div class="event-code-edit-box">
      <template v-if="eventInfo.eventName">
        <h3>当前事件: {{eventInfo.eventName}} {{eventInfo.info}}</h3>
        <div class="event-info">
          <el-row>
            <el-col :span="2" class="event-info-types">入参：</el-col>
            <el-col :span="20">
              <p v-for="(item, index) in eventInfo.params" :key="index">
                <span>{{item.name}}</span>
                <span>{{`{ ${item.type}`}} }</span>
                <span>{{item.info}}</span>
              </p>
            </el-col>
          </el-row>
          <el-row v-if="eventInfo.return">
            <el-col :span="2" class="event-info-types">返回：</el-col>
            <el-col :span="20">
              <p>
                <span>{{eventInfo.return.name}}</span>
                <span>{{`{ ${eventInfo.return.type}`}} }</span>
                <span>{{eventInfo.return.info}}</span>
              </p>
            </el-col>
          </el-row>
        </div>
      </template>
      <p></p>
      <div class="code-height">
        <CodeEditor 
          :codes="code" 
          language="javascript"
          @onCodeChange="handleUpdate"/>
      </div>
      <div class="button-box">
        <el-button type="text">编辑事件函数或自定义方法代码</el-button>
        <el-button @click="handleSubmit">保存 ctrl+s</el-button>
        <el-button @click="handleSubmit">关闭 esc</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import CodeEditor from '@/views/lego/components/CodeEditor/index.vue'

export default {
  name: 'EventCodeEdit',
  components: {
    CodeEditor
  },
  props: {
    code: String,
    eventInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      drawer: true,
      newCode: ''
    }
  },
  mounted() {
    this.newCode = this.code
    // 挂载键盘事件
    document.addEventListener('keydown', this.handleKeyboardEvent)
  },
  beforeDestroy() {
    // 销毁键盘事件
    document.removeEventListener('keydown', this.handleKeyboardEvent)
  },
  methods: {
    handleUpdate(code) {
      this.newCode = code
    },
    handleSubmit() {
      this.$emit('change', this.newCode)
      this.drawer = false
    },
    handleClose() {
      this.$emit('close')
    },
    /**
     * @Date: 2020-06-12 16:25:17
     * @method: 键盘事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */  
    handleKeyboardEvent(event) {
      if (event.keyCode === 83 && event.ctrlKey) { // ctrl+s
        this.handleSubmit()
        event.preventDefault()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var.less';
.event-code-edit{
  margin-right: 510px;
  &-box{
    padding: 16px;
    span{
      margin-right: 10px;
    }
  }
  .button-box{
    margin-top: 10px;
    text-align: right;
  }
  .event-info{
    background: tan;
    line-height: 32px;
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin-bottom: 10px;
    height: 144px;
    p{
      margin: 0;
      span{
      display: inline-block;
       &:first-child {
         width: 80px;
       }
       &:nth-child(2) {
         width: 60px;
       }
      }
    }
    &-types{
      font-weight: 600;
      text-align: right;
      padding-right: 10px;
    }
  }
  .code-height{
    height: calc(100vh - 286px);
    border-left: 1px solid @border-color-base;
    border-top: 1px solid @border-color-base;
    border-bottom: 1px solid @border-color-base;
    background: #ffffff;
    padding: 10px 0;
  }
}

</style>
