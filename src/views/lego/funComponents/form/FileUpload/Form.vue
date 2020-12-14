<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-26 17:07:02
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
          <el-form-item label="数量限制：" prop="maxNum">
            <el-input-number :min="1" :controls="false" :precision="0" :step="1" v-model.number="item.maxNum" />
          </el-form-item>
          <el-form-item label="限制大小：" prop="size">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.size" /> MB
          </el-form-item>
          <el-form-item label="支持格式：" prop="fileType">
            <el-checkbox-group v-model="item.fileType" @change="handleFileType">
              <el-checkbox v-for="(option, index) in fileType" :key="index" :label="option"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <ValidatorDialog :options="item.validator" :rules="['required']"/>
          <slot />
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model="item.key" />
          </el-form-item>
          <el-form-item label="接口地址：">
            <template slot="label">
              接口地址：
              <ApiTips />
            </template>
            <el-input type="textarea" v-model="item.apiUrl" placeholder="请输入接口地址" />
          </el-form-item>
          <el-form-item label="接收参数名：" prop="apiName">
            <el-input v-model="item.apiName" />
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
import ApiTips from '../../tips/ApiTips'

export default {
  name: 'FileUploadForm',
  components: { ValidatorDialog, ApiTips, FoldWraper },
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
      fileType: baseData.fileType,
      rules: baseData.rules
    }
  },
  methods: {
    handleFileType() {
      const formatList = []
      const accept = []
      this.item.fileType.forEach((item) => {
        formatList.push(`.${item}`)
        accept.push(`${item}`)
      })
      this.item.formatList = formatList
      this.item.accept = accept.join(',')
    }
  }
}
</script>
