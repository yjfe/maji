<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-08 17:10:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form-zone">
    <el-tabs class="form-zone__tabs" v-model="tabsActive" type="card" @tab-click="handleChangeTabs">
      <el-tab-pane label="组件配置" name="component"></el-tab-pane>
      <el-tab-pane label="页面配置" name="page"></el-tab-pane>
    </el-tabs>
    <el-button 
      class="go-back" 
      v-if="nowEditData && nowEditData.parent" 
      icon="el-icon-arrow-left"
      size="mini"
      @click="handleGoBack">返回上一层</el-button>
    <div class="form-zone__content">
      <div class="form-zone__form">
        <template v-if="activeId">
          <div class="form-zone__comId">当前组件ID：
            <span>{{activeId}} {{componentsInfo[nowEditData.type].name}} 组件内容配置</span>
          </div>
          <FormZoneNow ref="FormZoneNow"  :item="nowEditData" :key="activeId">
          </FormZoneNow>
        </template>
        <div class="form-zone__comId" v-else>请先选择组件</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import manageJson from '@/views/lego/funComponents/manage.json'
import FoldWraper from '@/views/lego/components/FoldWraper'
import ComponentFormHeadTabs from '@/views/lego/components/ComponentFormHeadTabs'
import CodePointEvent from '@/views/lego/components/CodePointEvent'
import { getComponentFile } from '@/views/lego/utils'

export default {
  computed: {
    ...mapState({
      floorList: state => state.manage.floorList,
      activeIndex: state => state.manage.activeIndex,
      activeId: state => state.manage.activeId,
      idModule: state => state.manage.idModule,
      pagesModuleId: state => state.manage.pagesModuleId
    })
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo,
      nowEditData: {},
      tabsActive: 'page'
    }
  },
  watch: {
    activeId(value) {
      if (value) {
        this.changeFormComonpent(value)
      }
    }
  },
  mounted() {
    // 注册这三个组件后面常用的，多次引入太烦了，这样引入，不会污染预览的时候
    Vue.component('ComponentFormHeadTabs', ComponentFormHeadTabs)
    Vue.component('FoldWraper', FoldWraper)
    Vue.component('CodePointEvent', CodePointEvent)
    this.$root.$on('startValidator', () => {
      this.$nextTick(() => {
        try {
          this.$refs.FormZoneNow.$refs.form.validate()
        } catch (error) {
          console.error('找不到组件')
        }
      })
    })
  },
  methods: {
    /**
     * @description: 切换组件更换相应的表单
     * @param {type} 
     * @return: 
     */
    changeFormComonpent(item) {
      if (item !== this.pagesModuleId) {
        this.tabsActive = 'component'
      }
      try {
        this.nowEditData = this.idModule[item]
        Vue.component(
          'FormZoneNow', 
          getComponentFile(this.idModule[item].type, 'Form')
        )
      } catch (error) {
        console.error(`找不到组件: ${item}`)
      }
    },
    /**
     * @description: 上移
     * @param {type} 
     * @return: 
     */
    handleMoveTop() {
      this.$store.dispatch('manage/moveTop')
    },
    /**
     * @description: 下移
     * @param {type} 
     * @return: 
     */
    handleMoveBottom() {
      this.$store.dispatch('manage/moveBottom')
    },
    /**
     * @description: 返回上一级
     * @param {type} 
     * @return: 
     */  
    handleGoBack() {
      this.$store.dispatch('manage/setActiveId', this.nowEditData.parent)
    },
    /**
     * @method: tabs切换事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-05-29 16:20:25
     */  
    handleChangeTabs() {
      let moduleId
      switch (this.tabsActive) {
        case 'component':
          moduleId = this.floorList[this.activeIndex]
          break
        case 'page':
          moduleId = this.pagesModuleId
          break
        default:
          break
      }
      this.$store.dispatch('manage/setActiveId', moduleId)
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
