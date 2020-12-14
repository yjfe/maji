<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:00:16
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
          <el-form-item label="区域：">
            <el-radio-group v-model="item.world" class="fun-radio">
              <el-radio :label="false">国内</el-radio>
              <el-radio :label="true">国际</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="精确级别：" prop="grade">
            <el-radio-group v-model="item.grade" class="fun-radio">
              <el-radio :label="1">省</el-radio>
              <el-radio :label="2">市</el-radio>
              <el-radio :label="3">区</el-radio>
              <el-radio :label="4">街道</el-radio>
            </el-radio-group>
          </el-form-item>
        </FoldWraper>
        <ValidatorDialog :options="item.validator" :rules="['required']"/>
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
  name: 'AddressCascaderForm',
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
