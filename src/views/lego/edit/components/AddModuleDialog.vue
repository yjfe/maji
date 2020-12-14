<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime : 2020-01-06 16:27:17
 * @LastEditors  : Please set LastEditors
 -->
<template>
  <el-dialog
    title="选择添加的组件"
    :visible.sync="dialogVisible"
    class="add-module-dialog"
    width="700px">
    <FunctionalZoneLayout 
      ref="FunctionalZoneLayout"
      :formItems="formItems"
      :layoutItems="layoutItems"
      :privateItems="privateItems"
      :detailItems="detailItems"
      :listItems="listItems"
      @select="handleClick"/>
  </el-dialog>
</template>
<script>
import manageJson from '@/views/lego/funComponents/manage.json'
import { cloneDeep } from '@/utils'
import FunctionalZoneLayout from './FunctionalZone/FunctionalZoneLayout'

export default {
  name: 'AddModuleDialog',
  components: {
    FunctionalZoneLayout
  },
  props: {
    fun: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      formItems: [],
      layoutItems: [],
      privateItems: [],
      detailItems: [],
      listItems: []
    }
  },
  methods: {
    open() {
      this.handleShow()
      this.dialogVisible = true
    },
    handleShow() {
      const data = cloneDeep(manageJson)
      this.formItems = data.formItems.filter(item => this.fun.indexOf(item) !== -1)
      this.layoutItems = data.layoutItems.filter(item => this.fun.indexOf(item) !== -1)
      this.privateItems = data.privateItems.filter(item => this.fun.indexOf(item) !== -1)
      this.detailItems = data.detailItems.filter(item => this.fun.indexOf(item) !== -1)
      this.listItems = data.listItems.filter(item => this.fun.indexOf(item) !== -1)
    },
    /**
     * @description: 点击功能组件 新增
     * @param {type} 
     * @return: 
     */
    handleClick(data) {
      this.dialogVisible = false
      this.$emit('select', data)
    }
  }
}
</script>
<style lang="less">
.add-module-dialog{
  .fixedFloor{
    li{
      width: 90px;
      .middle{
        width: 89px;
        p{
          width: 89px;
        }
      }
    }
  }
}
</style>
