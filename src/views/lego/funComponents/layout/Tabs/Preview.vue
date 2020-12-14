<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-04 17:05:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tabs v-model="item.value" @tab-click="handleClick">
    <el-tab-pane v-for="(tabsItem, index) in item.layout" :key="index" :label="tabsItem.label" :name="tabsItem.value"></el-tab-pane>
  </el-tabs>
</template>
<script>
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'TabsPreview',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  methods: {
    handleClick(tab) {
      this.$nextTick(() => {
        const data = Object.assign({}, this.query, {
          [this.item.key]: tab.name
        })
        useCodeEvent(this.item, 'componentValueChange', this)(tab.name, this.item, this.$store.getters['manage/idModule'])
        if (!this.item.hasSearch) return
        this.emitSearch(data)
      })
    },
    /**
     * @method: 触发emit的搜索
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 14:44:13
     */
    emitSearch(formData) {
      if (this.item.searchScope === 1) {
        // 给全局处理数据
        this.$root.$emit(`pageGetData${this.item.isDialog || ''}`, { query: formData, type: 'changeQuery' })
        // 发给指定组件执行搜索
        this.$nextTick(() => {
          this.item.searchTarget.forEach((item) => {
            this.$root.$emit('DetailChartsXY1605754186983Search', { query: formData, type: 'search' })
            this.$root.$emit(`${item}Search${this.item.isDialog || ''}`, { query: formData, type: 'search' })
          })
        })
      } else {
        // 发起给页面总接口搜索
        this.$root.$emit(`pageGetData${this.item.isDialog || ''}`, { query: formData, type: 'search' })
      }
    }
  }
}
</script>
