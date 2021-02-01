<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-17 15:16:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :label="`${item.label}：`" :rules="item.validator.rules">
    <el-image
      v-for="list in imgList"
      :key="list"
      :src="list"
      :style="{ height: item.height 
        || 'auto', width: item.width || 'auto', 'margin-right': `${item.gap || 5}px`, 'margin-boggtom': `${item.gap || 5}px` }"
      lazy
      :preview-src-list="[list]">
    </el-image>
    <template v-if="imgList.length === 0">
      <el-image
        v-if="isEdit"
        :style="{height: item.height || 'auto', width: item.width || 'auto'}" >
      </el-image>
      <span v-else>{{item.errorMsg || '暂无图片'}}</span>
    </template>
  </el-form-item>
</template>
<script>
import { mapState } from 'vuex'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'DetailImgPreview',
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
    ...mapState({
      isEdit: state => state.manage.isEdit
    }),
    imgList() {
      // 从外部取值
      const data = this.pageData[this.item.key] || []
      // 将字符串转数组，等同于单图模式的
      if (typeof data === 'string') {
        return data.split(',').filter(item => !!item)
      }
      if (Array.isArray(data)) {
        return data.filter(item => !!item)
      }
      return data
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
