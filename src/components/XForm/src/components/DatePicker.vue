<template>
  <el-date-picker
    v-on="schema.on"
    v-model="schema.value"
    :placeholder="schema.placeholder || '请选择时间'"
    v-bind="schema.option"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'XFormDatePicker',
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
