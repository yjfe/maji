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
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { 
  legoRouterLink, 
  getActionQuery, 
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
      this.getAxisData()
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
    getAxisData() {
      const { 
        tooltip,
        title,
        legend,
        xAxis,
        yAxis,
        series 
      } = this.getInitData()
      this.list.forEach((item) => {
        xAxis.data.push(item[xAxis.key])
        series.forEach(sItem => sItem.data.push({
          value: item[sItem.key],
          name: item[xAxis.key]
        }))
        // series.forEach(sItem => sItem.data.push(item[sItem.key]))
      })
      const option = {
        title,
        tooltip,
        legend,
        series
      }
      if (this.item.chartType === 'pie') {
        // 是饼状图的特殊处理
        Object.assign(option.tooltip, { 
          trigger: 'item', 
          formatter: '{a} <br/>{b} : {c} ({d}%)' 
        })
        Object.assign(option.legend, { data: xAxis.data })
        const len = option.series.length
        const chunk = parseInt(60 / len, 10)
        option.series.map((item, index) => {
          index++
          const start = index === 1 ? 0 : chunk * (index - 1)
          const end = chunk * index
          item.radius = [`${(start + end) / 2}%`, `${end}%`]
          if (index === 1) {
            Object.assign(item, {
              radius: [0, `${end}%`],
              selectedMode: 'single',
              label: {
                normal: {
                  position: 'inner'
                }
              }
            })
          }
          return item
        })
      } else {
        Object.assign(option, { xAxis, yAxis }) 
      }
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
        series.push({
          name: item.label,
          key: item.value,
          type: this.item.chartType,
          data: [],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        })
      })
      return {
        tooltip,
        title,
        legend,
        xAxis,
        yAxis,
        series
      }
    },
    createChart(option) {
      this.$nextTick(() => {
        // console.log(option)
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
        const clickOption = this.item.yOptions.find(item => params.seriesName === item.label)
        if (clickOption && clickOption.handleType === 'link') {
          // 找到当前行数据
          const listItem = this.list.find(item => item[clickOption.value] === params.data.value)
          if (listItem) {
            const { url, requestQuery } = apiResolver(clickOption.url)
            legoRouterLink(url, clickOption.openType, Object.assign({}, requestQuery, getActionQuery(clickOption.query, listItem)))
          }
        }
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
