import { mapState } from 'vuex'
import formRules from '@/views/lego/formRules'
import { install, clear } from '@/views/lego/utils/apiResolver'
import * as api from '../service'

export default {
  name: 'legoView',
  data() {
    return {
      pagesModule: {},
      floorList: []
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    })
  },
  watch: {
    $route: {
      handler() {
        // 清理接口配置
        clear()
        this.$store.dispatch('manage/setModule', {})
        this.floorList = []
        this.pagesModule = {}
        this.getDetails()
      },
      immediate: true
    }
  },
  created() {
    this.$store.dispatch('setLayoutGrid', false)
    this.$store.dispatch('manage/setIsEdit', false)
    this.$store.dispatch('getIframeAuth')
    // this.getDetails()
  },
  mounted() {
    window.addEventListener('message', this.switchEvent, true)
  },
  destroyed() {
    window.removeEventListener('message', this.switchEvent, true)
  },
  methods: {
    /**
     * @description: 获取接口配置信息
     * @param {type} 
     * @return: 
     */
    getDetails() {
      const { id } = this.$route.params
      const { v } = this.$route.query
      if (id) {
        if (id === 'preview') {
          this.getCacheData()
        } else if (v) {
          this.getVersionData({ id, v })
        } else {
          // 最新发布版本 带权限 正式环境
          this.getAuthData({ id })
        }
      }
    },
    /**
     * @method: 获取最新发布内容 带权限 正式环境
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 11:20:07
     */
    getAuthData({ id }) {
      window.isPreview = false // 设置环境变量 禁用302弹窗提示
      const status = this.$route.query.pageStatus || 3
      api.getAuthData({ pageManageId: id, status: parseInt(status, 10) }).then((res) => {
        if (res.data && res.data.content) {
          this.$store.dispatch('setPageButtonAuth', {
            data: res.data.authList,
            type: 'new'
          })
          this.setDetails(res.data.content, id)
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    setDetails(jsonStr, pageId = 'preview') {
      try {
        const { idModule, floorList, pagesModuleId } = JSON.parse(jsonStr)
        // 模块数据增加当前页面的id
        Object.keys(idModule).forEach(item => idModule[item].pageId = pageId)
        // 存入vuex
        this.$store.dispatch('manage/setModule', formRules.addFormRules(idModule))
        this.floorList = floorList
        this.pagesModule = idModule[pagesModuleId]
        // 设置页面类型，被混合的短链页面使用
        if (this.setPageType) {
          this.setPageType(this.pagesModule.type)
        }
        // 插入页面id
        this.pagesModule.pageId = this.$route.params.id
        // 设置面包屑
        this.setBreadcrumb(this.pagesModule)
        delete idModule[pagesModuleId]
        // 设置接口环境变量
        install(this.pagesModule.envApi)
      } catch (error) {
        console.error(error)
        console.error('获取数据异常')
      }
    },
    /**
     * @method: 设置面包屑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-08-20 14:29:45
     */
    setBreadcrumb(data) {
      window.parent.postMessage(
        {
          act: 'setBreadcrumb',
          msg: [{ path: this.$route.fullPath, title: data.title }]
        },
        '*'
      )
    },
    /**
     * @method: 获取版本内容
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:15
     */
    getVersionData({ id, v }) {
      api.getVersionData({ id, v }).then((res) => {
        if (!res.data || !res.data.content) {
          this.$message.error('查询失败')
          return
        }
        this.setDetails(res.data.content, id)
      })
    },
    /**
     * @method: 获取缓存数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:26
     */
    getCacheData() {
      window.isPreview = true // 设置环境变量 打开302弹窗提示
      this.setDetails(window.sessionStorage.getItem('legoPreview'))
    },
    /**
     * @method: 分发事件，从外部项目的交互
     * @param {type} 
     * @return: 
     */
    switchEvent(e) {
      switch (e.data.act) {
        case 'refreshData':
          this.refreshData(e.data.msg)
          break
        case 'iframeRouterLink':
          this.toRouterLink(e.data.msg)
          break
        default:
          break
      }
    },
    /**
     * @method: 获取缓存数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:26
     */
    toRouterLink(data) {
      this.$router.push(data)
    },
    /**
     * @method: 获取缓存数据
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:26
     */
    refreshData({ id, query }) {
      const item = this.idModule[id]
      this.$root.$emit(`${id}GetList${item.isDialog || ''}`, query)
    }
  }
}
