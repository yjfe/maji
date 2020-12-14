<template>
  <div>
    <template v-for="(item, index) in pagesModule.action">
      <el-button 
        :type="item.styles.color" 
        v-loading="loading" 
        :key="index" 
        v-if="getPageButtonAuth({ auth: item.props.auth, state: item.props.stateRule })"
        v-bind="item.type === 'submit' ? { 'native-type': 'submit'} : {}"
        @click.native.prevent="handleClickAction(item)">{{item.label}}</el-button>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import * as httpAgent from '@/utils/http'
import { 
  legoRouterLink, 
  getActionQuery, 
  openQuoteDialog 
} from '@/views/lego/utils'

export default {
  name: 'PageButton',
  computed: {
    ...mapState({
      pageButtonAuth: state => state.pageButtonAuth
    })
  },
  props: {
    pagesModule: {
      type: Object,
      default: () => ({})
    },
    query: {
      type: Object,
      default: () => ({})
    },
    pageData: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickAction(item) {
      switch (item.type) {
        case 'link':
          this.actionLink(item, { ...this.query, ...this.pageData })
          break
        case 'submit':
          this.actionSubmit(item)
          break
        case 'back':
          this.$router.go(-1)
          // window.history.go(-1)
          break
        case 'confirm':
          this.actionConfirm(item.props, { ...this.query, ...this.pageData })
          break
        case 'dialog':
          this.actionDialog(item.props, { ...this.query, ...this.pageData })
          break
        default:
          break
      }
    },
    // 事件解析 - 提交
    actionSubmit(item) {
      this.$emit('submit', item)
    },
    // 事件解析 - 跳转
    actionLink(option, query) {
      const data = getActionQuery(option.query, query)
      legoRouterLink(option.linkUrl, option.openType, data)
    },
    // 事件解析 - 弹出层
    actionDialog(option, query) {
      const data = getActionQuery(option.query, query)
      openQuoteDialog({
        width: option.dialogWidth,
        id: option.quotePageId,
        query: data,
        refresh: option.closeRefresh ? this.refresh : null
      })
    },
    // 事件解析 - 确认框
    actionConfirm(option, query) {
      if (option.confirmMsg) {
        this.$confirm(option.confirmMsg || '确定提交', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          const data = getActionQuery(option.query, query)
          this.confirmHttp(option, data)
        })
      } else {
        console.error('配置异常')
      }
    },
    // 确认按钮的请求
    confirmHttp(opitons, formData) {
      try {
        const { 
          url, 
          type, 
          requestQuery,
          option
        } = apiResolver(opitons.confirmApi)
        const data = { ...requestQuery, ...formData }
        httpAgent[type](url, data, { 
          successMsg: '操作成功', 
          noAuth: true, 
          preview302: true,
          ...option 
        }).then(() => {
          if (opitons.successGo) {
            // 成功页面跳转
            this.actionLink({
              linkUrl: opitons.successGo
            })
          } else if (this.pagesModule.isDialog) {
            // 弹出层内，触发外部接口重新渲染
            this.$parent.$emit('submitClose', opitons.closeRefresh)
          } else {
            // 非弹出层内的情况 刷新本页面
            window.location.reload() 
          }
        })
      } catch (error) {
        console.error('更新接口地址配置错误')
      }
    },
    // 按钮状态控制
    getPageButtonAuth({ auth, state }) {
      const data = { ...this.query, ...this.pageData }
      try {
        let isShow = true
        // 处理权限值
        if (auth && !this.pageButtonAuth[auth]) {
          return false
        }
        // 处理状态规则
        if (state) {
          // 在正则语句中插入值
          Object.keys(data).forEach((key) => {
            state = state.replace(new RegExp(`${key}([=||!])`, 'g'), `${data[key]}$1`)
          })
          // eslint-disable-next-line
          isShow = eval(state)
        }
        return isShow
      } catch (error) {
        console.log(error)
        return false
      }
    },
    // 刷新父级的数据
    refresh(data) {
      this.$emit('refresh', data)
    }
  }
}
</script>
