<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-09 17:10:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="其他配置" :visible.sync="visible" width="500px" v-if="visible" :close-on-click-modal="false">
    <el-form label-width="120px" :model="data" ref="form">
      <el-form-item label="按钮名称：" prop="label" :rules="{ required: true, message: '请输入按钮名称', trigger: 'blur' }">
        <el-input v-model="data.label" />
      </el-form-item>
      <el-form-item label="事件类型：" prop="type" :rules="{ required: true, message: '请选择事件类型：', trigger: 'blur' }">
        <el-select v-model="data.type">
          <el-option
            v-for="item in pageTypeEnum"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按钮颜色：" prop="label">
        <el-select v-model="data.styles.color">
          <el-option
            v-for="item in colorEnum"
            :key="item.id"
            :label="item"
            :value="item">
            <span class="lego-button-color-select" :class="item"></span>
            <span>{{ item }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 提交事件的处理 -->
      <component v-if="actionForm" :is="actionForm" :data="data"/>
      <el-form-item label="权限值：" prop="props.auth">
        <el-input v-model="data.props.auth" />
      </el-form-item>
      <el-form-item label="状态控制：" prop="props.stateRule">
        <template slot="label">
          状态控制：
          <TableStatusTips />
        </template>
        <el-input v-model="data.props.stateRule" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TableStatusTips from '@/views/lego/funComponents/tips/TableStatusTips'
import baseData from './data'
import SubmitForm from './actionForm/SubmitForm'
import LinkForm from './actionForm/LinkForm'
import ConfirmForm from './actionForm/ConfirmForm'
import DialogForm from './actionForm/DialogForm'

export default {
  name: 'EditDialog',
  components: {
    SubmitForm,
    LinkForm,
    ConfirmForm,
    TableStatusTips,
    DialogForm
  },
  data() {
    return {
      visible: false,
      cacheData: null,
      data: undefined,
      typeEnum: baseData.typeEnum,
      colorEnum: baseData.colorEnum,
      componentName: {
        submit: 'SubmitForm',
        back: '',
        link: 'LinkForm',
        export: 'ExportForm',
        confirm: 'ConfirmForm',
        dialog: 'DialogForm'
      },
      pageTypeEnum: [] // 过滤页面类型
    }
  },
  computed: {
    actionForm() {
      return this.componentName[this.data.type] || ''
    }
  },
  methods: {
    open(data = {}, pageActionEnum) {
      this.cacheData = data
      this.data = JSON.parse(JSON.stringify(data))
      this.pageTypeEnum = this.typeEnum.filter(item => pageActionEnum.indexOf(item.value) > -1)
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          Object.assign(this.cacheData, this.data)
          this.visible = false
        }
      })
    }
  }
}
</script>
