<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:23
 * @LastEditTime: 2020-04-15 17:41:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="preview-box online" :class="{'hasAtract': pagesModule.action && pagesModule.action.length > 0}">
    <component :is="pagesModule.type" ref="page" v-if="pagesModule.id" :floorList="floorList" :pagesModule="pagesModule" />
  </div>
</template>
<script>
import ModelDetail from './ModelDetail'
import ModelForm from './ModelForm'
import ModelList from './ModelList'
import IndexMixin from './indexMixin'

export default {
  name: 'legoView',
  mixins: [IndexMixin],
  components: {
    PagesDetail: ModelDetail,
    PagesForm: ModelForm,
    PagesList: ModelList
  }
}
</script>
<style lang="less">
@import './index.less';
</style>
