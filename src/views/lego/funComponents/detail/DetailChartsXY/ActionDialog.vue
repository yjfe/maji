<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-04-08 11:33:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog title="图表点击配置" :visible.sync="visible" width="500px" v-if="visible" :close-on-click-modal="false">
    <el-form label-width="90px" :model="itemData" ref="form">
      <el-form-item label="事件类型：">
        <el-select v-model="itemData.handleType">
          <el-option
            v-for="item in typeEnum"
            :key="item.id"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数" prop="query" v-if="itemData.handleType">
        <template slot="label">
          参数：
          <ButtonQueryTips />
        </template>
        <el-input type="textarea" 
          :autosize="{ minRows: 1, maxRows: 3}"
          v-model="itemData.query" />
      </el-form-item>
      <template v-if="itemData.handleType === 'link'">
        <el-form-item label="接口地址：" prop="url">
          <template slot="label">
            接口地址：
            <ButtonLinkTips />
          </template>
          <el-input type="textarea" v-model="itemData.url" placeholder="请输入接口地址" />
        </el-form-item>
        <el-form-item label="配置属性：" prop="exportType">
          <el-input v-if="itemData.handleType === 'text'" placeholder="请输入提示文本" v-model="itemData.message" />
          <el-select v-else-if="itemData.handleType === 'link'" v-model="itemData.openType">
            <el-option label="内部打开" :value="0"></el-option>
            <el-option label="外部打开" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </template>
      <template v-else-if="itemData.handleType === 'dialog'">
        <el-form-item label="弹出层ID：" prop="quotePageId">
          <el-input 
            placeholder="引用的弹出层ID"
            v-model="itemData.quotePageId" />
        </el-form-item>
        <el-form-item label="弹出层宽度：" prop="dialogWidth">
          <el-input-number 
            :controls="false"
            :min="0" 
            controls-position="right" 
            :max="1600" 
            :precision="0" 
            :step="1" 
            style="width: 100%"
            v-model="itemData.dialogWidth" placeholder="弹出层宽度" /> 
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" native-type="submit" @click.native.prevent="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ButtonLinkTips from '../../tips/ButtonLinkTips'
import ButtonQueryTips from '../../tips/ButtonQueryTips'

export default {
  name: 'FileUploadForm',
  components: { ButtonLinkTips, ButtonQueryTips },
  data() {
    return {
      visible: false,
      itemData: undefined,
      fileType: [],
      typeEnum: [
        {
          label: '无',
          value: ''
        },
        {
          label: '链接',
          value: 'link'
        },
        {
          label: '弹出层',
          value: 'dialog'
        }
      ]
    }
  },
  methods: {
    open(data) {
      this.itemData = data
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
