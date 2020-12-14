<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:42
 * @LastEditTime: 2020-12-09 10:50:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form label-width="100px" ref="form" :model="form" >
    <div class="preview-box-item" 
      v-for="(item, index) in floorList" 
      :key="`free${item}`" >
      <slot v-if="!idModule[item]" :name="item" />
      <FreeComponentsId v-else 
        :moduleId="item" 
        :key="`free${item}`" 
        :index="index" 
        :pageData="form" 
        :query="query" 
        :parentData="form" 
        :isFormEdit="isFormEdit"/>
    </div>
    <div class="attract-bottom" v-if="pagesModule.action && !parent && pagesModule.action.length > 0">
      <PageButton 
        @refresh="detailAction"
        :pageData="form" 
        :query="query"
        @submit="submit" 
        :pagesModule="pagesModule" 
        v-bind="$attrs"/>
    </div>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import * as httpAgent from '@/utils/http'
import { apiResolver } from '@/views/lego/utils/apiResolver'
import { 
  getRouteQuery,
  legoRouterLink,
  useCodeEvent 
} from '@/views/lego/utils'
import PageButton from './components/PageButton'

export default {
  name: 'PreviewFrom',
  components: {
    PageButton,
    FreeComponentsId
  },
  props: {
    floorList: {
      type: Array,
      default() {
        return []
      }
    },
    pagesModule: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogQuery: {
      type: Object
    },
    parent: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      idModule: 'manage/idModule'
    }),
    isEdit() {
      let query = this.dialogQuery ? { ...this.dialogQuery } : { ...this.$route.query }
      query = getRouteQuery(query)
      delete query.tableSelect
      return JSON.stringify(query) !== '{}'
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      query: {},
      isFormEdit: false
    }
  },
  created() {
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.pagesModule, 'componentCreated', this)(this.query, this.pagesModule, this.$store.getters['manage/idModule'])
    if (this.isEdit) {
      this.detailAction()
    }
    // TODO: eventSettingLock 锁定的初始化，暂时没有其他选择
    window.eventSettingLock = window.eventSettingLock || 0
  },
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.pagesModule, 'componentWillDestroy', this)(this.pagesModule, this.$store.getters['manage/idModule'])
  },
  methods: {
    /**
     * @description: eventSetting模式处理
     * @param {type} 
     * @return: 
     */
    eventSettingLockInterval() {
      return new Promise((resolver) => {
        // TODO eventSetting模式处理，延后提交事件，表单change未执行接口直接提交
        setTimeout(() => {
          // 设置定时器，50毫秒一次轮询判断接口执行完成
          const Interval = setInterval(() => {
            if (window.eventSettingLock === 0) {
              clearTimeout(Interval)
              resolver()
            }
          }, 50)
        }, 0)
      })
    },
    /**
     * @description: 提交事件
     * @param {type} 
     * @return: 
     */
    submit(options) {
      // [eventSetting] 处理延迟数据问题，
      this.eventSettingLockInterval().then(() => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.hasConfirm(options.props).then(() => {
              this.submitHttp(options.props)
            })
          }
        })
      })
    },
    /**
     * @description: 提交事件，拼接参数，执行接口
     * @param {type} 
     * @return: 
     */
    async submitHttp(options) {
      // 增加url上的参数混入提交
      const formData = { ...this.query, ...this.form }
      if (this.isEdit) {
        this.updatedAction(formData, options)
      } else {
        this.saveAction(formData, options)
      }
    },
    /**
     * @method: 解析事件-新增
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）-
     * @Date: 2019-07-05 17:21:59
     */
    saveAction(formData, options) {
      try {
        const { 
          url, 
          type, 
          requestQuery, 
          option 
        } = apiResolver(options.saveApiUrl)
        const httpParams = { ...requestQuery, ...formData }
        // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSubmit
        useCodeEvent(this.pagesModule, 'componentBeforeSubmit', this)(httpParams, this.pagesModule, this.$store.getters['manage/idModule'])
        httpAgent[type](url, httpParams, { 
          context: this, 
          successMsg: '提交成功', 
          noAuth: true, 
          preview302: true,
          ...option 
        }).then(() => {
          this.successGo(options.closeRefresh)
        })
      } catch (error) {
        console.error('新增接口地址配置错误')
      }
    },
    /**
     * @method: 解析事件-编辑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 17:22:01
     */
    updatedAction(formData, options) {
      try {
        const { 
          url, 
          type, 
          requestQuery,
          option
        } = apiResolver(options.updateApiUrl)
        const httpParams = { ...requestQuery, ...this.query, ...formData }
        // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSubmit
        useCodeEvent(this.pagesModule, 'componentBeforeSubmit', this)(httpParams, this.pagesModule, this.$store.getters['manage/idModule'])
        httpAgent[type](url, httpParams, { 
          context: this, 
          successMsg: '编辑成功', 
          noAuth: true, 
          preview302: true,
          ...option 
        }).then(() => {
          this.successGo(options.closeRefresh)
        })
      } catch (error) {
        console.error('更新接口地址配置错误')
      }
    },
    /**
     * @method: 解析事件-详情
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 17:22:04
     */
    detailAction() {
      // 没有配置详情url不执行
      const { ...query } = this.dialogQuery || this.$route.query 
      this.query = getRouteQuery(query)
      if (!this.pagesModule.detailApiUrl) {
        this.setIdModuleValue(this.query)
        return
      }
      // 页面组件是编辑的状态
      this.isFormEdit = true
      // 请求数据
      const { 
        url, 
        type, 
        requestQuery, 
        option 
      } = apiResolver(this.pagesModule.detailApiUrl)
      const httpParams = { ...requestQuery, ...query }
      // 代码组件 - 自定义生命周期 - 接口请求之前 beforeSend
      useCodeEvent(this.pagesModule, 'componentBeforeSend', this)(httpParams, this.pagesModule, this.$store.getters['manage/idModule'])
      // 执行http请求
      httpAgent[type](url, httpParams, { 
        context: this, 
        noAuth: true, 
        preview302: true, 
        ...option 
      }).then((res) => {
        // 代码组件 - 自定义生命周期 - 接口请求后 afterSend
        useCodeEvent(this.pagesModule, 'componentAfterSend', this)(res.data, this.pagesModule, this.$store.getters['manage/idModule'])
        this.setIdModuleValue(res.data)
      })
    },
    /**
     * @method: 解析事件-给模块赋值操作
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 17:22:04
     */
    setIdModuleValue(data = {}) {
      this.form = data
      Object.keys(this.idModule).forEach((id) => {
        const item = this.idModule[id]
        // 非同属于弹出层或页面的组件数据不同步
        if (item.isDialog !== this.pagesModule.isDialog) return
        const { key } = item
        if (key && this.form[key] !== undefined && !item.fake) {
          // 初始化给所有表单赋值
          this.$set(item, 'value', this.form[key])
        }
      })
    },
    /**
     * @method: 编辑成功后跳转
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 17:27:20
     */
    successGo(refresh) {
      if (this.parent === 'dialog') {
        // 在dialog中
        this.$emit('submitClose', refresh)
      } else {
        // 正常编辑
        const { successGo } = this.pagesModule
        if (successGo) {
          legoRouterLink(successGo)
        } else {
          window.history.go(-1)
        }
      }
    },
    /**
     * @description: 获取每一个组件的value，目前存在一些特殊组件的取值方式不同 FormGroup
     * @param {type} 
     * @return: 
     */
    async componentValue(item) {
      let { value } = item
      const pendingType = ['FormGroup', 'InputPassword']
      if (pendingType.indexOf(item.type) !== -1) {
        value = await new Promise(resolve => this.$root.$emit(`${item.id}Value${this.pagesModule.isDialog || ''}`, value => resolve(value)))
      }
      return value
    },
    /**
     * @description: 提交前的二次确认框
     * @param {type} 
     * @return: 
     */
    hasConfirm(option) {
      return new Promise((resolve) => {
        if (!option.confirm) {
          resolve()
        } else {
          this.$confirm(option.confirmMsg || '确定提交', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            resolve()
          })
        }
      })
    }
  }
}
</script>
