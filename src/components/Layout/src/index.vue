<template>
  <div class="layout">
    <slot name="sidebar"></slot>
    <div class="layout--content">
      <slot v-if="$slots.header" name="header"></slot>
      <x-header v-else></x-header>
      <slot name="body"></slot>
      <slot v-if="$slots.footer" name="footer"></slot>
      <x-footer v-else></x-footer>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import XHeader from '../../XHeader'

export default {
  componentName: 'ELayout',
  components: {
    XHeader
  }
}
</script>
<style lang="less" scoped></style>
