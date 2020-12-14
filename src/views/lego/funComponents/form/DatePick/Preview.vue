<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-24 10:15:36
 * @LastEditTime: 2020-12-04 14:50:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <el-date-picker
      :value="mValue"
      @input="mHandelInput" 
      :readonly="$store.getters['manage/isEdit']"
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :type="type"
      :value-format="typeEnum[item.valueFormat].valueFormat"
      :format="item.valueFormat"
      :pickerOptions="pickerOptions"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      placeholder="选择日期">
    </el-date-picker>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import { useCodeEvent } from '@/views/lego/utils'
import baseData from './data'
import mixinQuickSelect from './mixinQuickSelect'

export default {
  name: 'DatePickPreview',
  mixins: [formMixin, mixinQuickSelect],
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
  computed: {
    type() {
      const typeInfo = this.typeEnum[this.item.valueFormat]
      return this.item.isRange ? typeInfo.rangeType : typeInfo.type
    }
  },
  data() {
    return {
      typeEnum: baseData.typeEnum
    }
  },
  mounted() {
    this.initQuickSelect()
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
