<template>
  <component :is="tag" :class="classes">
    <slot></slot>
  </component>
</template>

<script>
export default {
  componentName: 'Cellbox',
  props: {
    /**
     * @prop {Boolean} middle 居中
     */
    middle: {
      type: Boolean
    },
    /**
     * @prop {Number} gutter 间隙宽度
     */
    gutter: {
      type: Number,
      default: 0
    },
    /**
     * @prop {String, Object} tag 自定义dom标签 外层
     */
    tag: {
      type: [String, Object],
      default: 'div'
    },
    /**
     * @prop {String, Object} itemTag 自定义dom标签 里层item
     */
    itemTag: {
      type: [String, Object],
      default: 'div'
    }
  },
  computed: {
    classes() {
      return {
        cellbox: true,
        'cellbox-middle': this.middle
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import './cellbox';
</style>
