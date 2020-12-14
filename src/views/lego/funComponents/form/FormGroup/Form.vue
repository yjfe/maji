<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-02 16:39:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="70px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="名称：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="最大数量：" prop="max">
            <el-input-number :max="50" :min="1" v-model="item.max" />
          </el-form-item>
          <el-form-item label="最小数量：" prop="min">
            <el-input-number :max="50" :min="0" v-model="item.min" />
          </el-form-item>
          <el-form-item label="最大宽度：" prop="maxWitch">
            <el-input-number :max="2000" :min="400" v-model="item.maxWitch" /> px （默认宽度100%）
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="布局管理" :level="1">
          <el-form-item label="布局管理：">
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
        <AddModuleDialog ref="AddModuleDialog" 
          :fun="moduleFun"
          @select="handleAddModule" />
        <slot />
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model.trim="item.key" />
          </el-form-item>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
// TODO: 新的parentData，最高搞他
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
      moduleFun: baseData.moduleFun,
      index: 0,
      rules: baseData.rules
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    })
  },
  methods: {
    handleAdd() {
      this.item.layout.push({ ...{ col: 8, module: '' } })
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
        parent: this.item.id,
        fake: true
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
