<template>
  <PreviewTitle :title="this.item.title" :location="this.item.titleLocation">
    <div class="button-box table">
      <template v-for="(item, index) in item.buttonList">
        <!-- 导入 -->
        <FileUpload
          :key="index"
          v-if="item.type === 'import' && getPageButtonAuth({ auth: item.auth })"
          :action="buttonApiResolver(item.url)"
          :name="item.apiName"
          :show-file-list="false"
          :file-list.sync="item.vlaue"
          :fileAccept="item.fileType"
          :maxfileSize="item.size"
          :options="item"
          @outside="handleOutsideImport"
          @success="handleImportSuccess">
            <el-button :type="item.color" >{{item.label}}</el-button>
        </FileUpload>
        <el-button :type="item.color" 
          :key="index" 
          v-else-if="getPageButtonAuth({ auth: item.auth })"
          @click="handleClickTableAction(item, $event)">{{item.label}}</el-button>
      </template>
      <slot name="button" />
      <table-select 
        v-if="item.tableThSelect" 
        :style="{'margin-left': item.buttonList.length > 0 ? '10px' : ''}"
        ref="tableSelect" 
        :columns.sync="columns" 
        table="table" 
        :parentRef="$refs"/>
    </div>
    <PreviewBox>
      <el-table
        ref="table"
        v-if="showTable"
        :height="item.height ? `${item.height}px` : undefined"
        :data="list"
        tooltip-effect="dark"
        v-bind="tableBind"
        @selection-change="handleSelectionChange"
        border>
        <el-table-column
          v-if="item.tableSelect"
          :reserve-selection="!isEdit && !!item.selectRowKey"
          type="selection"
          prop="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(tr, index) in item.layout"
          :key="index"
          :prop="tr.key || tr.type"
          :label="tr.label"
          :fixed="tr.fixed"
          :width="tr.width"
          :show-overflow-tooltip="tr.overflowTooltip">
          <template slot="header">
            {{tr.label}}
            <el-tooltip content="Top center" placement="top" v-if="tr.thTips">
              <i class="el-icon-question font-text-sub"/>
              <div slot="content" style="max-width: 400px; line-height: 1.4" v-html="tr.thTips"></div>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <template v-if="tr.type === 'action'">
              <template v-for="(btn, index) in tr.btnList">
                <el-button 
                  type="link" 
                  :key="index" 
                  class="lego-table-button-color"
                  :class="btn.color"
                  v-if="getPageButtonAuth({ auth: btn.auth, state: btn.stateRule, data: scope.row })"
                  @click="handleClickRowAction(btn, scope.row, $event)"
                  v-text="getTextRender(btn.label, scope.row).replace(/\n/g, '<br>')"></el-button>
              </template>
            </template>
            <!-- 常规输出文本 -->
            <span :class="{'is-link': tr.url}" 
              @click="handleTdAction(tr, scope.row)" 
              v-else-if="!tr.formatValue">{{scope.row[tr.key] === undefined || scope.row[tr.key] === '' ? '-' : scope.row[tr.key]}}</span>
            <!-- 自定义输出文本 -->
            <span :class="{'is-link': tr.url}" 
              @click="handleTdAction(tr, scope.row)" v-else-if="!isEdit" v-html="scope.row[`${tr.key}__format`]"></span>
          </template>
        </el-table-column>
      </el-table>
    </PreviewBox>
    <template v-if="item.hasPagination">
      <el-pagination
        v-show="queryTotal"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="pageQuery.pageSize"
        :total="queryTotal"
        :current-page.sync="pageQuery.pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </template>
  </PreviewTitle>
</template>
<script>
import { mapState } from 'vuex'
import TableSelect from '@/components/TableSelect'
import PreviewBox from '@/components/PreviewBox'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { 
  getTextRender,
  useCodeEvent
} from '@/views/lego/utils'
import FileUpload from './FileUpload'
import PreviewTitle from './PreviewTitle'
import buttonMixin from './mixins/button'

export default {
  name: 'PreviewTable',
  mixins: [buttonMixin],
  components: {
    TableSelect, FileUpload, PreviewBox, PreviewTitle
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    query: {
      type: Object,
      default() {
        return {
          pageSize: 1,
          pageIndex: 10
        }
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit,
      pageButtonAuth: state => state.pageButtonAuth,
      idModule: state => state.manage.idModule
    }),
    // 取舍 表格数据
    tableData() {
      if (this.item.optionsType === 1) {
        return this.localData || {}
      }
      return this.pageData || {}
    },
    // 取舍 搜索参数
    pageQuery() {
      if (this.item.optionsType === 1) {
        // 合并url参数  本组件列表参数 - 页码  总页数
        return { ...this.query, ...this.localQuery, total: this.queryTotal }
      }
      return { ...this.query, total: this.queryTotal }
    },
    // 取舍表格引用的数组
    dataList() {
      return this.tableData[this.item.key] || []
    },
    // 列表的total
    queryTotal() {
      if (this.item.optionsType === 1) {
        return this.total
      }
      return this.pageData[this.item.totalKey]
    },
    tableBind() {
      if (!this.isEdit && this.item.selectRowKey) {
        return {
          'row-key': this.item.selectRowKey
        }
      }
      return {}
    },
    isCheckAuch() {
      if (this.isEdit || (this.$route && this.$route.params.id === 'preview')) {
        if (this.$route.query.isCheckAuth === 'true') {
          return true
        }
        return false
      }
      return true
    }
  },
  data() {
    return {
      showTable: true,
      tableSelect: [], // 选择列
      columns: [],
      list: [], // 展示数据
      localData: {}, // 独立接口的接口返回数据
      localQuery: { // 独立接口的搜索参数
        pageIndex: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  watch: {
    dataList: {
      handler(val) {
        this.formatList({ list: val, layout: this.item.layout })
      },
      immediate: true
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
    this.$nextTick(() => {
      // 初始化选择列
      this.tableThSelectInit(this.item.layout)
      // 初始化表格按钮控制
      this.initButtonStateRule(this.item.layout)
      // 注册全局的刷新接口
      this.$root.$on(`${this.item.id}GetList${this.item.isDialog || ''}`, this.getList)
      // 初始化表格
      if (this.item.optionsType === 1 && !this.item.offInitialStart) {
        this.$root.$on(`${this.item.id}Search${this.item.isDialog || ''}`, this.localSearch)
        // 判断是否含有搜索组件，有搜索组件不自己执行请求
        const hasSearch = Object.keys(this.idModule).find((item) => {
          if (/^Search/.test(item) && this.idModule[item].isDialog === this.item.isDialog) {
            return true
          }
          return false
        })
        // 判断不存在搜索组件 或 搜索组件内指定组件不包含自己
        if (!hasSearch 
          || (Array.isArray(this.idModule[hasSearch].searchTarget) && this.idModule[hasSearch].searchTarget.indexOf(this.item.id) === -1)) {
          // 表格初始化
          this.queryApi()
        } else {
          // 发起搜索组件的搜索初始化
          this.$root.$emit(`SearchSubmit${this.item.isDialog || ''}`)
        }
      }
    })
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
    this.$root.$off(`${this.item.id}GetList${this.item.isDialog || ''}`)
    this.$root.$off(`${this.item.id}Search${this.item.isDialog || ''}`)
  },
  methods: {
    /**
     * @method: 本页面内的独立接口数据获取
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 14:46:46
     */
    queryApi(query = {}) {
      // 编辑状态不执行接口
      if (this.isEdit) {
        return
      }
      // 混入合并搜索的值
      Object.assign(this.localQuery, query)
      // 判断属于独立接口类型且参数齐全
      if (this.item.optionsType === 1 && this.item.key && this.item.totalKey) {
        const { 
          url, 
          type, 
          requestQuery,
          option 
        } = apiResolver(this.item.apiUrl)
        const data = { ...requestQuery, ...this.pageQuery, ...query }
        // 删除total字段
        delete data.total
        // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
        useCodeEvent(this.item, 'componentBeforeSend', this)(data, this.item, this.$store.getters['manage/idModule'])
        // 执行http请求
        httpAgent[type](url, data, { 
          context: this, 
          noAuth: true, 
          preview302: true, 
          ...option 
        }).then((res) => {
          // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
          useCodeEvent(this.item, 'componentAfterSend', this)(res.data, this.item, this.$store.getters['manage/idModule'])
          // 当数据返回为null 的保险处理
          this.localData = res.data || {}
          this.localQuery.total = res.data[this.item.totalKey] || 1
          this.total = res.data[this.item.totalKey] || 1
        }).catch(() => {
          this.localData = {}
        })
      }
    },
    /**
     * @method: 本地搜索接收方法，搜索组件指定组件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 14:49:18
     */
    localSearch({ query, reset }) {
      // 重置搜索参数
      if (reset) {
        this.localQuery = {
          pageIndex: 1,
          pageSize: 10
        }
      } else {
        // 重新搜索，保留本页面的分页信息
        this.localQuery = {
          pageIndex: 1,
          pageSize: this.localQuery.pageSize
        }
      }
      // 执行查询接口
      this.queryApi(query)
    },
    /**
     * @method: 表格多选点击事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-08 14:56:19
     */
    handleSelectionChange(val) {
      this.tableSelect = val
    },
    /**
     * @description: 自定义值的数值处理
     * @param {type} 
     * @return: 
     */
    formatList({ list, layout }) {
      // 将有需要处理的值单独拿出来
      const layoutFormat = {}
      const handleList = []
      // 拿到所有值处理成map结构
      layout.forEach((item) => {
        if (item.formatValue) {
          layoutFormat[item.key] = item.formatValue
        }
        // HACK: 这个是方案是否决的，执行字符串转js 支持字段加减等等
        // if (item.newFormatValue) {
        //   layoutFormat[`${item.key}11`] = item.newFormatValue
        // }
      })
      list.forEach((item) => {
        const data = { ...item }
        Object.keys(layoutFormat).forEach((key) => {
          // 处理值 增加到新字段上
          this.$set(data, `${key}__format`, this.getTextRender(layoutFormat[key], data).replace(/\n/g, '<br>') || '-')
          // HACK: 这个是方案是否决的，执行字符串转js 支持字段加减等等
          // this.$set(data, `${key}__new`, this.newGetTextRender(layoutFormat[key], data))
        })
        handleList.push(data)
      })
      this.$set(this, 'list', handleList)
    },
    /**
     * @Date: 2019-11-07 16:42:29
     * @method: HACK: 这个是方案是否决的，执行字符串转js 支持字段加减等等
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    // newGetTextRender(template, context) {
    //   // eslint-disable-next-line
    //   const data = context
    //   console.log('template', template, context)
    //   // eslint-disable-next-line
    //   console.log(eval(template))
    //   // console.log(template, context)
    // },
    /**
     * @method: 字符串模板替换
     * @param template{String} 字符串
     * @param context{Object} 字段
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-05-22 11:05:50
     */
    // 字段值处理
    getTextRender(template, context) {
      return getTextRender(template, context)
    },
    /**
     * @method: 获取列表数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 17:42:31
     */
    getList(query = {}) {
      const that = this
      if (that.item.optionsType === 1) {
        that.queryApi(query)
      } else if (that.item.optionsType === 2) {
        that.$root.$emit(`pageGetData${that.item.isDialog || ''}`, { query, type: 'page' })
      }
    },
    /**
     * @method: 选择列初始化
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-09-04 18:29:32
     */
    tableThSelectInit(layout = []) {
      if (!this.item.tableThSelect) return
      const columns = []
      if (this.item.tableSelect === 1) {
        columns.push({
          label: '选择',
          key: 'selection',
          show: true,
          showDisabled: true,
          moveDisabled: true
        })
      }
      layout.forEach(item => columns.push({
        label: item.label,
        key: item.key || item.type,
        show: true,
        moveDisabled: item.type === 'action'
      }))
      this.columns = columns
      this.$nextTick(() => {
        this.$refs.tableSelect.init()
      })
    },
    /**
     * @method: 分页组件 - 切换页码 pageIndex
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-18 18:02:48
     */
    handleCurrentChange(value) {
      if (this.item.optionsType === 1) {
        // 独立接口
        this.pageQuery.pageIndex = value
      } else {
        // 页面接口
        this.query.pageIndex = value
      }
      this.getList(this.pageQuery)
    },
    /**
     * @method: 分页组件 - 切换每页数量 pageSize
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-18 18:02:55
     */
    handleSizeChange(value) {
      if (this.item.optionsType === 1) {
        // 独立接口
        this.pageQuery.pageSize = value
      } else {
        // 页面接口
        this.query.pageSize = value
      }
      this.getList(this.pageQuery)
    }
  }
}
</script>
<style lang="less">
  @import './Preview.less';
</style>
