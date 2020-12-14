<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-02 16:44:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules">
    <VideoUpload v-model="item.value" isTip
      :size="item.size * 1024"
      :formatList="item.formatList"
      :accept="item.accept"
      :with-credentials="true"
      :disabled="$attrs.isFormEdit && item.editDisabled" 
    />
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
// TODO: parentData 还没做完
import VideoUpload from '@/components/VideoUpload'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'VideoUploadPreview',
  components: { VideoUpload },
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
