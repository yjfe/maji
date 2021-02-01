<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-11 09:46:24
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
      type="password"
      :disabled="$attrs.isFormEdit && item.editDisabled"
      :placeholder="item.placeholder" 
      show-word-limit
      :maxlength="item.textMaxLength">
    </el-input>
    <span class="tip" v-if="item.remark" v-text="item.remark" />
  </el-form-item>
</template>
<script>
import md5 from 'js-md5'
import formMixin from '@/views/lego/utils/formMixin'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'InputPasswordPreview',
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
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
    this.$root.$on(`${this.item.id}Value${this.item.isDialog || ''}`, this.getValue)
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
    this.$root.$off(`${this.item.id}Value${this.item.isDialog || ''}`)
  },
  methods: {
    /**
     * @Date: 2020-06-22 11:19:26
     * @method: 密码的md加密在提交前
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */    
    getValue(cb) {
      let data
      const { value } = this.item
      if (this.isMd5(value) || !this.item.md5) {
        data = value
      } else {
        data = md5(value)
      }
      // 给外部触发回调赋值使用
      if (cb) cb(data)
      return data
    },
    /**
     * @Date: 2020-06-22 14:40:39
     * @method: 判断是不是md5, 16进制 32位
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    isMd5(value) {
      return /^[a-f0-9]{32}$/.test(value)
    }
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
