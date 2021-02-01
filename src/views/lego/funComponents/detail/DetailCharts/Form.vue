<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-01 10:10:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="100px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="图表标题：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
          <el-form-item label="高度：" prop="height">
            <el-input-number :controls="false" v-model="item.height" /> px
          </el-form-item>
          <el-form-item label="图形类型：">
            <el-radio-group v-model="item.chartType">
              <el-radio v-for="item in chartType" :label="item.value" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </FoldWraper>
          
        <FoldWraper label="坐标轴" :level="1">
          <el-form-item label="横坐标名称：" prop="xName" v-if="item.chartType !== 'pie'">
            <el-input v-model="item.xName" />
          </el-form-item>
          <el-form-item label="横坐标字段名：" prop="xKey">
            <el-input v-model="item.xKey" />
          </el-form-item>
          <el-form-item label="纵坐标名称：" prop="yName" v-if="item.chartType !== 'pie'">
            <el-input v-model="item.yName" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="系列设置" :level="1">
          <el-form-item label="纵坐标数据项：" prop="yOptions">
            <el-button @click="handleAdd">新增行</el-button>
            <el-button style="float: right" @click="handleOpenMore">展开</el-button>
            <el-table
              class="group-table"
              :data="item.yOptions"
              border>
              <el-table-column
                prop="label"
                label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.label" placeholder="名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="value"
                label="值">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.value" placeholder="值" @change="handleDefault"></el-input>
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
          <ChartDataMoreDialog ref="ChartDataMoreDialog" :list="item.yOptions"
            @remove="handleRemove"
            @add="handleAdd" />
        </FoldWraper>
        <slot />
      </template>
      <FoldWraper label="数据配置" :level="2" slot="data">
        <el-form-item label="数据来源：" prop="optionsType">
          <el-radio-group v-model="item.optionsType" @change="handleChangeType">
            <el-radio :label="1">独立接口</el-radio>
            <el-radio :label="2">页面数据</el-radio>
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
          <el-input v-model.trim="item.key" />
        </el-form-item>
        <template v-if="item.optionsType === 1">
          <el-form-item label="筛选字段：" prop="filterDefaultValue">
            <el-button @click="handleAddFilter">新增选项</el-button>
            <el-table
              v-if="item.filterOptions && item.filterOptions.length > 0"
              class="group-table"
              :data="item.filterOptions"
              border>
              <el-table-column
                prop="label"
                label="名称">
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
                  <el-radio v-model="item.filterDefaultValue" :label="scope.row.label">默认</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="50">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleRemoveFilter(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="筛选字段名：" prop="chartSendKey">
            <el-input v-model="item.chartSendKey" />
          </el-form-item>
        </template>
      </FoldWraper>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend', 'componentWillDestroy']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import baseData from './data'
import ApiTips from '../../tips/ApiTips'
import ChartDataMoreDialog from './ChartDataMoreDialog'

export default {
  name: 'DetailTextForm',
  components: {
    ApiTips,
    ChartDataMoreDialog,
    FoldWraper
  },
  data() {
    return {
      rules: baseData.rules,
      chartType: [
        // {
        //   value: 'bar',
        //   label: '柱状图'
        // },
        // {
        //   value: 'line',
        //   label: '折线图'
        // },
        {
          value: 'pie',
          label: '饼状图'
        }
      ]
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleAdd() {
      const index = this.item.yOptions.length
      this.item.yOptions.push({ 
        ...{
          label: `名称${index + 1}`,
          value: `key${index + 1}`,
          handleType: '',
          openType: 0
        } 
      })
    },
    /**
     * @Date: 2019-11-18 17:52:28
     * @method: 添加一个筛选字段
     * @param: 
     * @LastEditTime:: 
     * @LastEditors:: Please set LastEditors
     */
    handleAddFilter() {
      if (!this.item.filterOptions) {
        this.$set(this.item, 'filterOptions', [])
      }
      const index = this.item.filterOptions.length
      this.item.filterOptions.push({ ...{ label: `名称${index + 1}`, value: `key${index + 1}` } })
    },
    handleRemove(index) {
      const valueClone = [...this.item.yOptions]
      valueClone.splice(index, 1)
      this.item.yOptions = valueClone
    },
    /**
     * @Date: 2019-11-18 17:52:28
     * @method: 删除一个筛选字段
     * @param: 
     * @LastEditTime:: 
     * @LastEditors:: Please set LastEditors
     */
    handleRemoveFilter(index) {
      const valueClone = [...this.item.filterOptions]
      valueClone.splice(index, 1)
      this.item.filterOptions = valueClone
    },
    handleDefault() {
      const value = []
      this.item.yOptions.forEach((item) => {
        if (item.default !== undefined) value.push(item.value)
      })
      this.item.value = value
    },
    handleChangeType() {
      
    },
    handleOpenMore() {
      this.$refs.ChartDataMoreDialog.open()
    }
  }
}
</script>
