<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-07 15:42:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="名称：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
          <el-form-item label="提示文本：" prop="placeholder">
            <el-input v-model="item.placeholder" />
          </el-form-item>
          <el-form-item label="默认值：" prop="value">
            <el-input v-model="item.value" />
          </el-form-item>
          <el-form-item label="提示备注：" prop="remark">
            <el-input v-model="item.remark" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="后置/单位：" prop="">
            <el-input v-model="item.suffix" maxlength="4" placeholder="为空不显示" show-word-limit/>
          </el-form-item>
          <el-form-item label="前置/提示：" prop="">
            <el-input v-model="item.prepend" maxlength="4" placeholder="为空不显示" show-word-limit/>
          </el-form-item>
        </FoldWraper>
        <!-- 触发事件 -->
        <EventSetting v-model="item.eventSetting" />
        <ValidatorDialog 
          :options="item.validator" 
          :rules="['required', 'maxLength', 'minLength', 'phoneNumber', 'email', 'web', 'characters', 'apiCheck', 'regex']"/>
        <slot />
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model.trim="item.key" />
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy', 'inputChange']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import ValidatorDialog from '@/views/lego/edit/components/ValidatorDialog'
import EventSetting from '@/views/lego/components/EventSetting'
import baseData from './data'

export default {
  name: 'InputForm',
  components: { ValidatorDialog, EventSetting, FoldWraper },
  data() {
    return {
      rules: baseData.rules
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
