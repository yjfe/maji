<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-18 16:48:45
 * @LastEditTime: 2019-07-10 14:21:13
 * @LastEditors: yamanashi12
 -->
<template>
  <el-dialog title="新增/编辑" :visible.sync="visible" v-if="visible">
    <el-form :model="form" ref="form" label-width="120px">
      <el-form-item prop="projectName" label="项目名称：" :rules="{ required: true, message: '请输入项目名称', trigger: 'blur' }">
        <el-input v-model="form.projectName" :maxlength="10" numberWord></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态：">
        <el-radio-group v-model="form.status" :rules="{ required: true, message: '请输入选择状态', trigger: 'blur' }">
          <el-radio :label="1">有效</el-radio>
          <el-radio :label="0">无效</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import * as api from './service'

export default {
  name: 'FormDialog',
  data() {
    return {
      visible: false,
      form: {} // 表单数据
    }
  },
  methods: {
    open(item) {
      this.form = { status: 1, ...item }
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const http = this.form.id ? this.update(this.form) : this.save(this.form)
          http.then(() => {
            this.visible = false
            this.$emit('fetch')
          })
        }
      })
    },
    save(data) {
      return api.save(data, { successMsg: '新增成功' })
    },
    update(data) {
      return api.update(data, { successMsg: '编辑成功' })
    }
  }
}
</script>
