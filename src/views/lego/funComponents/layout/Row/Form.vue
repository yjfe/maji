<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 17:59:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="70px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="主标题：">
            <el-input v-model="item.title" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="布局管理" :level="1">
          <el-form-item label="组件：">
            <el-button @click="handleAdd">新增操作按钮</el-button>
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
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </FoldWraper>
        <slot />
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
    <AddModuleDialog ref="AddModuleDialog" 
      v-if="moduleFun" 
      :fun="moduleFun"
      @select="handleAddModule" />
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import AddModuleDialog from '@/views/lego/edit/components/AddModuleDialog'
import manageJson from '@/views/lego/funComponents/manage.json'
import FoldWraper from '@/views/lego/components/FoldWraper'
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
  computed: {
    ...mapGetters({
      pagesModuleId: 'manage/pagesModuleId',
      idModule: 'manage/idModule'
    })
  },
  data() {
    return {
      moduleFun: undefined,
      index: 0,
      rules: baseData.rules
    }
  },
  created() {
    this.moduleFun = baseData.moduleFun[this.idModule[this.pagesModuleId].type]
  },
  methods: {
    handleAdd() {
      this.item.layout.push({ ...{ col: 24, module: new Date().getTime() } })
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
      this.$store.dispatch('manage/removeModule', { 
        module: this.item.layout[this.index].module,
        go: this.item.id
      })
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
    }
  }
}
</script>
