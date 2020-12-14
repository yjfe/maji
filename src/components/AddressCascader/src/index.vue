<!-- 
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-03-12 10:31:12
 * @LastEditTime: 2020-12-09 14:52:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <ElCascader
      class="address-cascader"
      ref="cascader"
      v-bind="$attrs"
      v-model="myValue"
      :props="cascaderProps"
      :options="optionsTree"
      @change="handleChange"
    />
  </div>
</template>

<script>
import * as http from '@/utils/http'
import dispatch from '@/mixins/dispatch'

export default {
  name: 'EAddressCascader',
  mixins: [dispatch],
  props: {
    /**
     * @prop {Number} grade 省市区级别 1省 2市 3区 4县
     */
    grade: {
      // 1省 2市 3区 4县
      type: Number,
      default: 4
    },
    /**
     * @prop {String} action 省市区接口地址
     */
    action: {
      // 接口地址
      required: false,
      default: '/fmsloanadmin/admin/supplier/basic/info/address'
    },
    /**
     * @prop {String} valueKey 省市区接口请求结果value参数名
     */
    valueKey: {
      // 请求参数的key
      required: false,
      default: 'code'
    },
    /**
     * @prop {String} dataKey 省市区接口请求结果data（返回值）参数名 默认 data
     */
    dataKey: {
      // 接口返回的data的key
      required: false,
      default: 'data'
    },
    /**
     * @prop {Array} value 省市区接口请求结果data（返回值）参数名 默认 data
     */
    value: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * @prop {Boolean} world 是否开启国际地址 默认false
     */
    world: {
      // 国际地址
      type: Boolean,
      default: false
    },
    /**
     * @prop {Object} props element-ui级联下拉框的扩展配置
     */
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {Boolean} validateEvent 是否触发表单校验
     */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler(val) {
        if (Array.isArray(val) && val.length > 0 && val.toString() !== this.myValue.toString()) {
          if (this.optionsTree.length === 0) {
            this.initOption().then(() => {
              this.getValueOption(val)
            })
          } else {
            this.getValueOption(val)
          }
        }
        this.myValue = val
      },
      immediate: true
    }
  },
  computed: {
    text() {
      this.$emit('update:presentText', this.$refs.cascader.presentText)
      return this.$refs.cascader.presentText
    }
  },
  data() {
    const self = this
    return {
      optionsTree: [],
      myValue: [],
      cascaderProps: Object.assign(
        {
          lazy: true,
          lazyLoad(node, resolve) {
            const { value, level } = node
            if (value === undefined) return
            self.getOptions(value, level).then((res) => {
              resolve(res.data)
            })
          }
        },
        { ...this.props }
      )
    }
  },
  mounted() {
    if (this.value.length === 0) {
      this.initOption()
    }
  },
  methods: {
    /**
     * @method: 组件初始化
     * @return {Promise} Promise function
     */
    initOption() {
      return new Promise((require, reject) => {
        const code = this.world ? -1 : 0
        if (code === undefined) reject()
        this.getOptions(code).then((res) => {
          if (res && Array.isArray(res.data)) {
            this.$set(this, 'optionsTree', res.data)
            require()
          } else {
            reject()
          }
        })
      })
    },
    /**
     * @method: 根据value值逐级请求获取数据
     * @param {Array} arr value值
     * @param {Number} num 层级
     */
    getValueOption(arr, num = 0) {
      this.setOptionsChildren(arr[num], arr)
        .then(() => {
          if (arr.length > ++num) {
            this.getValueOption(arr, num)
          } else {
            this.optionsTree = [...this.optionsTree]
          }
        })
        .catch(() => this.optionsTree)
    },
    /**
     * @method: 获取接口信息
     * @param {Number} code 地址code
     * @param {Number} level 省市区层级
     * @return {Promise} rxjs function 请求接口方法
     */
    getOptions(code, level = 0) {
      const data = {}
      data[this.valueKey] = code
      return new Promise((resolve) => {
        http.GET(this.action, data, { cache: 60 }).then((res) => {
          res.data.map((item) => {
            item.label = item.name || item.label
            item.value = `${(item.code || item.value)}`
            item.leaf = this.grade - 1 <= level
            delete item.name
            delete item.code
            return item
          })
          resolve(res)
        }).catch(() => ({ [this.valueKey]: [] }))
      })
    },
    /**
     * @method: 设置子类数据
     * @param {value} value 当前处理的code
     * @param {arr} arr 当前选择的value
     * @return {Promise} Promise function 层级处理
     */
    setOptionsChildren(value, arr) {
      return new Promise(async (resolve, reject) => {
        // console.log('start', value)
        if (value === undefined) {
          reject()
        }
        if (this.optionsTree.length === 0) {
          await this.initOption()
        }
        const findItem = this.findOptionItem(value)
        if (!findItem || (findItem && findItem.children && findItem.children.length > 0) || findItem.leaf) {
          resolve(true)
          return
        }
        const mapArr = arr || this.myValue
        this.getOptions(value, mapArr.indexOf(value) + 1).then((res) => {
          findItem.children = res.data
          // console.log('setData', value, this.optionsTree)
          resolve(true)
        })
      })
    },
    /**
     * @method: 查找code对应的对象
     * @param {Number} code 地址code
     */
    findOptionItem(code) {
      function findeArray(arr) {
        arr.forEach((item) => {
          if (item.value === code) {
            throw item
          } else if (item.children) {
            findeArray(item.children)
          }
        })
      }
      try {
        findeArray(this.optionsTree)
      } catch (error) {
        if (error.value) {
          return error
        }
      }
    },
    /**
     * @method: cascader 组件 change事件
     * @param {Array} value 省市区code array
     */
    handleChange(value) {
      setTimeout(() => {
        this.setParentValue(value)
      }, 0)
    },
    /**
     * @method: 向父组件传选中值
     * @param {Array} value 省市区code array
     */
    setParentValue(value) {
      /**
       * @description: 值的变化后的回调
       * @param {Array} value code数组
       */
      this.$emit('input', value)
      /**
       * @description: 值的变化后的回调
       * @param {Array} value code数组
       */
      this.$emit('change', value)
      /**
       * @description: 值的变化后的回调
       * @param {Array} value code名称数组
       */
      this.$emit('update:presentText', this.$refs.cascader.presentText)
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', [value])
        this.dispatch(this, 'ElFormItem', 'el.form.blur', [value])
      }
    }
  }
}
</script>
<style lang="less" scoped>
.address-cascader {
  width: 300px;
}
</style>
