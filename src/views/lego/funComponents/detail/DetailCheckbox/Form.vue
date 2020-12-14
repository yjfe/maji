<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-07-13 11:37:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormCheckboxForm v-bind="$attrs" :isDetail="true">
    <slot />
  </FormCheckboxForm>
</template>
<script>
import baseData from './data'
import FormCheckboxForm from '../../form/Checkbox/Form'

export default {
  name: 'DetailCheckboxForm',
  components: { FormCheckboxForm },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
  }
}
</script>
