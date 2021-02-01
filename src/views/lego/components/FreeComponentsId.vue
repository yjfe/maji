<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-21 10:34:26
 * @LastEditors: Please set LastEditors
 -->
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import manageJson from '@/views/lego/funComponents/manage.json'
import { getComponentFile } from '@/views/lego/utils'

export default {
  name: 'FreeComponentsId',
  componentName: 'FreeComponentsId',
  render(h) {
    if (!this.isEdit) {
      // 校验渲染逻辑
      if (!this.checkRenderRule()) return
    }
    // 输出组件
    return h(
      `Preview${this.nowItem.type}`,
      {
        key: this.nowItem.id,
        props: {
          ...this.$attrs,
          item: this.nowItem,
          index: this.index,
          pageData: this.pageData,
          parentData: this.parentData
        },
        on: this.$listeners
      }
    )
  },
  props: {
    moduleId: String,
    index: Number,
    itemData: Object,
    parentData: Object,
    pageData: Object
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo,
      nowItem: {},
      relationalRule: ''
    }
  },
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit,
      idModule: state => state.manage.idModule,
      quoteIdModule: state => state.manage.quoteIdModule
    })
  },
  created() {
    this.nowItem = this.itemData || this.idModule[this.moduleId] || this.quoteIdModule[this.moduleId]
    if (!Vue.component(`Preview${this.nowItem.type}`)) {
      Vue.component(`Preview${this.nowItem.type}`, getComponentFile(this.nowItem.type, 'Preview'))
    }
  },
  methods: {
    // 校验渲染判断
    checkRenderRule() {
      if (this.nowItem.renderRule) {
        try {
          // eslint-disable-next-line no-eval
          if (!eval(this.nowItem.renderRule)) return false
        } catch (error) {
          console.error(error, `组件 ${this.moduleId} 渲染逻辑编码错误 \n ${this.nowItem.renderRule}`)
          return false
        }
      }
      return true
    }
  }
}
</script>
