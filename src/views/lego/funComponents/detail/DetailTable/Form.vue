<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-07-13 11:38:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ListTableForm :item="item" v-bind="$attrs">
    <slot />
  </ListTableForm>
</template>
<script>
import baseData from './data'
import ListTableForm from '../../list/Table/Form'

export default {
  name: 'DetailTableForm',
  components: { ListTableForm },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
