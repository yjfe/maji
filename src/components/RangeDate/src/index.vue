<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-11-05 14:19:43
 * @LastEditTime: 2020-11-08 10:21:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="range-date">
    <el-date-picker
      v-model="start"
      v-bind="$attrs"
      :placeholder="startPlaceholder"
      :picker-options="{ disabledDate: startPickerOption }"
      valueFormat="timestamp"
      :clearable="false"
      :format="format"
      @change="handleChangeStart"
    >
    </el-date-picker>
    <span class="Separator">{{ rangeSeparator }}</span>
    <el-date-picker
      v-model="end"
      v-bind="$attrs"
      :placeholder="endPlaceholder"
      :picker-options="{ disabledDate: endPickerOption }"
      valueFormat="timestamp"
      :clearable="false"
      :format="format"
      @change="handleChangeEnd"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  componentName: 'RangeDate',
  props: {
    /**
     * @prop {String} format 显示格式转换 默认: yyyy-MM-dd HH:mm:ss
     */
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    /**
     * @prop {Date, String, Number} startTime 开始时间  默认: false
     */
    startTime: {
      type: [Date, String, Number]
    },
    /**
     * @prop {Date, String, Number} endTime 结束时间  默认: false
     */
    endTime: {
      type: [Date, String, Number]
    },
    /**
     * @prop {Boolean} validateEvent 触发表单校验  默认: true
     */
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {String} startPlaceholder 开始时间文本自定义  默认: '开始时间'
     */
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    /**
     * @prop {String} endPlaceholder 结束时间文本自定义  默认: '结束时间'
     */
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    /**
     * @prop {String} rangeSeparator 间隔符自定义  默认: '~'
     */
    rangeSeparator: {
      type: String,
      default: '~'
    },
    /**
     * @prop {Date} disabledStart 最小选择时间禁用
     */
    disabledStart: {
      type: Date
    },
    /**
     * @prop {Date} disabledEnd 最大选择时间禁用
     */
    disabledEnd: {
      type: Date
    },
    /**
     * @prop {String} valueFormat value转换
     */
    valueFormat: {
      type: String
    }
  },
  watch: {
    startTime() {
      this.start = typeof this.startTime === 'string' ? new Date(this.startTime) : this.startTime
    },
    endTime() {
      this.end = typeof this.endTime === 'string' ? new Date(this.endTime) : this.endTime
    }
  },
  data() {
    return {
      start: this.startTime && typeof this.startTime === 'string' ? new Date(this.startTime) : this.startTime || '',
      end: this.endTime && typeof this.endTime === 'string' ? new Date(this.endTime) : this.endTime || '',
      startPickerOption: (item) => {
        if (this.end || this.disabledStart || this.disabledEnd) {
          let startDisabled = false
          let endDisabled = false
          let endTimeDisabled = false
          if (this.disabledStart) {
            startDisabled = item < this.disabledStart - 3600 * 23 * 1000
          }
          if (this.disabledEnd) {
            endDisabled = item > this.disabledEnd
          }
          if (this.end) {
            endTimeDisabled = item > this.end
          }
          return startDisabled || endDisabled || endTimeDisabled
        }
        return false
      },
      endPickerOption: (item) => {
        if (this.start || this.disabledStart || this.disabledEnd) {
          let startDisabled = false
          let endDisabled = false
          let startTimeDisabled = false
          if (this.disabledStart) {
            startDisabled = item < this.disabledStart - 3600 * 23 * 1000
          }
          if (this.disabledEnd) {
            endDisabled = item > this.disabledEnd
          }
          if (this.start) {
            startTimeDisabled = item <= this.start - 24 * 3600 * 1000
          }
          return startDisabled || endDisabled || startTimeDisabled
        }
        return false
      }
    }
  },
  methods: {
    handleChangeStart(value) {
      if (value) {
        if (value > this.end && this.end) {
          value = this.end
          this.start = this.end
        }
        if (this.disabledStart) {
          if (value < this.disabledStart) {
            value = this.disabledStart
            this.start = this.disabledStart
          }
        }
      }
      value = this.FormatDate(value, this.valueFormat)
      /**
       * @description: 更新开始时间
       * @param {Date, String, Number} value 时间
       */
      this.$emit('update:startTime', value)
      this.handleValidateEvent(value)
    },
    handleChangeEnd(value) {
      if (value) {
        if (value < this.start && this.start) {
          value = this.start
          this.end = this.start
        }
        if (this.disabledStart) {
          if (value < this.disabledStart) {
            value = this.disabledStart
            this.start = this.disabledStart
          }
        }
      }
      value = this.FormatDate(value, this.valueFormat)
      /**
       * @description: 更新结束时间
       * @param {Date, String, Number} value 时间
       */
      this.$emit('update:endTime', value)
      this.handleValidateEvent(value)
    },
    handleValidateEvent(value) {
      this.$emit('input', [this.start, this.end]).$emit('blur', [this.start, this.end])
      /**
       * @description: 数据改变回调
       * @param {Array} value 时间范围
       */
      this.$emit('change', [this.start, this.end])
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch(this, 'ElFormItem', 'el.form.change', [value])
        this.dispatch(this, 'ElFormItem', 'el.form.blur', [value])
      }
    },
    dispatch(context, componentName, eventName, params) {
      let parent = context.$parent || context.$root
      let name = parent.$options.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        // eslint-disable-next-line prefer-spread
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    FormatDate(date, type) {
      if (!date) return ''
      if (type === 'timestamp') return date
      date = typeof date === 'number' ? new Date(date) : date
      type = type || 'yyyy-MM-dd HH:mm:ss'
      const obj = {
        y: date.getFullYear(), // 年份，注意必须用getFullYear
        M: date.getMonth() + 1, // 月份，注意是从0-11
        d: date.getDate(), // 日期
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
        w: date.getDay(), // 星期，注意是0-6
        H: date.getHours(), // 24小时制
        h: date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 12小时制
        m: date.getMinutes(), // 分钟
        s: date.getSeconds(), // 秒
        S: date.getMilliseconds() // 毫秒
      }
      const week = ['天', '一', '二', '三', '四', '五', '六']
      for (const i in obj) {
        type = type.replace(new RegExp(`${i}+`, 'g'), (m) => {
          let val = `${obj[i]}`
          if (i === 'w') return (m.length > 2 ? '星期' : '周') + week[val]
          for (let j = 0, len = val.length; j < m.length - len; j++) val = `0${val}`
          return m.length === 1 ? val : val.substring(val.length - m.length)
        })
      }
      return type
    }
  }
}
</script>
<style lang="less" scoped>
.range-date {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 185px;
  }
}
.Separator {
  padding: 0 4px;
}
</style>
