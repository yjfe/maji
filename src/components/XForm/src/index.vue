<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-01-30 16:45:49
 * @LastEditTime: 2020-12-15 14:43:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ContentBox class="xform">
    <el-form :label-width="layout.labelWidth || '100px'">
      <el-row>
        <template v-for="(item, index) in fields">
          <el-col :span="item.span || 8" :lg="item.lg || 6" :key="index" v-if="index < 6">
            <el-form-item :label="`${item.label}：`">
              <template v-if="item.slot">
                <slot :name="item.slot" :index="index" :data="item"></slot>
              </template>
              <component v-else :is="`form-${item.type}`" :schema="item" />
            </el-form-item>
          </el-col>
        </template>
        <template v-if="fields.length > 6 && showMore">
          <template v-for="(item, index) in fields">
            <el-col
              :span="item.type === 'rangeDate' ? 16 : item.span || 8"
              :lg="item.type === 'rangeDate' ? 12 : item.lg || 6"
              :key="index"
              v-if="index >= 6"
            >
              <el-form-item :label="`${item.label}：`">
                <template v-if="item.slot">
                  <slot :name="item.slot" :index="index" :data="item"></slot>
                </template>
                <component v-else :is="`form-${item.type}`" :schema="item" />
              </el-form-item>
            </el-col>
          </template>
        </template>
        <div class="search-more">
          <div
            class="search-more-toggle"
            v-if="fields.length > 6"
            :class="{ 'is-open': showMore }"
            @click="showMore = !showMore"
            v-text="showMore ? '收起' : '展开'"
          ></div>
          <el-button
            v-if="showSearchButton"
            type="primary"
            native-type="submit"
            @click.native.prevent="handleSearch()"
            >搜索</el-button
          >
          <el-button v-if="showResetButton" @click="handleReset">重置</el-button>
          <slot type="de" />
        </div>
      </el-row>
    </el-form>
  </ContentBox>
</template>
<script>
import { searchUpdate } from '@/utils'
import FormInput from './components/Input'
import FormRadio from './components/Radio'
import FormCheckbox from './components/Checkbox'
import FormSelect from './components/Select'
import FormCascader from './components/Cascader'
import FormTimeSelect from './components/TimeSelect'
import FormTimePicker from './components/TimePicker'
import FormDatePicker from './components/DatePicker'
import FormRangeDate from './components/RangeDate'
import FormAddressCascader from './components/AddressCascader'

export default {
  componentName: 'XForm',
  components: {
    FormInput,
    FormRadio,
    FormCheckbox,
    FormSelect,
    FormCascader,
    FormTimeSelect,
    FormTimePicker,
    FormDatePicker,
    FormRangeDate,
    FormAddressCascader
  },
  props: {
    /**
     * @prop {Object} query 请求参数
     */
    query: {
      // 请求参数
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {Object} layout 布局配置
     */
    layout: {
      // 布局
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {Array} fields 表单项配置，详细看文档
     */
    fields: {
      // 表单项
      type: Array,
      default() {
        return []
      }
    },
    /**
     * @prop {Boolean} history 列表分页是否产生历史记录  默认: true
     */
    history: {
      // 列表分页是否产生历史记录
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} showSearchButton 控制显示搜索按钮  默认: true
     */
    showSearchButton: {
      // 控制显示搜索按钮
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} showResetButton 控制显示重置按钮  默认: true
     */
    showResetButton: {
      // 控制显示重置按钮
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMore: false,
      search: {},
      defaultQuery: {}
    }
  },
  created() {
    this.getRouterQuery()
    this.handleSearch(true)
  },
  methods: {
    /**
     * @description: 合并url上的参数
     * @param {type}
     * @return:
     */
    getRouterQuery() {
      // 获取页面参数
      const query = { ...this.$route.query }
      if (query.pageIndex) {
        query.pageIndex = parseInt(query.pageIndex, 10)
      }
      if (query.pageSize) {
        query.pageSize = parseInt(query.pageSize, 10)
      }
      this.query.pageIndex = query.pageIndex || this.query.pageIndex
      this.query.pageSize = query.pageSize || this.query.pageSize
      // 塞入配置对象内
      this.fields.forEach((item) => {
        if (item.type === 'rangeDate') {
          if (item.startKey || query[item.startKey]) {
            this.$set(item, item.startKey, new Date(query[item.startKey] || item[item.startKey]))
          }
          if (item.endKey || query[item.endKey]) {
            this.$set(item, item.endKey, new Date(query[item.endKey] || item[item.endKey]))
          }
        } else if (item.value || query[item.key]) {
          let value = query[item.key] || item.value
          if (item.dataType === 'Number') {
            if (Array.isArray(value)) {
              value = value.map(item => parseInt(item, 10))
            } else {
              value = parseInt(value, 10)
            }
          }
          this.$set(item, 'value', value)
        }
      })
    },
    /**
     * @description: 点击搜索
     * @param {type}
     * @return:
     */
    handleSearch(first = false) {
      if (this.$sizeChangeTimer) return
      this.$sizeChangeTimer = true // 避免页数修改后当前页Change事件重复触发
      setTimeout(() => {
        this.$sizeChangeTimer = false
      }, 500)
      let search = {}
      this.fields.forEach((item) => {
        if (item.type === 'rangeDate') {
          search[item.startKey] = item[item.startKey]
          search[item.endKey] = item[item.endKey]
        } else {
          search[item.key] = item.value
        }
      })
      if (this.query) {
        search = Object.assign(this.query, search, { pageIndex: 1 })
      }
      // 移除空字段
      for (const key in search) {
        if (search[key] === undefined) {
          delete search[key]
        } else if (Array.isArray(search[key])) {
          if (Array.isArray(search[key]) && search[key].length === 0) {
            delete search[key]
          }
        } else if (
          typeof search[key] === 'object' && (JSON.stringify(search[key]) === '[]' || JSON.stringify(search[key]) === 'null')
        ) {
          delete search[key]
        }
      }
      if (this.history && !first) {
        // 修改rul
        searchUpdate(search, this)
      }
      if (!this.history || first) {
        this.$emit('fetch', search)
      }
    },
    /**
     * @description: 重置搜索条件
     * @param {type}
     * @return:
     */
    handleReset() {
      this.fields.forEach((item) => {
        if (item.type === 'rangeDate') {
          this.$set(
            item,
            item.startKey,
            this.defaultQuery[item.startKey || 'startTime'] || undefined
          )
          this.$set(item, item.endKey, this.defaultQuery[item.endKey || 'endTime'] || undefined)
        } else if (Array.isArray(item.value)) {
          this.$set(item, 'value', this.defaultQuery[item.key] || [])
        } else {
          this.$set(item, 'value', this.defaultQuery[item.key] || undefined)
        }
      })
      this.handleSearch()
    },
    /**
     * @method: 设置初始值，重置的默认值
     * @param {type}
     * @return:
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-06-11 16:59:27
     */
    setDefaultQuery(query) {
      this.defaultQuery = query
      this.fields.forEach((item) => {
        if (query[item.key]) {
          item.value = query[item.key]
        } else if (query[item.startKey || 'startTime']) {
          item[item.startKey || 'startTime'] = query[item.startKey || 'startTime']
        } else if (query[item.endKey || 'endTime']) {
          item[item.endKey || 'endTime'] = query[item.endKey || 'endTime']
        }
      })
    }
  }
}
</script>
<style lang="less">
@import '~styles/var.less';
.xform {
  .content-box__box {
    padding-top: 20px !important;
    padding-bottom: 2px !important;
  }
  .el-select,
  .el-cascader {
    width: 100%;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    max-height: 33px;
    overflow: hidden;
  }
  .el-form-item__content {
    padding-right: 10px;
    & > .el-input,
    & > .el-input-number,
    & > .el-select,
    & > .el-textarea,
    & .el-cascader,
    & > .el-range-editor {
      width: 100% !important;
    }
    .range-date {
      .el-date-editor {
        width: calc(50% - 8px);
      }
      .Separator {
        width: 16px;
      }
    }
  }
}
</style>
