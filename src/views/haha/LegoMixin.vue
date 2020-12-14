<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:23
 * @LastEditTime: 2020-10-13 10:01:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="preview-box online" :class="{'hasAtract': pagesModule.action && pagesModule.action.length > 0}">
    <lego-form :floorList="floorList" :pagesModule="pagesModule">
      <template v-for="(value, key) in $slots">
        <template :slot="key">
          <slot :name="key" />
        </template>
      </template>
    </lego-form>
  </div>
</template>
<script>
import formRules from '@/views/lego/formRules'
import { install, clear } from '@/views/lego/utils/apiResolver'
import LegoForm from '@/views/lego/view/ModelForm'

export default {
  name: 'legoView',
  components: { LegoForm },
  props: {
    pageOption: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pagesModule: {},
      floorList: []
    }
  },
  created() {
    this.$store.dispatch('manage/setIsEdit', false)
    this.$store.dispatch('getIframeAuth')
    // this.getDetails()
  },
  mounted() {
    this.setDetails(this.pageOption.content, this.pageOption.id)
  },
  methods: {
    setDetails(data, pageId = 'preivew') {
      try {
        const { idModule, floorList, pagesModuleId } = data
        // 模块数据增加当前页面的id
        Object.keys(idModule).forEach(item => idModule[item].pageId = pageId)
        // 存入vuex
        this.$store.dispatch('manage/setModule', formRules.addFormRules(idModule))
        this.floorList = floorList
        this.pagesModule = idModule[pagesModuleId]
        this.pagesModule.pageId = this.$route.params.id
        // 设置面包屑
        this.setBreadcrumb(this.pagesModule)
        delete idModule[pagesModuleId]
        // 设置接口环境变量
        install(this.pagesModule.envApi)
      } catch (error) {
        console.error(error)
        console.error('获取数据异常')
      }
    },
    /**
     * @method: 设置面包屑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 14:29:45
     */
    setBreadcrumb(data) {
      window.parent.postMessage(
        {
          act: 'setBreadcrumb',
          msg: [{ path: this.$route.fullPath, title: data.title }]
        },
        '*'
      )
    }
  },
  destroyed() {
    // 清理接口配置
    clear()
  }
}
</script>
<style lang="less">
@import '~@/views/lego/view/index.less';
</style>
