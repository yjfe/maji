<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-11-04 16:42:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="编辑导入按钮配置" :visible.sync="visible" width="500px" v-if="visible" :close-on-click-modal="false">
    <el-form label-width="90px" :model="item" ref="form">
      <el-form-item label="接口地址：">
        <template slot="label">
          接口地址：
          <ApiTips />
        </template>
        <el-input type="textarea" v-model="item.url" placeholder="请输入接口地址" />
      </el-form-item>
      <el-form-item label="接收参数名：" prop="apiName">
        <el-input v-model="item.apiName" />
      </el-form-item>
      <el-form-item label="限制大小：" prop="size">
        <el-input-number :min="0" :controls="false" :precision="0" :step="1" v-model.number="item.size" /> MB
      </el-form-item>
      <el-form-item label="导入方式：" prop="exportType">
        <el-radio-group v-model="item.exportType">
          <el-radio-button :label="0">直接导入</el-radio-button>
          <el-radio-button :label="1">外部导入</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="支持格式：" prop="fileType">
        <el-checkbox-group v-model="fileType" @change="handleFileType">
          <el-checkbox v-for="(option, index) in fileTypeEnum" :key="index" :label="option"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ApiTips from '../../tips/ApiTips'

export default {
  name: 'FileUploadForm',
  components: { ApiTips },
  data() {
    return {
      visible: false,
      fileTypeEnum: ['.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pdf', '.zip', '.rar', '.apk'],
      item: undefined,
      fileType: []
    }
  },
  methods: {
    open(data) {
      try {
        this.fileType = data.fileType.split(',') || []
      } catch (error) {
        this.fileType = []
      }
      this.item = data
      this.visible = true
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.visible = false
        }
      })
    },
    handleFileType(data) {
      this.item.fileType = data.join(',')
    }
  }
}
</script>
