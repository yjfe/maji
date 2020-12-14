<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-09 10:51:15
 * @LastEditors: Please set LastEditors
 -->
<template>
   <el-row class="layout-row">
     <el-col v-for="(col, index) in item.layout" :key="index" :span="col.col" >
      <FreeComponentsId v-if="col.module.length > 13" 
        :moduleId="col.module" 
        :key="col.module" 
        :pageData="pageData"
        :parentData="parentData"
        v-bind="$attrs" 
        v-on="$listeners"/>
      <div class="default-text" v-else>{{isEdit?'请选择组件':'&nbsp;'}}</div>
     </el-col>
   </el-row>
</template>
<script>
import { mapState } from 'vuex'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'PreviewRow',
  components: {
    FreeComponentsId
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    parentData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit,
      idModule: state => state.manage.idModule
    })
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)({}, this.item, this.$store.getters['manage/idModule'])
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  }
  // watch: {
  //   idModule(val) {
  //     console.log(1111, val)
  //   }
  // }
}
</script>
<style lang="less">
.layout-row{
  .el-form-item{
    .el-form-item__content{
      padding-right: 10px;
      & > .el-input,
      & > .el-input-number,
      & > .el-select,
      & > .el-textarea,
      & .el-cascader,
      & > .el-range-editor{
        width: 100% !important;
      }
    } 
  }
}
.fun-title{
  margin: 10px 0;
  .desc{
    margin-left: 10px;
  }
}
</style>
