<template>
  <el-cascader
    v-bind="schema.option"
    v-on="schema.on"
    :placeholder="schema.placeholder || '请选择'"
    :options="schema.templateOptions"
    v-model="schema.value"
  >
  </el-cascader>
</template>

<script>
export default {
  name: 'XFormCascader',
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
<style lang="less" scoped>
.el-radio-group {
  .el-radio {
    min-width: 60px;
    margin-right: 10px;
    & + .el-radio {
      margin-left: 10px;
    }
  }
}
</style>
