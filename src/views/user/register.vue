<template>
  <div class="login">
    <el-form class="login-form" :model="form" ref="form" :rules="rules" label-width="80px" size="medium">
      <h1>注 册</h1>
      <el-form-item prop="userId" label="账 号：">
        <el-input v-model="form.userId" :maxlength="20" numberWord></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密 码：">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" label="重复密码：">
        <el-input type="password" v-model="form.checkPassword"></el-input>
      </el-form-item>
      <el-button class="login-submit" size="medium" type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
      <el-button class="login-text" type="text" @click.native.prevent="$router.push('/login')">已有账号，前往登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { register } from './service'

export default {
  name: 'register',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.form.checkPassword) {
        this.$refs.form.validateField('checkPassword')
      }
      callback()
    }
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        userId: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { 
            min: 6, 
            max: 20, 
            message: '长度在 6 到 20 个字符', 
            trigger: 'blur' 
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { 
            min: 6, 
            max: 20, 
            message: '长度在 6 到 20 个字符', 
            trigger: 'blur' 
          },
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          register(this.form, { successMsg: '注册成功' }).then(() => {
            this.$router.push('/login')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped  src="./index.less" />
