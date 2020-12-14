<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 18:01:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs :hasAdvanced="false">
      <template slot="base">
        <FoldWraper label="样式管理" :level="1">
          <el-form-item label="颜色：">
            <el-color-picker v-model="item.color" color-format="hex"></el-color-picker>
          </el-form-item>
          <el-form-item label="上边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.top" /> px
          </el-form-item>
          <el-form-item label="下边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.bottom" /> px
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'

export default {
  components: { FoldWraper },
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
      rules: baseData.rules
    }
  }
}
</script>
