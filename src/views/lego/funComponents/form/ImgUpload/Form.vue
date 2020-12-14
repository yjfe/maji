<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:21:24
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
          <el-form-item label="上传模式：" prop="size">
            <el-radio-group v-model="item.uploadType" @change="handleChangeUploadType">
              <el-radio :label="0">单图模式</el-radio>
              <el-radio :label="1">多图模式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="最大数量：" prop="size" v-if="item.uploadType === 1">
            <el-input-number :min="1" :controls="false" :precision="0" :step="1" v-model.number="item.maxNum" /> kb
          </el-form-item>
          <el-form-item label="限制大小：" prop="size">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.size" /> kb
          </el-form-item>
          <el-form-item label="限制宽度：">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.width" /> px
          </el-form-item>
          <el-form-item label="最大宽度：">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.maxWidth" /> px
          </el-form-item>
          <el-form-item label="限制高度：">
            <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.height" /> px
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
      fileType: ['jpg', 'png', 'jpeg', 'gif'],
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
    },
    // 上传类型变更，value改为数组
    handleChangeUploadType() {
      switch (this.item.uploadType) {
        case 0:
          this.$set(this.item, 'value', '')
          this.$set(this.item, 'uploadComponent', 'ImgUpload')
          break
        default:
          this.$set(this.item, 'value', [])
          this.$set(this.item, 'uploadComponent', 'ImgGroupUpload')
          break
      }
    }
  }
}
</script>
