<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:52:53
 * @LastEditors: Please set LastEditors
 -->
<template>
   <div class="fun-text" :style="{color: item.color}">{{getTextRender(item.value, query)}}</div>
</template>
<script>
import { getTextRender, useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'ContentPreview',
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
  .desc{
    margin-left: 10px;
  }
}
</style>
