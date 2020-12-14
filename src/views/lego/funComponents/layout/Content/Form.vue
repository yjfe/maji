<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-07 15:33:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs :hasAdvanced="false">
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="文本内容：">
            <el-input type="textarea" style="width: 100%" :rows="4" v-model="item.value" />
          </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="styles">
         <FoldWraper label="样式配置" :level="1">
          <el-form-item label="颜色：">
            <el-color-picker v-model="item.color" color-format="hex"></el-color-picker>
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
  name: 'ContentForm',
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
      rules: baseData.rules
    }
  }
}
</script>
