<template>
  <div class="detail-charts-preview" :style="`height:${item.height}px`">
    <div v-if="isEdit" class="default-text">图表占位</div>
    <div v-else :ref="`chart${item.key}`" :style="`height:${item.height}px`"/>
    <div class="detail-charts-filter">
       <el-radio-group v-model="item.filterDefaultValue" size="mini" @change="handleChange">
        <el-radio-button v-for="(it, index) in item.filterOptions" :key="index" :label="it.value" >{{it.label}}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { colorRestore } from '@/utils'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { 
  legoRouterLink, 
  getActionQuery, 
  openQuoteDialog, 
  useCodeEvent
} from '@/views/lego/utils'

export default {
  name: 'DetailChartsPreview',
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit,
      idModule: state => state.manage.idModule
    })
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      dom: '',
      list: [],
      select: '',
      localQuery: {}
    }
  },
  watch: {
    pageData() {
      if (this.item.optionsType !== 1) {
        this.initChart()
      }
    }
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
    this.$nextTick(() => {
      if (!this.isEdit) {
        this.dom = window.echarts.init(this.$refs[`chart${this.item.key}`])
        // 挂载全局事件
        this.$root.$on(`${this.item.id}Search${this.item.isDialog || ''}`, this.localSearch)
        // 判断是否含有搜索组件，有搜索组件不自己执行请求
        const hasSearch = Object.keys(this.idModule).find((item) => {
          if (/^Search/.test(item) && this.idModule[item].isDialog === this.item.isDialog) {
            return true
          }
          return false
        })
        // 判断不存在搜索组件 或 搜索组件内指定组件不包含自己
        if (!hasSearch || this.idModule[hasSearch].searchTarget.indexOf(this.item.id) === -1) {
          // 表格初始化
          this.initChart()
        } else if (this.item.optionsType === 1) {
          this.$root.$emit(`SearchSubmit${this.item.isDialog || ''}`)
        }
      }
    })
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
    this.$root.$off(`${this.item.id}Search${this.item.isDialog || ''}`)
  },
  methods: {
    /**
     * @method: 搜索组件发起全局通知 - 指定组件搜索
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 18:41:36
     */
    localSearch({ query }) {
      this.initChart(query)
    },
    /**
     * @method: 初始化
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-10-17 18:41:49
     */
    async initChart(query) {
      await this.getOptions(query)
      this.getAxisData(this.list)
    },
    /**
     * @method: 获取接口数据或本地数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-28 17:45:20
     */
    getOptions(query) {
      return new Promise((resolve) => {
        // 请求参数混合
        // 获取筛选字段的值
        const formData = { ...this.query, ...query }
        if (this.item.chartSendKey) {
          formData[this.item.chartSendKey] = this.item.filterDefaultValue
        }
        this.localQuery = formData
        // eslint-disable-next-line
        const self = this
        // 判断属于独立接口
        if (this.item.optionsType === 1 && this.item.apiUrl) {
          // 解析url
          const { 
            url, 
            type, 
            requestQuery, 
            option 
          } = apiResolver(this.item.apiUrl)
          const httpParams = { ...requestQuery, ...formData }
          // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
          useCodeEvent(this.item, 'componentBeforeSend', this)(httpParams, this.item, this.$store.getters['manage/idModule'])
          httpAgent[type](url, httpParams, { 
            context: this, 
            noAuth: true, 
            preview302: true, 
            ...option 
          }).then((res) => {
            // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
            useCodeEvent(this.item, 'componentAfterSend', this)(res.data, this.item, this.$store.getters['manage/idModule'])
            this.list = this.item.key ? res.data[this.item.key] : res.data
            resolve()
          }).catch(() => {
            this.list = []
            resolve()
          })
        } else {
          try {
            // eslint-disable-next-line
            this.list = eval(`self.pageData.${this.item.key}`) || this.item.value || []
          } catch (error) {
            this.list = []
          }
          resolve()
        }
      })
    },
    /**
     * @method: 数据结构处理，解析横纵坐标数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-28 17:09:16
     */
    getAxisData(list = []) {
      const { 
        tooltip,
        title,
        legend,
        xAxis,
        yAxis,
        series,
        dataZoom
      } = this.getInitData()
      list.forEach((item) => {
        xAxis.data.push(item[xAxis.key])
        series.forEach((sItem) => {
          const symbol = sItem.type === 'line' ? (sItem.lineStyle.symbol || null) : null
          sItem.data.push({
            value: item[sItem.key],
            name: item[xAxis.key],
            symbol
          })
        })
        // series.forEach(sItem => sItem.data.push(item[sItem.key]))
      })
      const option = {
        title,
        tooltip,
        legend,
        series
      }
      // 图形方向的处理 图形纵向
      if (this.item.direction) {
        // 纵向
        Object.assign(option, { 
          xAxis: yAxis, 
          yAxis: xAxis
        }) 
      } else {
        // 横向
        Object.assign(option, { xAxis, yAxis }) 
      }
      if (this.item.hasDataZoom === 2) {
        // 智能模式 数据量大于50自动添加缩放
        if (list.length > 50) {
          Object.assign(option, { dataZoom }) 
        }
      } else if (this.item.hasDataZoom === 1) {
        // 默认添加缩放
        Object.assign(option, { dataZoom }) 
      }
      console.log(option)
      this.createChart(option)
    },
    /**
     * @method: 初始化配置数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-28 17:44:13
     */
    getInitData() {
      const tooltip = {
        trigger: 'axis'
      }
      const title = {
        text: this.item.label
      }
      const legend = {
        data: [],
        top: 30,
        bottom: 20
      }
      const xAxis = {
        type: 'category',
        name: this.item.xName,
        data: [],
        key: this.item.xKey
      }
      const yAxis = {
        type: 'value',
        name: this.item.yName
      }
      const series = []
      this.item.yOptions.forEach((item) => {
        legend.data.push(item.label)
        const data = {
          name: item.label,
          key: item.value,
          type: item.chartType,
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
        // 线形特殊处理
        if (item.chartType === 'line') {
          // 线图的处理，线颜色、标记、线条类型设置
          Object.assign(data, {
            lineStyle: {
              symbol: typeof item.symbolType === 'string' ? item.symbolType : null,
              type: item.lineStyle,
              color: item.color
            }
          })
          // areaStyle 面积图的特殊处理
          if (item.isArea) {
            // 将颜色值解析成三原色值
            const colorRgba = colorRestore(item.color).join(',')
            Object.assign(data, {
              areaStyle: {
                // 透明度30%
                color: `rgba(${colorRgba}, 0.3)`
              }
            })
          }
        } else if (item.chartType === 'bar') {
          // 柱状图的处理，边框色透明
          Object.assign(data, {
            itemStyle: {
              color: item.color,
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          })
        }
        if (item.hasApices) {
          Object.assign(data, {
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          })
        }
        series.push(data)
      })
      const dataZoom = [
        {
          id: 'dataZoomX',
          type: 'slider',
          filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
          start: 0,
          end: 50
        }
      ]
      return {
        tooltip,
        title,
        legend,
        xAxis,
        yAxis,
        series,
        dataZoom
      }
    },
    createChart(option) {
      this.$nextTick(() => {
        this.dom.setOption(option)
        this.addClickEventToItem()
      })
    },
    /**
     * @Date: 2019-11-19 11:53:36
     * @method: 快捷搜索 - 单选框切换
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleChange() {
      this.getOptions(this.localQuery)
    },
    /**
     * @Date: 2019-11-19 18:27:51
     * @method: 给图表绑定点击事件
     * @param {type} 
     * 
     * @LastEditTime: 
     * @LastEditors: Please set LastEditors
     */
    addClickEventToItem() {
      this.dom.on('click', (params) => {
        // 找到配置属性
        const clickOption = this.item.yOptions.find(item => params.seriesName === item.label) || {}
        const listItem = this.list.find(item => item[clickOption.value] === params.data.value)
        // 找到当前行数据
        if (listItem) {
          const query = Object.assign({}, getActionQuery(clickOption.query, listItem))
          switch (clickOption.handleType) {
            case 'link':
              this.actionLink(clickOption, query)
              break
            case 'dialog':
              this.actionDialog(clickOption, query)
              break
            default:
              break
          }
        }
      })
    },
    actionLink(clickOption, query = {}) {
      const { url, requestQuery } = apiResolver(clickOption.url)
      legoRouterLink(url, clickOption.openType, Object.assign(requestQuery, query))
    },
    actionDialog(clickOption, query) {
      openQuoteDialog({
        id: clickOption.quotePageId,
        width: clickOption.dialogWidth,
        query
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail-charts-preview{
  width: 100%;
  display: table;
  padding: 5px;
  position: relative;
  .default-text{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 100%;

  }
  .detail-charts-filter{
    position: absolute;
    right: 20px;
    top: 0px;
  }
}
</style>
