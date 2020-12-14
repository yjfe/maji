<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-03 11:12:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormRadioPreview v-bind="$attrs" :item="item" readonly v-on="$listeners"/>
</template>
<script>
import FormRadioPreview from '../../form/Radio/Preview'

export default {
  name: 'DetailRadioPreview',
  components: {
    FormRadioPreview
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
