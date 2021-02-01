/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-29 10:55:24
 * @LastEditTime: 2020-12-21 14:19:03
 * @LastEditors: Please set LastEditors
 */
export default {
  data() {
    return {
      pickerOptions: []
    }
  },
  methods: {
    initQuickSelect() {
      // 不可多选时候禁用计算
      if (!this.item.isRange || !this.typeEnum[this.item.valueFormat].hasRange) return
      if (this.item.quickSelect && Array.isArray(this.item.quickSelect)) {
        const shortcuts = this.item.quickSelect
          .sort((a, b) => a - b)
          .map(item => ({
            text: `最近${item}天`,
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * item)
              picker.$emit('pick', [start, end])
            }
          }))
        if (shortcuts.length > 0) {
          this.pickerOptions = { shortcuts }
        }
      }
    }
  }
}
