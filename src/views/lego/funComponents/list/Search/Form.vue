<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-08-28 16:06:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="70px">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="样式配置" :level="1">
          <el-form-item label="表单标题宽度：" prop="styles.labelWidth" label-width="120px">
            <el-input v-model.number="item.styles.labelWidth" placeholder="请输入表单标题宽度" /> px
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="2">
          <el-form-item label="搜索范围：">
            <el-radio-group v-model="item.searchScope">
              <el-radio :label="0">全局接口</el-radio>
              <el-radio :label="1">指定组件</el-radio>
            </el-radio-group>
            <div class="tip">表格使用独立接口获取必须使用指定组件，指向目标组件发布查询通知</div>
          </el-form-item>
          <el-form-item label="指定组件：" v-if="item.searchScope === 1">
            <div>指定组件的数据来源必须是独立接口获取</div>
            <el-select v-model="item.searchTarget" filterable multiple placeholder="请选择" style="width: 80%">
              <el-option
                v-for="item in idModuleList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="布局管理" :level="1">
          <el-form-item label="组件：">
            <el-button @click="handleAdd">新增表单组件</el-button>
            <el-table
              class="group-table"
              :data="item.layout"
              border>
              <el-table-column
                prop="type"
                label="组件类型"
                width="170">
                <template slot-scope="scope">
                  <el-input 
                    class="row-form__type" 
                    prefix-icon="el-icon-search"
                    v-model="scope.row.type" 
                    placeholder="组件类型"
                    @focus="handleOpen(scope.$index)"/>
                  <p>名称：{{scope.row.module && idModule[scope.row.module] ? idModule[scope.row.module].label : ' --'}}</p>
                  <!-- <div>{{scope.row.module ? idModule[scope.row.module].label : '--'}}</div> -->
                </template>
              </el-table-column>
              <el-table-column
                prop="col"
                label="宽度">
                <template slot="header">
                  宽度
                  <ColTips />
                </template>
                <template slot-scope="scope">
                  <el-input-number class="row-form__col" :controls="false" v-model="scope.row.col" placeholder="col"/>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button type="text" class="row-form__add" :disabled="!scope.row.type" @click="handleEdit(scope.row.module)">编辑</el-button>
                  <el-button type="text" @click="handleRemove(scope.$index)">删除</el-button>
                  <el-button type="text" :disabled="scope.$index === 0" @click="handleMoveUp(scope.$index)">上移</el-button>
                  <el-button type="text" :disabled="scope.$index === item.layout.length - 1" @click="handleMoveDown(scope.$index)">下移</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
    <AddModuleDialog ref="AddModuleDialog" 
      :fun="moduleFun"
      @select="handleAddModule" />
    <slot />
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import FoldWraper from '@/views/lego/components/FoldWraper'
import AddModuleDialog from '@/views/lego/edit/components/AddModuleDialog'
import manageJson from '@/views/lego/funComponents/manage.json'
import baseData from './data'
import ColTips from '../../tips/ColTips'

export default {
  name: 'RowForm',
  components: {
    AddModuleDialog,
    ColTips,
    FoldWraper
  },
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
      moduleFun: [
        'Input', 
        'Radio', 
        'Checkbox', 
        'Select', 
        'TimePick', 
        'DatePick', 
        // 'DateTimePick',
        'InputNumber', 
        'InputCode', 
        'AddressCascader',
        'Cascader'
      ],
      index: 0,
      rules: baseData.rules,
      searchComponents: [
        'Table',
        'DetailTable',
        'DetailChartsXY',
        'DetailCharts'
      ]
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    }),
    idModuleList() {
      const searchComponentsStr = this.searchComponents.join('|')
      return Object.keys(this.idModule).filter((item) => {
        // eslint-disable-next-line 
        const reg = eval(`/^(${searchComponentsStr})/`)
        if (reg.test(item)) {
          return item
        }
        return false
      })
    }
  },
  methods: {
    handleAdd() {
      this.item.layout.push({ ...{ col: 6, module: new Date().getTime() } })
    },
    handleRemove(index) {
      const valueClone = [...this.item.layout]
      const { module } = valueClone[index]
      valueClone.splice(index, 1)
      this.item.layout = valueClone
      this.$store.dispatch('manage/removeModule', { module, go: this.item.id })
    },
    /**
     * @description: 打开选择组件框
     * @param {type} 
     * @return: 
     */
    handleOpen(index) {
      this.index = index
      this.$refs.AddModuleDialog.open()
    },
    /**
     * @description: 增加组件
     * @param {type} 
     * @return: 
     */
    handleAddModule(data) {
      Object.assign(data.data, {
        parent: this.item.id
      })
      // 删除编辑前的对象
      this.$store.dispatch('manage/removeModule', { module: this.item.layout[this.index].module, go: this.item.id })
      // 赋值操作
      this.$set(this.item.layout[this.index], 'module', data.id)
      this.$set(this.item.layout[this.index], 'type', manageJson.componentsInfo[data.data.type].name)
      // 新增模块对象
      this.$store.dispatch('manage/addModule', data)
    },
    /**
     * @description: 编辑组件
     * @param {type} 
     * @return: 
     */  
    handleEdit(id) {
      this.$store.dispatch('manage/setActiveId', id)
    },
    handleMoveUp(index) {
      const data = { ...this.item.layout[index] }
      this.$set(this.item.layout, index, this.item.layout[index - 1])
      this.$set(this.item.layout, index - 1, data)
    },
    handleMoveDown(index) {
      const data = { ...this.item.layout[index] }
      this.$set(this.item.layout, index, this.item.layout[index + 1])
      this.$set(this.item.layout, index + 1, data)
    }
  }
}
</script>
<style lang="less">
</style>
