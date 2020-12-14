<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 16:45:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="名称：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="styles">
        <FoldWraper label="样式配置" :level="1">
          <el-form-item label="宽度：" prop="width">
            <el-input v-model="item.width" /> 例： 200px 或 auto
          </el-form-item>
          <el-form-item label="高度：" prop="height">
            <el-input v-model="item.height" /> 例： 200px 或 auto
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="1">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model.trim="item.key" />
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
  name: 'DetailVideoForm',
  components: { FoldWraper },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
