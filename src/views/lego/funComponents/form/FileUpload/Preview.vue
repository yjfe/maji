<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 15:45:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey"  :label="`${item.label}：`" :rules="item.validator.rules" :with-credentials="true">
    <FileUpload
      v-if="loadend"
      :action="action"
      :name="item.apiName"
      :show-file-list="maxNum > 1"
      :multiple="maxNum > 1"
      :limit="maxNum"
      :file-list.sync="item.value"
      :fileAccept="fileAccept"
      @success="handleSuccess"
      @change="handleChange"
      :maxfileSize="item.size">
        <el-button :disabled="$attrs.isFormEdit && item.editDisabled">导入文件</el-button>
    </FileUpload>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
// TODO: fileUpload 还没做完
import formMixin from '@/views/lego/utils/formMixin'
import FileUpload from '@/components/FileUpload'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'FileUploadPreview',
  components: { FileUpload },
  mixins: [formMixin],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loadend: false
    }
  },
  computed: {
    action() {
      try {
        const { url } = apiResolver(this.item.apiUrl)
        return url || ''
      } catch (error) {
        return ''
      }
    },
    fileAccept() {
      return this.item.fileType.map(item => `.${item}`).join(',')
    },
    maxNum() {
      return this.item.maxNum || 1
    }
  },
  mounted() {
    if (this.item.value === '' || (Array.isArray(this.item.value) && this.item.value.length === 0)) {
      this.item.value = this.maxNum > 1 ? [] : ''
    }
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
    this.loadend = true
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  methods: {
    handleSuccess(res) {
      console.log('s', res, this.item.value)
    },
    
    handleChange(res) {
      console.log('c', res, this.item.value)
    }
  }
}
</script>
