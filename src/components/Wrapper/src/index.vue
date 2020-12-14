<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'Wrapper'
}
</script>
<style lang="less">
.wrapper {
  width: 100%;
  margin: 0 auto;
  &::after {
    content: '';
    clear: both;
    display: table;
  }
}
</style>
