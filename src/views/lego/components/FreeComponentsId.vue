<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-07 17:00:35
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
      // 兼容版本 旧版的关联关系处理
      if (!this.relationalShow()) return
    }
    // 输出组件
    return h(
      `Preview${this.nowItem.type}`,
      {
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
    this.getRelationalRule()
  },
  methods: {
    // 校验渲染判断
    checkRenderRule() {
      if (this.nowItem.renderRule) {
        try {
          // eslint-disable-next-line no-eval
          if (!eval(this.nowItem.renderRule)) return false
        } catch (error) {
          console.error(`组件 ${this.moduleId} 渲染逻辑编码错误 \n ${this.nowItem.renderRule}`)
          return false
        }
      }
      return true
    },
    // 解析枚举
    getRelationalRule() {
      const ruleEnums = {
        and: '&&',
        or: '||'
      }
      let ruleStr = ''
      if (!this.nowItem.relational) {
        return
      }
      this.nowItem.relational.forEach((item, index) => {
        const rule = item.rule || 'and'
        // 将或转成多字段处理
        const str = `'${item.id}'=='${item.value}'`
          .replace(/(\s*\|\|\s*)/g, '||')
          .replace(/(\|\|)/g, `||'${item.id}'=='`)
          .replace(/(=='!)/g, '!=\'')
        ruleStr += `${index > 0 ? ruleEnums[rule] : ''}(${str})`
      })
      this.relationalRule = ruleStr
    },
    // 关联关系 - 显示隐藏控制值
    relationalShow() { 
      // 兼容版本 控制渲染旧的规则
      let ruleStr = this.relationalRule
      if (!ruleStr) {
        return true
      }
      try {
        let show = true
        // eslint-disable-next-line
        this.nowItem.relational.forEach((item) => {
          const { value } = this.idModule[item.id]
          ruleStr = ruleStr.replace(new RegExp(`('${item.id}')`, 'g'), `'${value}'`)
        })
        // eslint-disable-next-line
        if (!eval(ruleStr)) {
          show = false
        }
        return show
      } catch (error) {
        // console.log(error)
        return true
      }
    }
  }
}
</script>
