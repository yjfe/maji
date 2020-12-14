<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-22 10:28:25
 * @LastEditTime: 2020-11-10 18:08:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-dialog title="表格列管理" 
      :visible.sync="visible" 
      width="1200px" v-if="visible" 
      :close-on-click-modal="false"
      @close="handleChangeMore">
      <el-button @click="$emit('add')">新增列</el-button>
      <el-button @click="$emit('addAction')">新增操作</el-button>
      <el-table
        class="group-table"
        :data="list"
        border>
        <el-table-column
          prop="label"
          label="名称"
          width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.label" />
          </template>
        </el-table-column>
        <el-table-column
          prop="key"
          label="字段名"
          width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.key" v-if="scope.row.type !== 'action'"/>
            <span v-else>操作栏</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="formatValue"
          label="自定义输出">
          <template slot="header">
            自定义输出
            <TableFormatValueTips />
          </template>
          <template slot-scope="scope">
            <el-input type="textarea" 
              v-if="scope.row.type !== 'action'"
              :autosize="{ minRows: 1, maxRows: 3}"
              v-model="scope.row.formatValue" />
            <el-button v-else type="primary" size="mini" @click="$emit('editAction', { arr: scope.row.btnList, isInner: true })">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="width"
          label="宽度"
          width="96">
          <template slot-scope="scope">
            <el-input-number v-model.number="scope.row.width" :controls="false" style="width: 60px;" /> px
          </template>
        </el-table-column>
        <el-table-column
          label="额外配置"
          width="110">
          <template slot-scope="scope">
            <el-button @click="handleThOtherEdit(scope.row)">更多配置</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.$index === 0" @click="handleMoveUp(scope.$index)">上移</el-button>
            <el-button type="text" :disabled="scope.$index === list.length - 1" @click="handleMoveDown(scope.$index)">下移</el-button>
            <el-button type="text" @click="$emit('remove', scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" native-type="submit" @click.native.prevent="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <EditThOtherDialog ref="EditThOtherDialog"/>
  </div>

</template>
<script>
// import ButtonQueryTips from '../../tips/ButtonQueryTips'
// import ButtonLinkTips from '../../tips/ButtonLinkTips'
import TableFormatValueTips from '../../tips/TableFormatValueTips'
import EditThOtherDialog from './EditThOtherDialog'

export default {
  name: 'ThMoreDialog',
  components: { 
    // ButtonQueryTips,
    // ButtonLinkTips,
    TableFormatValueTips,
    EditThOtherDialog
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    handleMoveUp(index) {
      const data = { ...this.list[index] }
      this.$set(this.list, index, this.list[index - 1])
      this.$set(this.list, index - 1, data)
    },
    handleMoveDown(index) {
      const data = { ...this.list[index] }
      this.$set(this.list, index, this.list[index + 1])
      this.$set(this.list, index + 1, data)
    },
    /**
     * @method: 编辑导出按钮
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-18 17:40:06
     */
    handleThOtherEdit(item) {
      this.$refs.EditThOtherDialog.open(item)
    },
    handleSubmit() {
      this.$emit('change', this.list)
      this.visible = false
    },
    handleChangeMore() {
      this.$emit('change', [...this.list])
    }
  }
}
</script>
<style lang="less" scoped>
</style>
