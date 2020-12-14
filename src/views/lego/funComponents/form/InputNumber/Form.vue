<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:31:28
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
          <el-form-item label="提示文本：" prop="placeholder">
            <el-input v-model="item.placeholder" />
          </el-form-item>
          <el-form-item label="默认值：">
            <el-input-number :controls="false" v-model="item.value" />
          </el-form-item>
          <el-form-item label="提示文本：">
            <el-input v-model="item.placeholder" />
          </el-form-item>
          <el-form-item label="提示备注：" prop="remark">
            <el-input v-model="item.remark" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="最大值：">
            <el-input-number :controls="false" v-model="item.max" />
          </el-form-item>
          <el-form-item label="最小值：">
            <el-input-number :controls="false" v-model="item.min" />
          </el-form-item>
          <el-form-item label="精确小数：" prop="precision">
            <el-input-number :controls="false" v-model="item.precision" /> 位 （0为整数）
          </el-form-item>
          <el-form-item label="计数器长：">
            <el-input-number :controls="false" v-model="item.step" />
          </el-form-item>
          <el-form-item label="控制按钮：">
            <el-radio v-model="item.controls" :label="true">显示</el-radio>
            <el-radio v-model="item.controls" :label="false">隐藏</el-radio>
          </el-form-item>
        </FoldWraper>
        <ValidatorDialog :options="item.validator" :rules="['required', 'apiCheck']"/>
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
import ValidatorDialog from '@/views/lego/edit/components/ValidatorDialog'
import baseData from './data'

export default {
  name: 'InputNumberForm',
  components: { ValidatorDialog, FoldWraper },
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
