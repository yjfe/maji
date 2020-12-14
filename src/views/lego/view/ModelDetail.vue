<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:42
 * @LastEditTime: 2020-12-09 10:50:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="100px" ref="form" :model="idModule">
    <div class="preview-box-item" 
      v-for="(item, index) in floorList" :key="`free${item}`">
      <slot v-if="!idModule[item]" :name="item" />
      <FreeComponentsId 
        v-else
        :moduleId="item" 
        :key="`free${item}`" 
        :index="index" 
        :pageData="form" 
         :isFormEdit="isFormEdit"
        :query="query" />
    </div>
    <div class="attract-bottom" v-if="pagesModule.action && !parent && pagesModule.action.length > 0">
      <PageButton 
        @refresh="detailAction"
        :pageData="form" 
        :query="query"
        :pagesModule="pagesModule" 
        v-bind="$attrs"/>
    </div>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { getRouteQuery, useCodeEvent } from '@/views/lego/utils'
import PageButton from './components/PageButton'

export default {
  name: 'PreviewDetail',
  componentName: 'PreviewDetail',
  components: {
    FreeComponentsId,
    PageButton
  },
  props: {
    floorList: {
      type: Array,
      default() {
        return []
      }
    },
    pagesModule: {
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
      loading: false,
      form: undefined,
      query: {},
      baseQuery: {},
      isFormEdit: true // 页面组件是编辑的状态
    }
  },
  created() {
    this.query = this.getQuery()  
  },
  mounted() {
    const { ...query } = this.dialogQuery || this.$route.query 
    this.baseQuery = getRouteQuery(query)
    this.query = { ...this.baseQuery }
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.pagesModule, 'componentCreated', this)(this.query, this.pagesModule, this.$store.getters['manage/idModule'])
    // 初始化执行获取详情数据
    this.detailAction()
    this.$root.$on(`pageGetData${this.pagesModule.isDialog || ''}`, this.detailAction)
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.pagesModule, 'componentWillDestroy', this)(this.pagesModule, this.$store.getters['manage/idModule'])
    this.$root.$off(`pageGetData${this.pagesModule.isDialog || ''}`)
  },
  methods: {
    /**
     * @method: 解析事件-详情
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 17:22:04
     */
    detailAction(data) {
      if (!this.pagesModule.apiUrl) return
      this.getDetail(data)
    },
    getDetail(data = {}) {
      const { query, type, reset } = data
      if (query) {
        if (type === 'page') {
          this.query = {
            ...this.query
          }
        } else if (type === 'search') {
          this.query = {
            ...query
          }
        } else if (type === 'changeQuery') {
          this.query = reset ? {} : query
          this.query = { ...this.baseQuery, ...this.query }
          return
        }
      }
      // 塞入路由上的参数
      this.query = { ...this.baseQuery, ...this.query }
      // 没有请求地址则不执行请求
      if (!this.pagesModule.apiUrl) return
      const apiData = apiResolver(this.pagesModule.apiUrl)
      const httpParams = { ...apiData.requestQuery, ...this.query }
      // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
      useCodeEvent(this.pagesModule, 'componentBeforeSend', this)(httpParams, this.pagesModule, this.$store.getters['manage/idModule'])
      // 执行http请求
      httpAgent[apiData.type](apiData.url, httpParams, { 
        context: this, 
        noAuth: true, 
        preview302: true, 
        ...apiData.option 
      }).then((res) => {
        // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
        useCodeEvent(this.pagesModule, 'componentAfterSend', this)(res.data, this.pagesModule, this.$store.getters['manage/idModule'])
        this.form = res.data || {}
        // TODO: 详情数据格式转换到form里
        Object.keys(this.idModule).forEach((id) => {
          const item = this.idModule[id]
          // 非同属于弹出层或页面的组件数据不同步
          if (item.isDialog !== this.pagesModule.isDialog) return
          const { key } = item
          if (key && this.form[key] !== undefined && !item.fake) {
            // 初始化给所有表单赋值
            this.$set(item, 'value', this.form[key])
          }
        })
      })
    },
    getQuery() {
      const query = this.dialogQuery || this.$route.query || {}
      if (query.pageIndex && typeof query.pageIndex === 'string') {
        query.pageIndex = parseInt(query.pageIndex, 10) || 1
      }
      if (query.pageSize && typeof query.pageSize === 'string') {
        query.pageSize = parseInt(query.pageSize, 10) || 10
      }
      return query
    }
  }
}
</script>
