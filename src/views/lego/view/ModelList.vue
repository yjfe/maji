<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:15
 * @LastEditTime: 2020-12-04 10:20:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="preview-box-item" 
      v-for="(item, index) in floorList" 
      :key="`${item}`" >
      <slot v-if="!idModule[item]" :name="item" />
      <FreeComponentsId 
        v-else
        :moduleId="item" 
        :key="`free${item}`" 
        :pageData="pageData" 
        :index="index" 
        :query.sync="query" />
    </div>
    <div class="attract-bottom" v-if="pagesModule.action && !parent && pagesModule.action.length > 0">
      <PageButton 
        @refresh="getList({})"
        :pageData="pageData" 
        :query="query"
        :pagesModule="pagesModule" 
        v-bind="$attrs"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as httpAgent from '@/utils/http'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { 
  getRouteQuery, 
  getDialogQuery, 
  useCodeEvent 
} from '@/views/lego/utils'
import PageButton from './components/PageButton'

export default {
  name: 'PreviewList',
  componentName: 'PreviewList',
  components: {
    FreeComponentsId,
    PageButton
  },
  props: {
    floorList: { // 组件输出楼层数组
      type: Array,
      default() {
        return []
      }
    },
    pagesModule: { // 页面配置信息
      type: Object,
      default() {
        return {}
      }
    },
    dialogQuery: {
      type: Object
    },
    parent: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    })
  },
  data() {
    return {
      loading: false, // loading
      pageData: {},
      routeQuery: {},
      query: { // 搜索参数
        pageIndex: 1,
        pageSize: 10
      },
      list: [] // 表格数据
    }
  },
  mounted() {
    this.initPages()
    this.$root.$on(`pageGetData${this.pagesModule.isDialog || ''}`, this.getList)
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 willDestroy
    useCodeEvent(this.pagesModule, 'componentWillDestroy', this)(this.pagesModule, this.idModule)
    this.$root.$off(`pageGetData${this.pagesModule.isDialog || ''}`)
  },
  methods: {
    /**
     * @description: 页面初始化
     * @param {type} 
     * @return: 
     */
    initPages() {
      let { ...query } = this.dialogQuery || this.$route.query 
      if (this.dialogQuery) {
        query = getDialogQuery(query)
      }
      this.routeQuery = getRouteQuery(query)
      // 需要对query重新赋值才能对子组建的计算属性触发重新处理
      this.query = { ...this.query, ...this.routeQuery }
      // 代码组件 - 自定义生命周期 - 初始化 created
      useCodeEvent(this.pagesModule, 'componentCreated', this)(this.query, this.pagesModule, this.$store.getters['manage/idModule'])
      // 判断带不带搜索组件
      this.handleSearch()
    },
    /**
     * @description: 获取列表数据
     * @param {type} 
     * @return: 
     */
    getList(data = {}) {
      const { query, type, reset } = data
      if (query) {
        if (type === 'page') {
          this.query = {
            ...this.query,
            pageIndex: query.pageIndex || this.query.pageIndex,
            pageSize: query.pageSize || this.query.pageSize
          }
        } else if (type === 'search') {
          this.query = {
            ...this.routeQuery,
            ...query,
            pageIndex: 1,
            pageSize: this.query.pageSize
          }
        } else if (type === 'changeQuery') {
          this.query = reset ? {} : query
          this.query = { ...this.routeQuery, ...this.query }
          return
        }
      }
      // 塞入路由上的参数
      // this.query = { ...getRouteQuery(this.$route.query), ...this.query }
      // 没有请求地址则不执行请求
      if (!this.pagesModule.apiUrl) return
      // 删除total字段
      const apiData = apiResolver(this.pagesModule.apiUrl)
      const formData = { ...apiData.requestQuery, ...this.query }
      delete formData.total
      // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
      useCodeEvent(this.pagesModule, 'componentBeforeSend', this)(formData, this.pagesModule, this.$store.getters['manage/idModule'])
      // 执行http请求
      httpAgent[apiData.type](apiData.url, formData, { 
        context: this, 
        noAuth: true, 
        preview302: true, 
        ...apiData.option 
      }).then((res) => {
        // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
        useCodeEvent(this.pagesModule, 'componentAfterSend', this)(res.data, this.pagesModule, this.idModule)
        // 赋值
        this.pageData = res.data
      })
    },
    /**
     * @description: 发起搜索事件
     * @param {type} 
     * @return: 
     */
    handleSearch() {
      const hasSearch = Object.keys(this.idModule).find((item) => {
        if (/^Search/.test(item) && this.idModule[item].isDialog === this.pagesModule.isDialog) {
          return true
        }
        return false
      })
      // 存在搜索组件
      if (hasSearch) {
        // 触发搜索组件的搜索事件
        this.$nextTick(() => this.$root.$emit(`SearchSubmit${this.pagesModule.isDialog || ''}`))
      } else {
        // 无搜索组件，本页面直接执行
        this.getList()
      }
    }
  }
}
</script>
