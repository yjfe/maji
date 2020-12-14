<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-26 17:34:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <el-form-item label="名称：" prop="label">
          <el-input v-model="item.label" />
        </el-form-item>
        <el-form-item label="默认值：" prop="value">
        </el-form-item>
        <Tinymce v-model="item.value" />
        <slot />
      </template>
      <template slot="data">
        <el-form-item label="字段名：" prop="key">
          <el-input v-model.trim="item.key" />
        </el-form-item>
      </template>
      <template slot="styles">
        <el-form-item label="样式：" prop="key">
          <el-radio-group v-model="item.styles" >
            <el-radio :label="0">带标题</el-radio>
            <el-radio :label="1">不带标题</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import baseData from './data'

export default {
  name: 'DetailEditorForm',
  components: { Tinymce },
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
