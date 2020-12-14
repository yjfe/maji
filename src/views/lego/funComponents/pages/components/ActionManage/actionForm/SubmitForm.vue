<template>
  <div>
    <el-form-item label="新增接口地址：" prop="props.saveApiUrl" :rules="{ required: true, message: '请输入新增接口地址', trigger: 'blur' }">
      <template slot="label">
        新增接口地址：
        <ApiTips />
      </template>
      <el-input type="textarea" v-model="data.props.saveApiUrl" placeholder="页面提交编辑接口"/>
    </el-form-item>
    <el-form-item label="新增成功提示文案：" prop="props.saveSuccessMsg">
      <el-input v-model="data.props.saveSuccessMsg" placeholder="提交成功"/>
      <span class="tip">“none”不提示</span>
    </el-form-item>
    <el-form-item label="更新接口地址：" prop="props.updateApiUrl" :rules="{ required: true, message: '请输入更新接口地址', trigger: 'blur' }">
      <template slot="label">
        更新接口地址：
        <ApiTips />
      </template>
      <el-input type="textarea" v-model="data.props.updateApiUrl" placeholder="编辑页面提交编辑接口"/>
    </el-form-item>
    <el-form-item label="更新成功提示文案：" prop="props.updateSuccessMsg">
      <el-input v-model="data.props.updateSuccessMsg" placeholder="编辑成功"/>
      <span class="tip">“none”不提示</span>
    </el-form-item>
    <el-form-item label="完成后跳转地址：" prop="props.successGo">
      <template slot="label">
        完成后跳转地址：
        <HrefTips />
      </template>
      <el-input type="textarea" v-model="data.props.successGo" placeholder="提交完成跳转地址，默认返回上一级" />
    </el-form-item>
    <el-form-item label="二次确认框：" prop="props.confirm">
      <el-switch v-model="data.props.confirm" />
      <span class="tip">提交前的二次确认提示框</span>
    </el-form-item>
    <el-form-item label="二次确认框文案：" prop="props.confirmMsg" v-if="data.props.confirm">
      <el-input v-model="data.props.confirmMsg" />
    </el-form-item>
  </div>
</template>
<script>
import ApiTips from '@/views/lego/funComponents/tips/ApiTips'
import HrefTips from '@/views/lego/funComponents/tips/HrefTips'

export default {
  name: 'SubmitForm',
  components: {
    ApiTips,
    HrefTips
  },
  props: {
    data: Object
  }
}
</script>
