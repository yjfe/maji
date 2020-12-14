<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-03 11:12:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormCheckboxPreview v-bind="$attrs" :item="item" readonly v-on="$listeners"/>
</template>
<script>
import FormCheckboxPreview from '../../form/Checkbox/Preview'

export default {
  name: 'DetailCheckboxPreview',
  components: {
    FormCheckboxPreview
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
