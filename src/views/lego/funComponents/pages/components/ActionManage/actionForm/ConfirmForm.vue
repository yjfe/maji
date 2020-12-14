<template>
  <div>
    <el-form-item label="参数：" prop="props.query">
      <template slot="label">
        参数：
        <ButtonQueryTips />
      </template>
      <el-input type="textarea" 
        :autosize="{ minRows: 1, maxRows: 3}"
        v-model="data.props.query" />
    </el-form-item>
    <el-form-item label="确认框文案：" prop="props.confirmMsg" :rules="{ required: true, message: '请输入确认框文案', trigger: 'blur' }">
      <el-input v-model="data.props.confirmMsg" />
    </el-form-item>
    <el-form-item label="请求接口地址：" prop="props.confirmApi" :rules="{ required: true, message: '请输入请求接口地址', trigger: 'blur' }">
      <template slot="label">
       请求接口地址：
        <ApiTips />
      </template>
      <el-input type="textarea" v-model="data.props.confirmApi" placeholder="确认框点击确定后执行接口"/>
    </el-form-item>
    <el-form-item label="完成后跳转地址：" prop="props.successGo">
      <template slot="label">
        完成后跳转地址：
        <HrefTips />
      </template>
      <el-input type="textarea" v-model="data.props.successGo" placeholder="提交完成跳转地址，默认刷新本页" />
    </el-form-item>
  </div>
</template>
<script>
import ButtonQueryTips from '@/views/lego/funComponents/tips/ButtonQueryTips'
import HrefTips from '@/views/lego/funComponents/tips/HrefTips'
import ApiTips from '@/views/lego/funComponents/tips/ApiTips'

export default {
  name: 'ConfirmForm',
  components: {
    ButtonQueryTips,
    ApiTips,
    HrefTips
  },
  props: {
    data: Object
  }
}
</script>
