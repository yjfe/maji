<template>
  <el-radio-group v-model="schema.value" v-bind="schema.option" v-on="schema.on">
    <el-radio
      v-for="(item, index) in schema.templateOptions"
      :key="index"
      :label="item.value !== undefined ? item.value : item.label"
      >{{ item.label }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  name: 'XFormRadio',
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
