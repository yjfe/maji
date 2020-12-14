<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-08 15:00:32
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
        <FoldWraper label="样式配置" :level="1">
          <el-form-item label="颜色：">
            <el-color-picker v-model="item.color" color-format="hex"></el-color-picker>
          </el-form-item>
          <el-form-item label="布局：">
            <el-radio-group v-model="item.textAlign">
              <el-radio label="left">居左</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="right">居右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图标：">
            <ImgUpload v-model="item.imgSrc" 
              :data="{maxHeight: 50, maxWidth: 50}" 
              isTip
              :with-credentials="true" />
          </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="data">
        <el-form-item label="自定义输出：" prop="formatValue">
          <el-input type="textarea" v-model="item.formatValue" />
        </el-form-item>
        <el-form-item label="字段名：" prop="key">
          <el-input v-model.trim="item.key" />
        </el-form-item>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import ImgUpload from '@/components/ImgUpload'
import baseData from './data'

export default {
  name: 'DetailPanelForm',
  components: {
    ImgUpload
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
