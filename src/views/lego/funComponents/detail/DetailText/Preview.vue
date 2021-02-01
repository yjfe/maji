<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-17 15:16:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :label="`${item.label}：`" :rules="item.validator.rules">
    <span v-html="text" />
  </el-form-item>
</template>
<script>
import { getTextRender, useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'DetailTextPreview',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  computed: {
    text() {
      if (!this.item.formatValue) {
        try {
          // eslint-disable-next-line
          const value = eval(`this.pageData.${this.item.key}`)
          if (value || value === 0) {
            return value
          }
          // 利用错误直接走下面的方法
          throw value
        } catch (error) {
          const { value } = this.item
          if (value || value === 0) {
            return value
          }
          return ''
        }
      }
      return getTextRender(this.item.formatValue, this.pageData)
    }
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.pageData, this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
