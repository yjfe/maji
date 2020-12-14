<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:56:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :style="{
    'margin-top': `${item.marginTop}px`,
    'margin-bottom': `${item.marginBottom}px`,
    'padding-top': `${item.paddingTop}px`,
    'padding-bottom': `${item.paddingBottom}px`,
    'text-align': item.align,
    'background': item.bgColor}">
    <img  v-for="list in imgList" :key="list" :src="list" :style="{'width': item.width, 'height': item.height}" />
    <span v-if="imgList.length === 0">请上传图片</span>
  </div>
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
  computed: {
    imgList() {
      if (Array.isArray(this.item.value)) {
        return this.item.value
      }
      
      if (typeof this.item.value === 'string') {
        return this.item.value ? [this.item.value] : []
      }

      return this.item.value
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
</style>
