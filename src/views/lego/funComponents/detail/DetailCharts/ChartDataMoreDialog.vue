<!--
 * @Date: 2019-11-18 15:14:05
 * @LastEditTime: 2020-12-11 09:45:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \generate\src\views\lego\funComponents\detail\FilterMoreDialog.vue
 -->
<template>
  <el-dialog title="表格列管理" :visible.sync="visible" width="1200px" v-if="visible" :close-on-click-modal="false">
    <el-button @click="$emit('add')">新增行</el-button>
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
        prop="value"
        label="值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.value"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="事件类型"
        width="100">
        <template slot-scope="scope">
          <el-select v-model="scope.row.handleType">
            <el-option
              v-for="item in typeEnum"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="query"
        label="参数">
        <template slot="header">
          参数
          <ButtonQueryTips />
        </template>
        <template slot-scope="scope">
          <el-input type="textarea" 
            :autosize="{ minRows: 1, maxRows: 3}"
            v-model="scope.row.query" />
        </template>
      </el-table-column>
      <el-table-column

        prop="url"
        label="配置url">
        <template slot="header">
          配置url
          <ButtonLinkTips />
        </template>
        <template slot-scope="scope">
          <el-input 
            type="textarea" 
            placeholder="接口地址或跳转页面"
            :autosize="{ minRows: 1, maxRows: 3}"
            v-model="scope.row.url" />
        </template>
      </el-table-column>
      <el-table-column
        prop="option"
        label="配置属性">
        <template slot-scope="scope">
          <el-input v-if="scope.row.handleType === 'text'" placeholder="请输入提示文本" v-model="scope.row.message" />
          <el-select v-else-if="scope.row.handleType === 'link'" v-model="scope.row.openType">
            <el-option label="内部打开" :value="0"></el-option>
            <el-option label="外部打开" :value="1"></el-option>
          </el-select>
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
      <el-button type="primary" native-type="submit" @click.native.prevent="visible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import ButtonQueryTips from '../../tips/ButtonQueryTips'
import ButtonLinkTips from '../../tips/ButtonLinkTips'

export default {
  name: 'ChartDataMoreDialog',
  components: {
    ButtonQueryTips,
    ButtonLinkTips
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
      visible: false,
      typeEnum: [
        {
          label: '无',
          value: ''
        },
        {
          label: '链接',
          value: 'link'
        }
      ]
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
    }
  }
}
</script>
