<template>
  <div>
    <el-form-item label="跳转地址：" prop="props.linkUrl" :rules="{ required: true, message: '请输入跳转地址', trigger: 'blur' }">
      <template slot="label">
        跳转地址：
        <HrefTips />
      </template>
      <el-input type="textarea" v-model="data.props.linkUrl" placeholder="提交完成跳转地址，默认返回上一级" />
    </el-form-item>
    <el-form-item label="跳转方式：" prop="props.linkUrl">
      <el-select placeholder="跳转方式" v-model="data.props.openType">
        <el-option label="内部打开" :value="0"></el-option>
        <el-option label="外部打开" :value="1"></el-option>
        <el-option label="新页面" :value="2"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import HrefTips from '@/views/lego/funComponents/tips/HrefTips'

export default {
  name: 'LinkForm',
  components: {
    HrefTips
  },
  props: {
    data: Object
  }
}
</script>
