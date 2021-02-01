<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-25 14:32:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="120px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs :hasAdvanced="false">
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="页面标题：" prop="title">
            <el-input v-model="item.title" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="样式配置" :level="1">
          <el-form-item label="表单标题宽度：" prop="styles.labelWidth">
            <el-input v-model.number="item.styles.labelWidth" placeholder="请输入表单标题宽度" /> px
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="功能按钮：">
            <ActionManage ref="ActionManage" :data="item" />
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="页面权限：">
            <el-input v-model="item.authValue" />
          </el-form-item>
          <el-form-item label="接口地址：" prop="apiUrl">
            <template slot="label">
              接口地址：
              <ApiTips />
            </template>
            <el-input type="textarea" v-model="item.apiUrl" placeholder="请输入接口地址" />
          </el-form-item>
          <ApiConfigDialog :envApi.sync="item.envApi" />
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'
import ApiTips from '../../tips/ApiTips'
import ApiConfigDialog from '../components/ApiConfigDialog'
import ActionManage from '../components/ActionManage'

export default {
  components: {
    ApiTips,
    ApiConfigDialog,
    FoldWraper,
    ActionManage
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rules: baseData.rules
    }
  },
  created() {
    // 处理旧数据的兼容， 增加action字段
    this.$set(this.item, 'action', this.item.action || [])
  },
  methods: {
    handleAdd() {
      this.item.options.push({ ...{ label: '', value: '' } })
    },
    handleRemove(index) {
      const valueClone = [...this.item.options]
      valueClone.splice(index, 1)
      this.item.options = valueClone
    }
  }
}
</script>
<style lang="less" scoped>

</style>
