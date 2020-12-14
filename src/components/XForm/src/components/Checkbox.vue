<template>
  <el-checkbox-group v-model="schema.value" v-bind="schema.option" v-on="schema.on">
    <el-checkbox
      v-for="(item, index) in schema.templateOptions"
      :key="index"
      :label="item.value !== undefined ? item.value : item.label"
      >{{ item.label }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'XFormCheckbox',
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.schema.value = this.schema.value || []
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
