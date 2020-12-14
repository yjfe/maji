<!--
 * @Author: your name
 * @Date: 2020-12-07 14:53:51
 * @LastEditTime: 2020-12-07 16:20:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \generate\src\views\lego\edit\components\AdvancedProps.vue
-->
<template>
  <div>
    <el-form v-if="isNew">
      <el-form-item label="是否渲染：">
        <el-autocomplete
          class="render-input"
          v-model="nowItem.renderRule"
          :fetch-suggestions="handLeQuerySearch"
          placeholder="请输入内容"
          @select="handleSelect">
          <span slot="prefix" v-text="`{{`"></span>
          <span slot="suffix" v-text="`}}`"></span>
        </el-autocomplete>
      </el-form-item>
    </el-form>
    <!-- 兼容代码 旧版的配置显示方式 关联关系 -->
    <RelationalDialog v-else/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import RelationalDialog from './RelationalDialog'

export default {
  name: 'AdvancedProps',
  components: { RelationalDialog },
  data() {
    return {
      nowItem: {},
      isNew: true,
      propsEnums: [
        { label: 'this.item', value: 'this.item   组件配置数据' },
        { label: 'this.pageData', value: 'this.pageData   页面数据' },
        { label: 'this.parentData', value: 'this.parentData    循环层数据' }
      ]
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule,
      activeId: state => state.manage.activeId
    })
  },
  created() {
    this.nowItem = this.idModule[this.activeId]
    this.isNew = !Array.isArray(this.nowItem.relational)
  },
  methods: {
    handLeQuerySearch(queryString, cb) {
      const { propsEnums } = this
      const results = queryString ? propsEnums.filter(this.createFilter(queryString)) : propsEnums
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    },
    handleSelect(item) {
      this.$set(this.nowItem, 'renderRule', item.label)
    }
  }
}
</script>
<style lang="less">
.render-input{
  width: calc(100% - 90px);
  .el-input__inner {
    padding-left: 20px !important;
    padding-right: 20px !important;
    width: 100%;
  } 
}
</style>
