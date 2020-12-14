<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-22 15:13:56
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
          <el-form-item label="提示文本：" prop="placeholder">
            <el-input v-model="item.placeholder" />
          </el-form-item>
          <el-form-item label="提示备注：" prop="remark">
            <el-input v-model="item.remark" />
          </el-form-item>
          <slot />
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="默认值：" prop="value">
            <el-input v-model="item.value" />
          </el-form-item>
          <el-form-item label="选择数量：" prop="multiple">
            <el-radio-group v-model="item.multiple">
              <el-radio :label="false">单选</el-radio>
              <el-radio :label="true">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任意级别选择：" prop="checkStrictly">
            <el-switch
              v-model="item.checkStrictly"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
          </el-form-item>
          <el-form-item label="选中节点值：" prop="emitPath">
            <el-switch
              v-model="item.emitPath"
              active-text="末尾节点"
              inactive-text="数组节点">
            </el-switch>
          </el-form-item>
          <ValidatorDialog 
            :options="item.validator" 
            :rules="['required']"/>
          <slot />
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model.trim="item.key" />
          </el-form-item>
          <el-form-item label="接口地址：">
            <template slot="label">
              接口地址：
              <ApiTips />
            </template>
            <el-input type="textarea" v-model="item.apiUrl" placeholder="请输入接口地址" />
          </el-form-item>
          <el-form-item label="value字段名：" prop="valueKey">
            <el-input v-model="item.valueKey" />
          </el-form-item>
          <el-form-item label="label字段名：" prop="labelKey">
            <el-input v-model="item.labelKey" />
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import ValidatorDialog from '@/views/lego/edit/components/ValidatorDialog'
import baseData from './data'
import ApiTips from '../../tips/ApiTips'

export default {
  name: 'CascaderForm',
  components: { ValidatorDialog, ApiTips, FoldWraper },
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
