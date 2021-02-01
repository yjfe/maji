<!--
 * @Date: 2019-11-18 15:14:05
 * @LastEditTime: 2020-03-24 21:44:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \generate\src\views\lego\funComponents\detail\FilterMoreDialog.vue
 -->
<template>
  <div>
    <el-dialog title="表格列管理" :visible.sync="visible" width="1000px" v-if="visible" :close-on-click-modal="false">
      <el-button @click="$emit('add')">新增行</el-button>
      <el-table
        class="group-table"
        :data="list"
        border>
        <el-table-column
          prop="label"
          label="名称"
          width="150">
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
          label="图形类型"
          width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.chartType">
              <el-option
                v-for="item in chartType"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="颜色"
          width="50">
          <template slot-scope="scope">
            <el-color-picker
              v-model="scope.row.color"
              :predefine="predefineColors">
            </el-color-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="显示最值"
          width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hasApices" />
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="标记点">
          <template slot-scope="scope" v-if="scope.row.chartType === 'line'">
            <el-select v-model="scope.row.symbolType">
              <el-option
                v-for="item in symbolType"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="线条样式">
          <template slot-scope="scope" v-if="scope.row.chartType === 'line'">
            <el-select v-model="scope.row.lineStyle" placeholder="请选择">
              <el-option
                v-for="item in lineStyleTypeEnums"
                :key="item"
                :label="item"
                :value="item">
                <div :class="`line-style line-${item}`"></div>
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="isArea"
          label="面积图"
          width="100">
          <template slot-scope="scope" v-if="scope.row.chartType === 'line'">
            <el-switch
              v-model="scope.row.isArea" />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="110">
          <template slot-scope="scope">
            <el-button type="text" @click="openAction(scope.row)" >事件配置</el-button>
            <el-button type="text" @click="$emit('remove', scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" native-type="submit" @click.native.prevent="visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <ActionDialog ref="ActionDialog"/>
  </div>
</template>
<script>
import ActionDialog from './ActionDialog'
import baseData from './data'

export default {
  name: 'ChartDataMoreDialog',
  components: {
    ActionDialog
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
      predefineColors: baseData.predefineColors,
      lineStyleTypeEnums: baseData.lineStyleTypeEnums,
      chartType: baseData.chartType,
      symbolType: baseData.symbolType
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    openAction(data) {
      this.$refs.ActionDialog.open(data)
    }
  }
}
</script>
<style lang="less">
.line-style{
  height: 18px;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-bottom: 2px;
  border-left: 0;
  border-color: #000;
  &.line-solid{
    border-style: solid
  }
  &.line-dashed{
    border-style: dashed
  }
  &.line-dotted{
    border-style: dotted
  }
}
</style>
