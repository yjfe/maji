<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-10 14:42:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <el-select 
      :value="mValue"
      @input="mHandelInput" 
      :placeholder="item.placeholder" 
      :disabled="disabled || ($attrs.isFormEdit && item.editDisabled)" 
      :multiple="item.multiple" 
      :collapse-tags="item.multiple" 
      :filterable="item.filterable"
      @change="handleChange">
      <el-option v-for="(option, index) in options" :key="index" :label="option.label" :value="option.value"></el-option>
    </el-select>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import mixinOptionsEnum from '../Checkbox/mixinOptionsEnum'

export default {
  name: 'SelectPreview',
  mixins: [formMixin, mixinOptionsEnum],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
