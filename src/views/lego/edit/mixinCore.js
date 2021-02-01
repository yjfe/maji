/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-29 10:55:24
 * @LastEditTime: 2021-01-21 16:05:39
 * @LastEditors: Please set LastEditors
 */
import { mapGetters } from 'vuex'
import Layout from '@/components/Layout'
import XBody from '@/components/XBody'
import Wrapper from '@/components/Wrapper'
import Sidebar from '@/components/Sidebar'
import ProjectSelect from '@/components/ProjectSelect'
import * as api from '@/views/lego/service'
import { getComponentData } from '@/views/lego/utils'
import EditHeader from './components/EditHeader'
import legoCore from './Core'

export default {
  components: {
    legoCore,
    EditHeader,
    Layout, 
    XBody, 
    Wrapper, 
    Sidebar,
    ProjectSelect
  },
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid', // 是否栅格布局
      menuList: 'menuList'
    }),
    classes() {
      return this.layoutGrid ? 'layout-grid' : ''
    }
  },
  data() {
    return {
      pageId: ''
    }
  },
  created() {
    this.$store.dispatch('setLayoutGrid', false)
    this.pageId = this.$route.query.id
  },
  methods: {
    
    /**
     * @method: 点击组件新增操作
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:36:56
     */
    savePagesModuleId(item) {
      try {
        // eslint-disable-next-line 
        const { id, baseData } = getComponentData(item)
        this.$store.dispatch('manage/addModule', { 
          id, 
          data: Object.assign(baseData, { id })
        })
        this.$store.dispatch('manage/setPagesModuleId', id)
        this.$store.dispatch('manage/setActiveId', id)
      } catch (error) {
        // console.log(error)
        console.error(`找不到${item}的data.js`)
      }
    },
    /**
     * @method: 页面提交事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 17:43:11
     */
    handleSubmit(status = 2) {
      const nowItem = this.$store.getters['manage/idModule'][this.$store.getters['manage/pagesModuleId']]
      const data = {
        status, 
        pageName: nowItem.title,
        authValue: nowItem.authValue,
        projectId: this.$route.query.projectId,
        pageType: this.pageType,
        content: JSON.stringify({
          idModule: this.clearRubbish(this.$store.getters['manage/idModule']),
          floorList: this.$store.getters['manage/floorList'],
          pagesModuleId: this.$store.getters['manage/pagesModuleId']
        })
      }
      if (this.pageId) {
        this.updatePage(data)
      } else {
        this.savePage(data)
      }
    },
    /**
     * @method: 页面新增保存
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 17:43:31
     */
    savePage(data) {
      api.save(data, { successMsg: '新增成功' }).then(() => {
        // 关闭当前页面
        setTimeout(() => {
          window.close()
        }, 2000)
      })
    },
    /**
     * @method: 页面编辑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-02 17:43:44
     */
    updatePage(data) {
      this.$prompt('请输入备注说明', '备注信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'textarea',
        inputPattern: /^.{10,200}$/,
        inputErrorMessage: '请输入10-200字符的备注说明'
      }).then(({ value }) => {
        api.update({
          pageManageId: this.pageId,
          remark: value,
          ...data
        }, { successMsg: '编辑成功' }).then(() => {
          // 关闭当前页面
          setTimeout(() => {
            window.close()
          }, 2000)
        })
      })
    },
    clearRubbish(data) {
      // Object.keys(data).forEach((key) => {
      //   // 清理异常出局
      //   const item = data[key]
      //   if (['Radio', 'Checkbox', 'Select'].indexOf(item.type) !== -1) {
      //     if (item.optionsType === 1) {
      //       item.options = []
      //     }
      //   }
      // })
      return data
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from)
  //   next()
  // }
}
