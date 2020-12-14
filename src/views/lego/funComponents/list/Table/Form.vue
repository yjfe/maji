<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-11-10 18:15:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础配置" :level="1">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="item.title" />
          </el-form-item>
          <el-form-item label="标题位置：" prop="titleLocation">
            <el-radio-group v-model="item.titleLocation">
              <el-radio label="">不显示</el-radio>
              <el-radio label="top">表格上方</el-radio>
              <el-radio label="left">表格左侧</el-radio>
            </el-radio-group>
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="表格配置" :level="1">
          <el-form-item label="表格按钮：">
            <el-button type="primary" @click="handleEditAction({ arr: item.buttonList, isInner: false })">编辑按钮</el-button>
          </el-form-item>
          <el-form-item label="布局管理：">
            <el-button @click="handleAdd">新增列</el-button>
            <el-button @click="handleAddAction">新增操作</el-button>
            <el-button style="float: right" @click="handleOpenMore">展开</el-button>
            <el-table
              v-if="item && item.layout"
              class="group-table"
              :data="item.layout"
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
                  <el-button v-else type="primary" size="mini" @click="handleEditAction({ arr: scope.row.btnList, isInner: true })">编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="50">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleRemove(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="数据来源：" prop="optionsType">
            <el-radio-group v-model="item.optionsType">
              <el-radio :label="1">独立接口获取</el-radio>
              <el-radio :label="2">页面接口获取</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="item.optionsType === 1">
            <el-form-item label="接口地址：" prop="apiUrl">
              <template slot="label">
                接口地址：
                <ApiTips />
              </template>
              <el-input type="textarea" v-model.lazy="item.apiUrl" />
            </el-form-item>
          </template>
          <el-form-item label="字段名：" prop="key">
            <el-input v-model="item.key" />
          </el-form-item>
          <el-form-item label="total字段名：" prop="totalKey">
            <el-input v-model="item.totalKey" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="高度：">
            <el-input-number v-model.number="item.height" /> px  （注：0或空则自适应高度）
          </el-form-item>
          <el-form-item label="分页：">
            <el-switch
              v-model="item.hasPagination"
              :active-value="1"
              :inactive-value="0"
              active-text="显示"
              inactive-text="隐藏">
            </el-switch>
          </el-form-item>
          <el-form-item label="表格勾选：">
            <el-switch
              v-model="item.tableSelect"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
            <el-input style="margin-left:20px;" placeholder="请输入行数据的Key" v-model="item.selectRowKey" /> 
            <TableSecectTips />
          </el-form-item>
          <el-form-item label="选择列：">
            <el-switch
              v-model="item.tableThSelect"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
    <EditActionDialog ref="EditActionDialog"/>
    <ThMoreDialog ref="ThMoreDialog" :list="item.layout" 
      @change="hanleChangeMore"
      @remove="handleRemove"
      @add="handleAdd"
      @addAction="handleAddAction"
      @editAction="handleEditAction" />
    <slot />
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'
import EditActionDialog from './EditActionDialog'
import ThMoreDialog from './ThMoreDialog'
import TableFormatValueTips from '../../tips/TableFormatValueTips'
import ApiTips from '../../tips/ApiTips'
import TableSecectTips from '../../tips/TableSecectTips'

export default {
  name: 'TableForm',
  components: {
    EditActionDialog,
    TableFormatValueTips,
    ApiTips,
    ThMoreDialog,
    TableSecectTips,
    FoldWraper
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      moduleFun: ['Input', 'Select', ''],
      index: 0,
      rules: baseData.rules
    }
  },
  methods: {
    handleAdd() {
      const len = this.item.layout.length + 1 || 1
      this.item.layout.push({ 
        ...{ 
          label: `列${len}`, 
          key: `key${len}`,
          fixed: false, 
          openType: 0 
        } 
      })
    },
    handleRemove(index) {
      const valueClone = [...this.item.layout]
      valueClone.splice(index, 1)
      this.item.layout = valueClone
    },
    /**
     * @description: 编辑组件
     * @param {type} 
     * @return: 
     */  
    handleEdit(id) {
      this.$store.dispatch('manage/setActiveId', id)
    },
    /**
     * @method: 新增操作列
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 10:43:17
     */
    handleAddAction() {
      this.item.layout.push({ 
        ...{ 
          label: '操作', 
          key: `action${new Date().getTime()}`, 
          type: 'action', 
          btnList: [] 
        } 
      })
    },
    /**
     * @method: 编辑表格操作栏目
     * @param arr{Array} 操作的子集数组
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 10:50:05
     */
    handleEditAction({ arr, isInner }) {
      this.$refs.EditActionDialog.open(arr, isInner)
    },
    /**
     * @Date: 2019-10-30 15:30:40
     * @method: 表格操作，展开更多编辑框
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleOpenMore() {
      this.$refs.ThMoreDialog.open()
    },
    /**
     * @Date: 2019-10-30 15:30:40
     * @method: 表格操作，展开更多的回调
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    hanleChangeMore(arr) {
      this.item.layout = []
      this.$nextTick(() => this.item.layout = arr)
    }
  }
}
</script>
<style lang="less">
</style>
