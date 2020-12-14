<!--
 * @Description: 
 * @Date: 2019-01-10 15:57:17
 * @LastEditTime: 2020-12-10 15:42:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-input
    class="input-card"
    v-bind="$attrs"
    v-model="myValue"
    :validateEvent="false"
    :placeholder="$attrs.placeholder"
    @keyup.native="handleKeyup"
    @change="handleChange"
  />
</template>
<script>
import dispatch from '@/mixins/dispatch'

export default {
  componentName: 'InputCard',
  mixins: [dispatch],
  props: {
    /**
     * @prop {String} value 卡号值
     */
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value(value) {
      this.myValue = value
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  data() {
    return {
      myValue: this.value
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  methods: {
    handleKeyup(e) {
      // 每次keyup都做值的变更 myValue只是显示值
      const value = e.target.value
        .replace(/\s/g, '')
        .replace(/[^\d]/g, '')
        .substring(0, this.$attrs.maxlength)
      this.myValue = value.replace(/(\d{4})(?=\d)/g, '$1 ')
    },
    handleChange(value) {
      value = `${value}`.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
      value = `${this.myValue}`.replace(/\s+/g, '').substring(0, this.$attrs.maxlength)
      // change后把值传出去给父级
      this.$emit('input', value).$emit('change', value)
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', [value])
        this.dispatch(this, 'ElFormItem', 'el.form.blur', [value])
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
