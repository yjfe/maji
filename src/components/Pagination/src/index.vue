<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-11-07 18:07:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-pagination
    v-show="query.total"
    :page-sizes="pageSizes"
    v-bind="$attrs"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  >
  </el-pagination>
</template>

<script>
import { searchUpdateRoute } from '@/utils'

export default {
  componentName: 'Pagination',
  props: {
    /**
     * @prop {Object} query 分页参数
     */
    query: {
      type: [Object, Array]
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
     * @prop {Object, Array} pageSizes 每页数量选择  默认: [10, 20, 40, 60, 80, 100]
     */
    pageSizes: {
      type: [Object, Array],
      default: () => [10, 20, 40, 60, 80, 100]
    }
  },
  watch: {
    $route() {
      if (this.history) {
        this.$emit('fetch', this.getQuery(this.query))
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * @method: 获取路由参数与传入query混合
     * @param {Object} query 请求参数
     * @return {Object} 路由query和传入query混合结果
     */
    getQuery(query) {
      const myQuery = this.$route.query
      if (myQuery.pageIndex) {
        myQuery.pageIndex = parseInt(myQuery.pageIndex, 10)
      } else {
        delete myQuery.pageIndex
      }
      if (myQuery.pageSize) {
        myQuery.pageSize = parseInt(myQuery.pageSize, 10)
      } else {
        delete myQuery.pageSize
      }
      delete myQuery.pageTotal
      delete myQuery.total
      return Object.assign({}, query, myQuery)
    },
    /**
     * @method: 获取搜索参数， 删除分页使用的多余字段
     * @param {Object} query 请求参数
     * @return {Object} 删除分页使用的多余字段
     */
    getSearch(query) {
      const search = Object.assign({}, query, this.$route.query)
      delete search.pageTotal
      delete search.total
      return search
    },
    /**
     * @method: 更新路由历史
     * @param {Object} query 请求参数
     */
    updateRoute(query) {
      // 更新URL地址
      if (this.history) {
        searchUpdateRoute(query, this)
      } else {
        this.$emit('update:query', query)
        this.$emit('fetch', query)
      }
    },
    /**
     * @method: 修改页数事件
     * @param {Number} value 页码
     */
    handleCurrentChange(value) {
      // 修改页数事件
      if (!this.$sizeChangeTimer) {
        //eslint-disable-line
        const query = Object.assign({}, this.query, { pageIndex: value })
        if (this.updateRoute) this.updateRoute(query)
        const node = this.$el.querySelector('.el-pagination')
        if (node) {
          // 阻止频繁点击
          node.style.pointerEvents = 'none'
          setTimeout(() => {
            node.style.pointerEvents = ''
          }, 1000)
        }
      }
    },
    /**
     * @method: 修改分页条数事件
     * @param {Number} value 页码
     */
    handleSizeChange(value) {
      // 修改分页条数事件
      this.$sizeChangeTimer = true // 避免页数修改后当前页Change事件重复触发
      setTimeout(() => {
        this.$sizeChangeTimer = false
      }, 500)
      const pages = {}
      pages.pageIndex = 1
      pages.pageSize = value
      const query = Object.assign({}, this.query, pages)
      this.updateRoute(query)
    }
  }
}
</script>

<style lang="less"></style>
