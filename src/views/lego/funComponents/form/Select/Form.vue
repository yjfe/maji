<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-09-21 10:45:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="90px" :rules="rules" :model="item" ref="form">
    <ComponentFormHeadTabs>
      <template slot="base">
        <FoldWraper label="基础信息" :level="1">
          <el-form-item label="名称：" prop="label">
            <el-input v-model="item.label" />
          </el-form-item>
          <el-form-item label="提示文本：" prop="placeholder">
            <el-input v-model="item.placeholder" />
          </el-form-item>
          <el-form-item label="提示备注：" prop="remark">
            <el-input v-model="item.remark" />
          </el-form-item>
        </FoldWraper>
        <FoldWraper label="功能配置" :level="1" v-if="!$attrs.isDetail">
          <el-form-item label="编辑禁用：" prop="">
            <el-switch
              v-model="item.editDisabled"
              active-text="开启"
              inactive-text="关闭" />
          </el-form-item>
          <el-form-item label="支持多选：" prop="multiple">
            <el-switch
              v-model="item.multiple"
              @change="handleChangeMultiple"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
          </el-form-item>
          <el-form-item label="支持搜索：" prop="filterable">
            <el-switch
              v-model="item.filterable"
              active-text="开启"
              inactive-text="关闭">
            </el-switch>
          </el-form-item>
        </FoldWraper>
        <ValidatorDialog :options="item.validator" :rules="['required']"/>
        <slot />
      </template>
      <template slot="data">
        <FoldWraper label="数据配置" :level="2">
          <el-form-item label="字段名：" prop="key">
            <el-input v-model.trim="item.key" />
          </el-form-item>
          <el-form-item label="数据来源：">
            <el-radio-group v-model="item.optionsType" @change="handleChangeType">
              <el-radio :label="1">接口</el-radio>
              <el-radio :label="2">配置</el-radio>
            </el-radio-group>
          </el-form-item>
          <template v-if="item.optionsType === 1">
            <el-form-item label="接口地址：">
              <template slot="label">
                接口地址：
                <ApiTips />
              </template>
              <el-input type="textarea" v-model="item.apiUrl" placeholder="请输入接口地址" />
            </el-form-item>
            <el-form-item label="数组字段名：" prop="dataKey">
              <el-input v-model="item.dataKey" /> 注：为空则认为data是数组，有字段名取data下该字段
            </el-form-item>
            <el-form-item label="value字段名：">
              <el-input v-model="item.valueKey" />
            </el-form-item>
            <el-form-item label="label字段名：">
              <el-input v-model="item.labelKey" />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="value类型：">
              <el-radio v-model="item.valueType" label="number">数字</el-radio>
              <el-radio v-model="item.valueType" label="string">字符串</el-radio>
            </el-form-item>
            <el-form-item label="选项配置：">
              <el-button @click="handleAdd">新增行</el-button>
              <el-table
                class="group-table"
                :data="item.options"
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
                    <el-checkbox v-if="item.multiple" v-model="item.value" :label="scope.row.value">默认</el-checkbox>
                    <el-radio v-else v-model="item.value" :label="scope.row.value">默认</el-radio>
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
          </template> 
        </FoldWraper>
      </template>
      <template slot="event">
        <CodePointEvent 
          :data="item" 
          :event="['componentCreated', 'componentBeforeSend', 'componentAfterSend', 'componentWillDestroy', 'inputChange']"></CodePointEvent>
      </template>
    </ComponentFormHeadTabs>
  </el-form>
</template>
<script>
import FoldWraper from '@/views/lego/components/FoldWraper'
import ValidatorDialog from '@/views/lego/edit/components/ValidatorDialog'
import baseData from './data'
import ApiTips from '../../tips/ApiTips'

export default {
  name: 'SelectForm',
  components: {
    ValidatorDialog,
    ApiTips,
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
      rules: baseData.rules
    }
  },
  methods: {
    handleAdd() {
      const index = this.item.options.length
      this.item.options.push({ ...{ label: `选项${index + 1}`, value: `${index}` } })
    },
    handleRemove(index) {
      const valueClone = [...this.item.options]
      valueClone.splice(index, 1)
      this.item.options = valueClone
    },
    handleChangeType() {
      if (this.item.optionsType === 1) {
        this.item.value = ''
      }
    },
    /**
     * @method: 多选开关
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-23 14:33:59
     */
    handleChangeMultiple(value) {
      if (value) {
        // 多选
        this.item.value = []
      } else {
        // 单选
        this.item.value = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
