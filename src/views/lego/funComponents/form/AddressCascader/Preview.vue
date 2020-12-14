<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-02 16:33:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <AddressCascader 
      :value="mValue"
      @input="mHandelInput" 
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :grade="!item.world?item.grade:1" 
      :world="item.world"></AddressCascader>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import AddressCascader from '@/components/AddressCascader'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'AddressCascaderPrevies',
  mixins: [formMixin],
  components: {
    AddressCascader
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
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
