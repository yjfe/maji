<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-10 14:42:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <el-checkbox-group 
      :value="mValue"
      @input="mHandelInput"  
      class="fun-checkbox" 
      :disabled="readonly || ($attrs.isFormEdit && item.editDisabled)"
      @change="handleChange" >
      <el-checkbox v-for="(option, index) in options" :key="index" :label="option.value">{{option.label}}</el-checkbox>
    </el-checkbox-group>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import mixinOptionsEnum from './mixinOptionsEnum'

export default {
  name: 'CheckboxPrevie',
  mixins: [formMixin, mixinOptionsEnum],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
