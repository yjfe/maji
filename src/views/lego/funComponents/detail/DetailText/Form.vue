<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:11:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="110px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="名称：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
          <el-form-item label="自定义输出：" prop="formatValue">
            <template slot="label">
              自定义输出：
              <TableFormatValueTips />
            </template>
            <el-input type="textarea" v-model="item.formatValue" />
          </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
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
import TableFormatValueTips from '../../tips/TableFormatValueTips'

export default {
  name: 'DetailTextForm',
  components: {
    TableFormatValueTips,
    FoldWraper
  },
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
