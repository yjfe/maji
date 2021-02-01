<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-17 15:17:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :label="`${item.label}：`" :rules="item.validator.rules">
    <video
        :src="item.value"
        controls="controls"
        class="video-box"
        :style="{height: item.height || '240px', width: item.width || '360px'}"
        :poster="`${item.value}?vframe/jpg/offset/1`"
      >
        您的浏览器不支持 video 标签。
      </video>
  </el-form-item>
</template>
<script>
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'DetailVideoPreview',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
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
