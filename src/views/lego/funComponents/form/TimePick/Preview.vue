<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-24 10:15:36
 * @LastEditTime: 2020-12-02 16:43:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <el-time-picker
      v-if="item.isRange"
      :value="mValue"
      @input="mHandelInput" 
      is-range
      :readonly="$store.getters['manage/isEdit']"
      :disabled="$attrs.isFormEdit && item.editDisabled" 
      :picker-options="{
        selectableRange: item.selectableRange
      }"
      :value-format="item.valueFormat"
      :format="item.valueFormat"
      range-separator="-"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围">
    </el-time-picker>
    <el-time-picker
      v-else
      :value="mValue"
      @input="mHandelInput" 
      :readonly="$store.getters['manage/isEdit']"
      :disabled="$attrs.isFormEdit && item.editDisabled" 
      :picker-options="{
        selectableRange: item.selectableRange
      }"
      :value-format="item.valueFormat"
      :format="item.valueFormat"
      placeholder="选择时间">
    </el-time-picker>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'TimePickPreview',
  mixins: [formMixin],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
