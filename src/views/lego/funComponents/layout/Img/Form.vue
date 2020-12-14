<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-26 16:06:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="内容配置" :level="1">
        <el-form-item label="图片上传：">
          <!-- <ImgUpload v-model="item.value" :with-credentials="true" /> -->
          <ImgGroupUpload v-if="Array.isArray(item.value)" v-model="item.value" :with-credentials="true" />
        </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="styles">
         <FoldWraper label="样式配置" :level="1">
          <el-form-item label="图片宽度：">
            <el-input v-model="item.width" />
            <div class="tip">请带上单位 '%'、'px' 或 'auto'</div>
          </el-form-item>
          <el-form-item label="图片高度：">
            <el-input v-model="item.height" />
            <div class="tip">请带上单位 '%'、'px' 或 'auto'</div>
          </el-form-item>
          <el-form-item label="布局：">
            <el-radio-group v-model="item.align" class="fun-radio">
              <el-radio label="left">左</el-radio>
              <el-radio label="center">居中</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker v-model="item.bgColor" show-alpha></el-color-picker>
          </el-form-item>
          <el-form-item label="上外边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.marginTop" /> px
          </el-form-item>
          <el-form-item label="下外边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.marginBottom" /> px
          </el-form-item>
          <el-form-item label="上内边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.paddingTop" /> px
          </el-form-item>
          <el-form-item label="下内边距：">
            <el-input-number :min="0" :max="50" :precision="0" :step="1" v-model.number="item.paddingBottom" /> px
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
import ImgGroupUpload from '@/components/ImgGroupUpload'
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'

export default {
  components: { ImgGroupUpload, FoldWraper },
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
  created() {
    // 兼容单图模式下 item.value 为string
    if (typeof this.item.value === 'string') {
      this.item.value = this.item.value ? [this.item.value] : []
    }
  }
}
</script>
