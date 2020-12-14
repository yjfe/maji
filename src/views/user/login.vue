<template>
  <div class="login">
    <el-form class="login-form" :model="form" ref="form" :rules="rules" label-width="80px" size="medium">
      <h1>登 录</h1>
      <el-form-item prop="userId" label="账 号：">
        <el-input v-model="form.userId" :maxlength="10" numberWord></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密 码：">
        <el-input type="password" v-model="form.password" :maxlength="10" numberWord></el-input>
      </el-form-item>
      <el-button class="login-submit" type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
      <el-button class="login-text" type="text" @click.native.prevent="$router.push('/register')">未有账号，前往注册</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from './service'

export default {
  name: 'login',
  data() {
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
          { required: true, message: '请输入账号', trigger: 'blur' },
          { 
            min: 6, 
            max: 20, 
            message: '长度在 6 到 20 个字符', 
            trigger: 'blur' 
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          login(this.form).then(async (res) => {
            try {
              await window.tcbApp.auth().customAuthProvider().signIn(res.data.ticket)
              const authHeader = await window.tcbApp.auth().getAuthHeader()
              sessionStorage.setItem('authHeader', JSON.stringify(authHeader))
              this.$message.success('登陆成功')
              this.$router.push('/config')
            } catch (error) {
              this.$message.error('登陆失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped  src="./index.less" />
