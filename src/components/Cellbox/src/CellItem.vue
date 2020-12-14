<template>
  <component :is="tag || $parent.itemTag" class="cell-item" :style="styles">
    <slot></slot>
  </component>
</template>

<script>
export default {
  componentName: 'CellItem',
  props: {
    /**
     * @prop {String, Object} tag 自定义dom标签
     */
    tag: {
      type: [String, Object]
    }
  },
  computed: {
    styles() {
      return this.$parent.gutter ? { 
        'padding-left': `${this.$parent.gutter / 2}px`,
        'padding-right': `${this.$parent.gutter / 2}px`
      } : {}
    }
  }
}
</script>
<style lang="less" scoped>
@import './cellbox';
</style>
