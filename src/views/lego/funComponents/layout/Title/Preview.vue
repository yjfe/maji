<template>
   <div class="fun-title">
     <span class="font-title">{{getTextRender(item.title, query)}}</span>
     <span class="font-text-sub desc">{{getTextRender(item.desc, query)}}</span>
   </div>
</template>
<script>
import { getTextRender, useCodeEvent } from '@/views/lego/utils'

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    getTextRender(template, context) {
      return getTextRender(template, context)
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
<style lang="less" scoped>
.fun-title{
  margin: 10px 0;
  .desc{
    margin-left: 10px;
  }
}
</style>
