<template>
  <div class="">
    {{item.title}} - 页面基础配置 
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
