<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:50:11
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
          <el-form-item label="默认值：">
            <el-input v-model="item.value" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="限制大小：" prop="size">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.size" /> kb
          </el-form-item>
          <el-form-item label="最大高度：">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.maxHeight" /> px
          </el-form-item>
          <el-form-item label="支持格式：" prop="fileType">
            <el-checkbox-group v-model="item.fileType" @change="handleFileType">
              <el-checkbox v-for="(option, index) in fileType" :key="index" :label="option"></el-checkbox>
            </el-checkbox-group>
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
  name: 'ImgUploadForm',
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
      fileType: baseData.fileTypeEnums,
      rules: baseData.rules
    }
  },
  methods: {
    handleFileType() {
      const formatList = []
      const accept = []
      this.item.fileType.forEach((item) => {
        formatList.push(`.${item}`)
        accept.push(`image/${item}`)
      })
      this.item.formatList = formatList
      this.item.accept = accept.join(',')
    }
  }
}
</script>
