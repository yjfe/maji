<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-02 16:40:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <component :is="this.item.uploadComponent || 'ImgUpload'" 
      :value="mValue"
      @input="mHandelInput" 
      isTip
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :data="sizeData"
      :size="item.size * 1024"
      :formatList="item.formatList"
      :accept="item.accept"
      :with-credentials="true" />
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import ImgGroupUpload from '@/components/ImgGroupUpload'
import ImgUpload from '@/components/ImgUpload'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'ImgUploadPreview',
  mixins: [formMixin],
  components: { ImgUpload, ImgGroupUpload },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sizeData() {
      const data = {
        height: this.item.height, 
        width: this.item.width, 
        maxHeight: this.item.maxHeight, 
        maxWidth: this.item.maxWidth
      }
      Object.keys(data).forEach((item) => {
        if (!data[item]) {
          delete data[item]
        }
      })
      return data
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
