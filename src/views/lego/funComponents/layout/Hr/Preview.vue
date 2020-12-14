<template>
   <div class="fun-hr" :style="{'margin-top': `${item.top}px`, 'margin-bottom': `${item.bottom}px`, 'border-color': item.color}"></div>
</template>
<script>
import { useCodeEvent } from '@/views/lego/utils'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
<style lang="less" scoped>
.fun-hr{
  display: block;
  border-bottom: 1px solid;
}
</style>
