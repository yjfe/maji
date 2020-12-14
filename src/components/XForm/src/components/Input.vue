<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-01-30 17:20:14
 * @LastEditTime: 2020-11-08 10:09:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-input
    v-model.trim="schema.value"
    v-bind="schema.option"
    :placeholder="schema.placeholder || `请输入${schema.label}`"
    v-on="schema.on"
    @change="handleChange"
  />
</template>

<script>
export default {
  name: 'XFormInput',
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleChange() {
      const formItem = this.queryParent('ElFormItem')
      if (this.schema.pattern && !this.schema.pattern.test(this.schema.value)) {
        if (formItem) {
          formItem.validateState = 'error'
          formItem.validateMessage = this.schema.message || ''
        }
        this.schema.value = ''
      } else if (formItem) {
        formItem.validateState = ''
      }
    },
    queryParent(componentName) {
      let parent = this.$parent || this.$root
      let name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        return parent
      }
    }
  }
}
</script>
