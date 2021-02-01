<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-02-01 10:58:20
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
            <span>{{activeId}} {{componentsInfo[nowEditData.type].name}} </span>
            <el-button 
              v-if="hasChange"
              class="change-component" 
              size="mini"
              type="text"
              @click="handleChangeComponent">切换组件</el-button>
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
import SearchBaseData from '@/views/lego/funComponents/list/Search/data'

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
      changeFormType: [...manageJson.detailItems, ...manageJson.formItems],
      changeDetailType: manageJson.detailItems,
      hasChange: false,
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
        this.hasChange = this.checkHasChangeComponent(this.idModule[item].type)
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
    },
    /**
     * @Date: 2021-01-20 16:51:54
     * @method: 检测组件是否属于表单类型，显示更换组件按钮
     * @param {*} type
     * @return {*}
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    checkHasChangeComponent(type) {
      return this.changeFormType.indexOf(type) >= 0
    },
    /**
     * @Date: 2021-01-20 16:51:54
     * @method: 点击按钮操作，打开选择框
     * @param {*} type
     * @return {*}
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleChangeComponent() {
      let fun
      if (this.nowEditData.parent && /^Search/.test(this.nowEditData.parent)) {
        // 在搜索框的
        fun = SearchBaseData.moduleFun
      } else if (/detail/.test(this.$route.path)) { // 在详情页的
        fun = this.changeDetailType
      } else { // 在表单页的
        fun = this.changeFormType
      }
      const node = document.createElement('div')
      const callback = this.changeComponentData
      document.body.appendChild(node)
      new Vue({ // eslint-disable-line
        el: node,
        components: {
          AddModuleDialog: () => import('@/views/lego/edit/components/AddModuleDialog')
        },
        data() {
          return {
            moduleFun: fun
          }
        },
        mounted() {
          setTimeout(() => {
            this.$refs.AddModuleDialog.open()
          }, 0)
        },
        methods: {
          handleClose() {
            this.$destroy()
          },
          handleAddModule(res) {
            callback(res)
          }
        },
        render() {
          return <AddModuleDialog ref="AddModuleDialog" 
            fun={this.moduleFun}
            onSelect={this.handleAddModule} />
        }
      })
    },
    /**
     * @Date: 2021-01-20 16:51:54
     * @method: 点击按钮操作，打开选择框
     * @param {*} type
     * @return {*}
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    changeComponentData(newModel) {
      const noKey = ['id', 'type', 'value', 'validator', 'styles', 'componentEvent']
      const { id, data } = newModel
      Object.keys(data).forEach((key) => {
        if (this.nowEditData[key] && (noKey.indexOf(key) === -1)) {
          data[key] = this.nowEditData[key]
        }
      })
      // 嵌套关系的保留
      if (this.nowEditData.parent) {
        data.parent = this.nowEditData.parent
      }
      this.setComponent(id, data)
    },
    /**
     * @Date: 2021-01-20 16:51:54
     * @method: 对组件数据替换，从vuex
     * @param {*} type
     * @return {*}
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    setComponent(newId, data) {
      const nowId = this.nowEditData.id
      // 加入vuex 新增模块对象
      this.$store.dispatch('manage/addModule', { 
        data: { ...data, id: newId },
        id: newId 
      })
      // 判断父级更新
      if (this.nowEditData.parent) {
        // 存在父级，更换组件引用关系
        const parentData = this.idModule[this.nowEditData.parent]
        // 新数据的处理，通过正则处理上级的组件id和名称
        const newParentData = JSON.parse(JSON.stringify(parentData)
          .replace(nowId, newId)
          .replace(manageJson.componentsInfo[this.nowEditData.type].name, manageJson.componentsInfo[data.type].name))
        // 暴力点的赋值，使用vuex数据监听不到变化
        Object.keys(newParentData).forEach(key => this.$set(parentData, key, newParentData[key]))
      } else {
        // 不存在父级，从楼层数据修改
        const index = this.floorList.indexOf(nowId)
        this.$set(this.floorList, index, newId)
      }
      // 删除编辑前的对象
      this.$store.dispatch('manage/removeModule', { 
        module: nowId,
        go: newId
      })
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
