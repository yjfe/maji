<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-07-09 14:37:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <FormRadioForm v-bind="$attrs" :isDetail="true">
    <slot />
  </FormRadioForm>
</template>
<script>
import baseData from './data'
import FormRadioForm from '../../form/Radio/Form'

export default {
  name: 'DetailRadioForm',
  components: { FormRadioForm },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
  }
}
</script>
