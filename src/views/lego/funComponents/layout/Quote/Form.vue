<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-03-27 17:22:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <h4>编辑引用</h4>
    <FoldWraper label="功能配置" :level="1">
      <el-form-item label="引用ID：">
        <el-input
          @change="item.quotePageId = quotePageId"
          v-model="quotePageId"/>
        <p v-show="pageName">页面名称：{{pageName}}</p>
      </el-form-item>
    </FoldWraper>
    <slot />
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'

export default {
  components: {
    FoldWraper
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      quotePageId: this.item.quotePageId,
      pageName: '',
      rules: baseData.rules
    }
  },
  methods: {
    // handleChange(value) {
    //   if (!value) return
    // }
  }
}
</script>
