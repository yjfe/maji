<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-04 16:27:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item 
    class="lego-priview-input"
    :prop="propKey" 
    :label="`${item.label}：`" 
    :rules="item.validator.rules">
    <el-input 
      :value="mValue"
      @input="mHandelInput" 
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :placeholder="item.placeholder" 
      v-eventSetting="{ setting: item.eventSetting, vueNode: this }" 
      show-word-limit
      :maxlength="item.textMaxLength">
      <template v-if="item.prepend" slot="prepend">{{item.prepend}}</template>
      <template v-if="item.suffix" slot="append">{{item.suffix}}</template>
    </el-input>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import directive from '@/views/lego/components/EventSetting/directive'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'InputPreview',
  mixins: [formMixin],
  directives: {
    ...directive
  },
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
<style lang="less">
  .lego-priview-input{
    .el-input-group__append{
      // 穿透el-input修改样式
      // line-height 设置了数值，因此可能需要到时修改
      background-color: #F5F7FA;
      text-align: center;
      min-width: 35px;
      line-height: 30px;
      box-sizing: border-box;
      color: #909399;
      padding: 0 6px;
      border: 1px solid #DCDFE6;
    } 
  }
</style>
