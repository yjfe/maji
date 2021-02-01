<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-04 15:42:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item 
    class="lego-priview-input"
     :prop="propKey"  
    :label="`${item.label}：`" 
    :rules="item.validator.rules">
    <Tinymce 
      :value="mValue"
      @input="mHandelInput" 
      :placeholder="item.placeholder" 
      :disabled="$attrs.isFormEdit && item.editDisabled"
      v-bind="upload"
    ></Tinymce>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import Tinymce from '@/components/Tinymce'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'EditorPreview',
  mixins: [formMixin],
  components: {
    Tinymce
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
  computed: {
    upload() {
      if (!this.item || !this.item.extend) {
        return {}
      }
      return {
        addImg: this.item.extend.indexOf('addImg') !== -1,
        addVideo: this.item.extend.indexOf('addVideo') !== -1
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
