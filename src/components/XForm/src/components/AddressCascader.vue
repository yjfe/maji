<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-04-29 15:04:04
 * @LastEditTime: 2020-11-08 10:24:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <AddressCascader v-model="schema.value" v-bind="schema.option" v-on="schema.on"></AddressCascader>
</template>

<script>
import AddressCascader from '@/components/AddressCascader'

export default {
  name: 'XFormAddressCascader',
  components: {
    AddressCascader
  },
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
