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
    <el-form-item label="弹出层id：" prop="props.quotePageId" :rules="{ required: true, message: '请输入确认框id', trigger: 'blur' }">
      <el-input v-model="data.props.quotePageId" />
    </el-form-item>
    <el-form-item label="弹出层宽度：" prop="props.dialogWidth">
      <el-input-number 
        :controls="false"
        :min="0" 
        controls-position="right" 
        :max="1600" 
        :precision="0" 
        :step="1" 
        style="width: 100%"
        v-model="data.props.dialogWidth" 
        placeholder="弹出层宽度" /> 
    </el-form-item>
    <el-form-item label="确定后本页刷新" prop="props.closeRefresh">
      <el-switch v-model="data.props.closeRefresh" />
    </el-form-item>
  </div>
</template>
<script>
import ButtonQueryTips from '@/views/lego/funComponents/tips/ButtonQueryTips'

export default {
  name: 'DialogForm',
  components: {
    ButtonQueryTips
  },
  props: {
    data: Object
  }
}
</script>
