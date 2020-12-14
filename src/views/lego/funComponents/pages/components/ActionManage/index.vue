<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2020-04-22 14:26:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-button @click="handleAdd">新增按钮</el-button>
    <div v-for="(dataItem, index) in data.action" :key="index" class="pages-form-button"
      draggable="true" 
      @dragover="moveEnd = index" 
      @dragend="handleDragEnd"
      @dragstart="moveStart = index">
      <el-input v-model="dataItem.label" placeholder="按钮名称" />
      <span class="action-name">事件：{{dataItem.type | typeEnum}}</span>
      <el-button type="text" @click="handleEdit(dataItem)">编辑</el-button>
      <el-button type="text" @click="handleRemove(index, dataItem)">删除</el-button>
    </div>
    <EditDialog ref="EditDialog" />
  </div>
</template>
<script>
import baseData from './data'
import EditDialog from './EditDialog'

export default {
  name: 'EditActionDialog',
  components: {
    EditDialog
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    pageActionEnum: {
      type: Array,
      default: () => (['back', 'link', 'confirm', 'dialog'])
    }
  },
  data() {
    return {
      moveEnd: null,
      moveStart: null
    }
  },
  filters: {
    typeEnum(value) {
      const data = baseData.typeEnum.find(item => item.value === value)
      if (data) {
        return data.label
      }
      return value
    }
  },
  methods: {
    handleEdit(data) {
      this.$refs.EditDialog.open(data, this.pageActionEnum)
    },
    handleAdd() {
      const len = this.data.action.length + 1 || 1
      this.data.action.push({ 
        ...{ 
          label: `按钮${len}`,
          type: 'back', 
          styles: {
            color: 'default'
          },
          props: {
            closeRefresh: true
          }
        } 
      })
    },
    handleRemove(index) {
      this.data.action.splice(index, 1)
    },
    /**
     * @method: 拖拽结束
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleDragEnd() {
      if (this.moveStart !== this.moveEnd) {
        const li = this.data.action.splice(this.moveStart, 1)
        this.data.action.splice(this.moveEnd, 0, li[0])
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var';
.pages-form-button{
  margin-top: 5px;
  .el-input{
    width: 140px
  }
  .action-name{
    padding: 0 5px; 
    width: 100px;
    display: inline-block;
  }
}
</style>
