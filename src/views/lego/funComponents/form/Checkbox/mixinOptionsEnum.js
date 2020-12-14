/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-29 10:55:24
 * @LastEditTime: 2020-12-01 14:15:39
 * @LastEditors: Please set LastEditors
 */

import { mapState } from 'vuex'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { useCodeEvent } from '@/views/lego/utils'

export default {
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit
    }),
    options() {
      return this.item.optionsType === 1 ? this.apiOptions : this.item.options
    }
  },
  data() {
    return {
      apiOptions: []
    }
  },
  mounted() {
    // 值的转换
    this.mapperValue()
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.query, this.item, this.$store.getters['manage/idModule'])
    // 获取接口枚举数据，解析转换
    if (!this.isEdit) {
      this.getOptions()
    }
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  methods: {
    /**
     * @method: value映射值转化，number或string类型
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-28 10:40:33
     */
    mapperValue() {
      if (this.item.optionsType === 2) {
        if (Array.isArray(this.item.value)) {
          try {
            const arr = []
            this.item.value.forEach(item => arr.push(this.getValue(item)))
            // 处理value的转换
            this.$set(this.item, 'value', arr)
          } catch (error) {
            console.log(error)
          }
        } else {
          // 处理value的转换
          this.$set(this.item, 'value', this.getValue(this.item.value))
        }
        // 处理数据源
        this.$set(this.item, 'options', this.item.options.map(item => ({
          label: item.label,
          value: this.getValue(item.value)
        })))
      }
    },
    // 数字 、 字符串 类型转化
    getValue(value) {
      if (!value && value !== 0) return ''
      try {
        if (this.item.valueType === 'number') {
          const num = parseInt(value, 10)
          return Number.isNaN(num) ? value : num
        }
        return value.toString()
      } catch (_) {
        return ''
      }
    },
    /**
     * @method: 接口获取数据或数字类型处理
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-28 10:40:51
     */
    getOptions() {
      if (this.item.optionsType === 1 && this.item.valueKey && this.item.labelKey && this.item.apiUrl) {
        const { 
          url, 
          type, 
          requestQuery, 
          option 
        } = apiResolver(this.item.apiUrl)
        const httpParams = { ...requestQuery }
        // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
        useCodeEvent(this.item, 'componentBeforeSend', this)(httpParams, this.item, this.$store.getters['manage/idModule'])
        httpAgent[type](url, httpParams, { 
          context: this, 
          noAuth: true, 
          cache: 6000, 
          preview302: true,
          ...option 
        }).then((res) => {
          // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
          useCodeEvent(this.item, 'componentAfterSend', this)(res.data, this.item, this.$store.getters['manage/idModule'])

          let dataEnum = []
          if (this.item.dataKey) {
            dataEnum = res.data[this.item.dataKey]
          } else {
            dataEnum = res.data
          }
          if (!Array.isArray(dataEnum)) {
            throw new Error(`配置错误：枚举数据类型错误 -> ${this.item.id}，`)
          }
          
          this.apiOptions = dataEnum.map(item => (
            {
              label: item[this.item.labelKey],
              value: item[this.item.valueKey]
            }
          ))
        }).catch(() => {
          this.item.options = []
        })
      } else if (this.item.optionsType === 2 && this.item.valueType === 'number') {
        this.item.options.forEach((item) => {
          try {
            const num = parseInt(item.value, 10)
            this.$set(item, 'value', Number.isNaN(num) ? item.value : num)
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.log(error)
            }
          }
          return item
        })
      }
    },
    handleChange() {
    }
  }
}
