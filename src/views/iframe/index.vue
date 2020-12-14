<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-19 16:39:16
 * @LastEditTime: 2020-03-18 17:11:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <ContentBox label="调试框" :gap="10">
      <el-input v-model="componentId" style="width: 200px;margin-right: 20px" placeholder="组件ID" />
      <el-button @click="sendMessage">refreshData</el-button>
    </ContentBox>
    <iframe ref="iframe" :src="iframePath" class="iframe-box"/>
  </div>
</template>
<script>
import config from './config'

export default {
  data() {
    return {
      componentId: ''
    }
  },
  computed: {
    iframePath() {
      return this.resolverUrl(this.$route.params.pathMatch)
    }
  },
  mounted() {
    window.addEventListener('message', this.switchEvent, true)
  },
  destroyed() {
    window.removeEventListener('message', this.switchEvent, true)
  },
  methods: {
    switchEvent(e) {
      switch (e.data.act) {
        case 'setBreadcrumb':
          this.setBreadcrumb(e.data.msg)
          break
        case 'routerLink':
          this.toRouterLink(e.data.msg)
          break
        case 'export':
          console.log(e)
          break
        case 'import':
          console.log(e)
          break
        default:
          break
      }
    },
    /**
     * @method: 面包屑方法
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 10:16:05
     */
    setBreadcrumb(data) {
      // 根据各个项目不同处理
      this.$setBreadcrumb(data)
    },
    /**
     * @method: 外部跳转地址
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 09:55:23
     */
    toRouterLink(data) {
      this.$router.push(data)
    },
    /**
     * @method: 根据环境转换url
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 09:55:12
     */
    resolverUrl(url) {
      const project = url.split('/')[0]
      const { env } = window.globalConfig
      url = url.replace(`${project}/`, '')
      try {
        url = `//${config[project][env]}/${url}`
      } catch (error) {
        url = `${window.location.origin}/${url}`
      }
      return url
    },
    sendMessage() {
      console.log('发消息', this.componentId)
      this.$refs.iframe.contentWindow.postMessage(
        {
          act: 'refreshData',
          msg: {
            id: this.componentId,
            query: {}
          }
        },
        '*'
      )
    }
  }
}
</script>
<style lang="less" scoped>
.iframe-box {
  width: 100%;
  min-height: calc(100vh - 68px);
  border: 0;
}
</style>
