<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-10-17 16:29:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ListTablePreview v-bind="$attrs" :item="item" :pageData="pageData"/>
</template>
<script>
import ListTablePreview from '../../list/Table/Preview'

export default {
  name: 'DetailTablePreview',
  components: {
    ListTablePreview
  },
  props: {
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
