<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-10-28 16:09:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormSelectForm v-bind="$attrs" :isDetail="true">
    <slot />
  </FormSelectForm>
</template>
<script>
import baseData from './data'
import FormSelectForm from '../../form/Select/Form'

export default {
  name: 'DetailSelectForm',
  components: { FormSelectForm },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
  }
}
</script>
