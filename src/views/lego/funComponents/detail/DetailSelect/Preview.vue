<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-02-20 12:03:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormSelectPreview v-bind="$attrs" :item="item" disabled v-on="$listeners"/>
</template>
<script>
import FormSelectPreview from '../../form/Select/Preview'

export default {
  name: 'DetailSelectPreview',
  components: {
    FormSelectPreview
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
