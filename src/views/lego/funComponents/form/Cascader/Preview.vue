<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 18:25:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form-item  :prop="propKey" :label="`${item.label}：`" :rules="item.validator.rules">
    <el-cascader 
      value="mValue"
      @input="mHandelInput" 
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :props="cascaderProps"></el-cascader>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import formMixin from '@/views/lego/utils/formMixin'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'CascaderPreview',
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
  data() {
    return {
    }
  },
  computed: {
    cascaderProps() {
      return {
        lazy: true,
        checkStrictly: this.item.checkStrictly, // 任意节点
        multiple: this.item.multiple, // 多选单选
        emitPath: this.item.emitPath, // 节点的值
        lazyLoad: async (node, resolve) => {
          const { level, value } = node
          const data = await this.getChildren(value, level)
          resolve(data)
        }
      }
    }
  },
  methods: {
    async getChildren(code) {
      return new Promise((resolve, reject) => {
        // 解析url
        const { 
          url, 
          type, 
          requestQuery, 
          option 
        } = apiResolver(this.item.apiUrl)
        if (!url) return
        const httpParams = {
          ...requestQuery,
          [this.item.codeKey]: code
        }
        // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
        useCodeEvent(this.item, 'componentBeforeSend', this)(httpParams, this.item, this.$store.getters['manage/idModule'])
        // 执行接口
        httpAgent[type](url, httpParams, { noAuth: true, preview302: true, ...option }).then((res) => {
          // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
          useCodeEvent(this.item, 'componentAfterSend', this)(res.data, this.item, this.$store.getters['manage/idModule'])
          // 处理字段数据结构
          const data = res.data.map(item => (
            {
              label: item[this.item.labelKey],
              value: item[this.item.valueKey]
            }
          ))
          resolve(data)
        }).catch((error) => {
          this.item.options = []
          reject(error)
        })
      })
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
