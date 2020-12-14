<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-22 15:59:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <layout class="frame">
    <EditHeader slot="header" @submit="handleSubmit"/>
    <sidebar slot="sidebar" class="frame-sidebar" ref="frame-sidebar" :menuList="menuList" title="麻鸡搭建系统"></sidebar>
    <XBody slot="body" class="frame-body">
      <wrapper :class="classes">
        <div class="frame-container" ref="frame-container">
          <legoCore pageType="PagesList" :fun="funGroup" @savePagesModuleId="savePagesModuleId"/>
        </div>
      </wrapper>
    </XBody>
    <div slot="footer"></div>
  </layout>
</template>
<script>
import manageJson from '@/views/lego/funComponents/manage.json'
import mixinCore from './mixinCore'

export default {
  name: 'legoEditList',
  mixins: [mixinCore],
  data() {
    return {
      pageType: 1,
      funGroup: {
        listItems: manageJson.listItems,
        layoutItems: ['Title', 'Img', 'Content', 'Hr', 'Row', 'Tabs'],
        formItems: [],
        privateItems: [],
        detailItems: ['DetailPanel']
      }
    }
  },
  beforeMount() {
    this.$setBreadcrumb([
      { path: '/page/manage', title: '页面管理' },
      { path: this.$route.fullPath, title: '列表页编辑' }
    ])
  }
}
</script>
