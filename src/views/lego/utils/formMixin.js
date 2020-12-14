
export default {
  props: {
    // 表单数据对象
    parentData: {
      type: [Array, Object],
      default: () => ({})
    },
    parentKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      propKey: `${this.parentKey || ''}${this.parentKey ? '.' : ''}${this.item.key}`
    }
  },
  methods: {
    // input操作
    mHandelInput(value) {
      if (this.$store.getters['manage/isEdit']) {
        this.$set(this.item, 'value', value)
      } else {
        this.$set(this.parentData, this.item.key, value)
      }
    }
  },
  computed: {
    // 用于显示的value
    mValue() {
      if (this.$store.getters['manage/isEdit']) {
        return this.item.value
      }
      return this.parentData[this.item.key]
    }
  },
  created() {
    if (!this.$store.getters['manage/isEdit'] 
      && this.parentData[this.item.key] === undefined
      && this.item.key) {
      // 引用类型数据需要深拷贝
      if (typeof this.item.value === 'object') {
        const data = JSON.parse(JSON.stringify(this.item.value))
        this.$set(this.parentData, this.item.key, data)
      } else {
        this.$set(this.parentData, this.item.key, this.item.value)
      }
    }
  }
}
