<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-03-27 10:38:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="其他配置" :visible.sync="visible" width="500px" v-if="visible" :close-on-click-modal="false">
    <el-form label-width="90px" :model="item" ref="form">
      <el-form-item label="固定列：" prop="fixed">
        <el-radio-group v-model="item.fixed" size="mini">
          <el-radio-button :label="false">关闭</el-radio-button>
          <el-radio-button label="left">左固定</el-radio-button>
          <el-radio-button label="right">右固定</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表头提示文本：" prop="thTips">
        <el-input v-model="item.thTips" type="textarea" />
      </el-form-item>
      <el-form-item label="溢出隐藏：" prop="overflowTooltip">
        <el-switch v-model="item.overflowTooltip" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'FileUploadForm',
  data() {
    return {
      visible: false,
      item: undefined
    }
  },
  methods: {
    open(data = {}) {
      this.item = data
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false
        }
      })
    }
  }
}
</script>
