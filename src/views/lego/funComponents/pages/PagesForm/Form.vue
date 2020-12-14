<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-07 15:34:49
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
        <FoldWraper label="按钮配置" :level="1">
          <el-form-item label="功能按钮：">
            <!-- <el-checkbox-group v-model="item.action" class="fun-checkbox">
              <el-checkbox label="submit" >提交</el-checkbox>
              <el-checkbox label="back" >返回</el-checkbox>
            </el-checkbox-group> -->
            <ActionManage ref="ActionManage" 
              :data="item"
              :pageActionEnum="['link', 'back', 'submit']" />
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="权限值：" prop="auth">
            <el-input v-model="item.authValue" />
          </el-form-item>
          <el-form-item label="详情接口地址：" prop="detailApiUrl">
            <template slot="label">
              详情接口地址：
              <ApiTips />
            </template>
            <el-input type="textarea" v-model="item.detailApiUrl" placeholder="编辑页面获取表单详情接口"/>
          </el-form-item>
          <ApiConfigDialog :envApi.sync="item.envApi" />
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend','componentBeforeSubmit', 'componentWillDestroy']"></CodePointEvent>
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
  }
}
</script>
<style lang="less" scoped>
</style>
