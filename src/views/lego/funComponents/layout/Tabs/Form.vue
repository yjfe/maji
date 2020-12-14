<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-01 10:13:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="选项配置：">
            <el-button @click="handleAdd">新增行</el-button>
            <el-table
              class="group-table"
              :data="item.layout"
              border>
              <el-table-column
                prop="label"
                label="名称"
                width="100">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.label" placeholder="名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="值">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.value" placeholder="值"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="formatValue"
                width="80"
                label="默认">
                <template slot-scope="scope">
                  <el-radio v-model="item.value" :label="scope.row.value">默认</el-radio>
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
        <slot />
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="开启搜索：">
            <el-switch v-model="item.hasSearch" />
          </el-form-item>
          <template v-if="item.hasSearch">
            <el-form-item label="字段名：" prop="key">
              <el-input v-model.trim="item.key" />
            </el-form-item>
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
          </template>
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent :data="item" :event="['componentCreated', 'componentWillDestroy', 'componentValueChange']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'

export default {
  name: 'TabsForm',
  components: {
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
      const index = this.item.layout.length
      this.item.layout.push({ ...{ label: `选项${index + 1}`, value: `${index}` } })
    },
    /**
     * @method: 多选框配置删除方法
     * @param index {Number} 
     * @return: 
     */
    handleRemove(index) {
      const valueClone = [...this.item.layout]
      valueClone.splice(index, 1)
      this.item.layout = valueClone
    }
  }
}
</script>
<style lang="less" scoped>

</style>
