<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:48:53
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
          <el-form-item label="默认值：" v-if="!item.isRange">
            <el-input v-model.lazy="item.value" />
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
          <el-form-item label="选择类型：">
            <el-radio v-model="item.isRange" @click="handleChange" :label="false">单选</el-radio>
            <el-radio v-model="item.isRange" @click="handleChange" :label="true">范围</el-radio>
          </el-form-item>
          <el-form-item label="时间格式：">
            <el-select v-model="item.valueFormat">
              <el-option value="HH:mm"></el-option>
              <el-option value="HH:mm:ss"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="允许时间范围：" v-if="!item.isRange">
            <el-time-picker
              is-range
              v-model="item.selectableRangeDate"
              @change="handleChangeRange"
              valueFormat="HH:mm:ss"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
          <ValidatorDialog 
          :options="item.validator" 
          :rules="['required']"/>
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
import ValidatorDialog from '@/views/lego/edit/components/ValidatorDialog'
import baseData from './data'

export default {
  name: 'TimePickForm',
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
  },
  methods: {
    handleChange() {
      if (this.item.isRange) {
        this.item.vlaue = []
      } else {
        this.item.vlaue = ''
      }
    },
    handleChangeRange(value) {
      try {
        this.item.selectableRange = value.join('-')
      } catch (error) {
        this.item.selectableRange = ''
      }
    }
  }
}
</script>
