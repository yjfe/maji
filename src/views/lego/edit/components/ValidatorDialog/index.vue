<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-26 15:19:20
 * @LastEditors: Please set LastEditors
 -->
<template>
<FoldWraper label="校验规则" :level="2">
  <el-form-item label="规则：">
    <el-button type="primary" @click="dialogVisible = true" size="mini">配置规则</el-button>
  </el-form-item>
  <el-dialog
    title="配置校验规则"
    :visible.sync="dialogVisible"
    width="600px">
    <p>请勾选需要的校验规则，如有配置项，必须填写</p>
    <p>注：选中的规则必须同时满足才可通过校验，请规避互斥规则</p>
    <div class="validator-dialog">
      <li v-if="rules.indexOf('required') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="required">必填</el-checkbox>
        <el-input class="input-message" v-model="options.message.required" placeholder="请输入错误提示信息" />
      </li>
      <li v-if="rules.indexOf('maxLength') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="maxLength">最大长度</el-checkbox>
        <el-input-number 
          class="input-number" 
          size="mini" 
          :min="0" 
          controls-position="right" 
          :max="9999" 
          :precision="0" 
          :step="1" 
          v-model="options.params.maxLength" placeholder="请输入最大长度" /> 
      </li>
      <li v-if="rules.indexOf('minLength') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="minLength">最小长度</el-checkbox>
        <el-input-number 
          class="input-number" 
          size="mini" 
          controls-position="right" 
          :min="0" 
          :max="9999" 
          :precision="0" 
          :step="1" 
          v-model="options.params.minLength" 
          placeholder="请输入最小长度" /> 
      </li>
      <li v-if="rules.indexOf('phoneNumber') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="phoneNumber">电话号码</el-checkbox>
        <el-radio v-model="options.params.phoneNumber" label="mobile">手机</el-radio>
        <el-radio v-model="options.params.phoneNumber" label="tel">座机</el-radio>
        <el-radio v-model="options.params.phoneNumber" label="all">全部</el-radio>
      </li>
      <li v-if="rules.indexOf('email') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="email">邮箱地址</el-checkbox>
      </li>
      <li v-if="rules.indexOf('ip') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="ip">ip地址</el-checkbox>
      </li>
      <li v-if="rules.indexOf('web') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="web">网页地址</el-checkbox>
        <el-radio v-model="options.params.web" label="https">https</el-radio>
        <el-radio v-model="options.params.web" label="http">http</el-radio>
        <el-radio v-model="options.params.web" label="all">全部</el-radio>
      </li>
      <li v-if="rules.indexOf('password') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="password">密码校验</el-checkbox>
        <el-radio v-model="options.params.password" label="number">数字</el-radio>
        <el-radio v-model="options.params.password" label="numbera">数字英文</el-radio>
        <el-radio v-model="options.params.password" label="numberAa">数字英文大小写</el-radio>
      </li>
      <li v-if="rules.indexOf('characters') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="characters">特殊字符和空格</el-checkbox>
      </li>
      <li v-if="rules.indexOf('apiCheck') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="apiCheck">接口校验</el-checkbox>
        <el-input class="input-message" v-model="options.params.apiCheck" placeholder="请输入接口地址" />
        <el-input class="input-message" v-model="options.params.apiCheckKey" placeholder="请输入参数名" />
      </li>
      <li v-if="rules.indexOf('regex') !== -1">
        <el-checkbox class="li-label" v-model="options.checked" label="regex">正则表达式</el-checkbox>
        <el-input class="input-message" v-model="options.params.regex" placeholder="请输入正则表达式" />
        <el-input class="input-message" v-model="options.message.regex" placeholder="请输入错误提示信息" />
      </li>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</FoldWraper>
</template>
<script>
import validator from '@/utils/validator'
import FoldWraper from '@/views/lego/components/FoldWraper'

export default {
  name: 'ValidatorDialog',
  components: { FoldWraper },
  props: {
    options: {
      type: Object,
      default() {
        return {
          message: {},
          params: {},
          checked: [],
          rules: []
        }
      }
    },
    /* 
      校验配置器，共支持的
      required, 必填
      maxLength, 最大
      minLength, 最小
      phoneNumber, 电话号码
      email, 邮箱
      ip, ip地址
      web, 网址
      characters, 特殊符号和空格
      apiCheck 接口校验
    */
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
      validator
    }
  },
  methods: {
    handleSubmit() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less">
.validator-dialog{
  li{
    list-style: none;
    margin-bottom: 10px
  }
  .li-label{
    width: 160px
  }
  .input-message{
    width: 150px;
    margin-right: 10px;
  }
  .input-number{
    width: 80px
  }
}
</style>
