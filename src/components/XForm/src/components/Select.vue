<template>
  <el-select
    class="xform-select"
    v-model="schema.value"
    :placeholder="schema.placeholder || '请选择'"
    v-bind="schema.option"
    v-on="schema.on"
  >
    <el-option
      v-for="(item, index) in schema.templateOptions"
      :key="index"
      :value="item.value !== undefined ? item.value : item.label"
      :label="item.label"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'XFormSelect',
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
