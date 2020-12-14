<template>
  <el-form-item label="触发事件：">
    <el-button type="primary" @click="handleOpen" size="mini">配置事件</el-button>
    <el-dialog
      title="配置事件规则"
      :visible.sync="dialogVisible"
      width="600px">
      <el-form label-width="100px" ref="form" :model="formData" >
        <el-form-item label="触发事件：" prop="type">
          <el-radio-group v-model="formData.type" >
            <el-radio-button label="">无</el-radio-button>
            <el-radio-button label="change">change</el-radio-button>
            <!-- <el-radio-button label="blur">blur</el-radio-button> -->
          </el-radio-group>
        </el-form-item>
        <template v-if="formData.type">
          <el-form-item label="接口地址：" prop="apiUrl" :rules="{ required: true, message: '请输入接口地址', trigger: 'blur' }">
            <template slot="label">
              接口地址：
              <ApiTips />
            </template>
            <el-input v-model="formData.apiUrl"></el-input>
          </el-form-item>
          <el-form-item label="请求字段名：" prop="key" :rules="[{ required: true, message: '请输入请求字段名', trigger: 'blur'}, validator.rule.keyCode]">
            <el-input v-model="formData.key"></el-input>
            参数提交接口的key
          </el-form-item>
          <el-form-item label="绑定字段：" prop="bindKey" :rules="{ required: true, message: '请输入绑定字段', trigger: 'blur' }">
            <template slot="label">
              绑定字段：
              <ButtonQueryTips />
            </template>
            <el-input v-model="formData.bindKey"></el-input>
            根据接口返回字段选择需要的绑定提交使用
          </el-form-item>
          <el-form-item label="反显文案：" prop="formatText" :rules="{ required: true, message: '请输入反显文案', trigger: 'blur' }">
            <template slot="label">
              反显文案：
              <TableFormatValueTips />
            </template>
            <el-input v-model="formData.formatText"></el-input>
            校验成功后的显示文案
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-form-item>
</template>
<script>
import validator from '@/utils/validator'
import ApiTips from '@/views/lego/funComponents/tips/ApiTips'
import TableFormatValueTips from '@/views/lego/funComponents/tips/TableFormatValueTips'
import ButtonQueryTips from '@/views/lego/funComponents/tips/ButtonQueryTips'

export default {
  name: 'EventSetting',
  components: { ApiTips, TableFormatValueTips, ButtonQueryTips },
  props: {
    value: {
      type: Object,
      default: undefined
    },
    rules: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      validator,
      formData: {}
    }
  },
  methods: {
    handleOpen() {
      this.formData = this.value ? { ...this.value } : { type: '' }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('input', this.formData)
          // Object.assign(this.value, this.formData)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>
