<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-20 14:53:06
 * @LastEditTime: 2020-12-01 15:11:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    :title="pagesModule.title"
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    :width="`${width}px`"
    :before-close="handleClose">
    <div v-loading="loading">
      <component 
        :is="componentType" 
        :floorList="floorList" 
        :pagesModule="pagesModule" 
        parent="dialog" 
        ref="model"
        v-bind="$attrs"
        @submitClose="handleSubmitClose"
        @close="handleClose">
      </component>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button 
        v-for="(item, index) in pageButton" 
        :key="index"
        :type="item.styles.color" 
        @click="handleConfirm(item)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { install } from '@/views/lego/utils/apiResolver'
import formRules from '@/views/lego/formRules'
import ModelDetail from './ModelDetail'
import ModelForm from './ModelForm'
import ModelList from './ModelList'
import * as api from '../service'

export default {
  components: {
    ModelDetail,
    ModelForm,
    ModelList
  },
  props: {
    pageId: {
      type: [Number, String]
    },
    width: {
      type: [Number, String],
      default: 1000
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: true,
      componentType: '',
      floorList: [],
      pagesModule: {},
      dislogIds: [],
      pageButton: [],
      commentModel: {
        PagesList: 'ModelList',
        PagesForm: 'ModelForm',
        PagesDetail: 'ModelDetail'
      }
    }
  },
  mounted() {
    if (this.pageId) {
      this.getDetail(this.pageId)
    }
  },
  methods: {
    handleClose(done) {
      done()
      this.$nextTick(() => {
        this.$emit('close')
        // 弹出层关闭时候，清理本弹层的idModule
        this.removeDetails()
      })
    },
    handleSubmitClose(refresh) {
      if (refresh) {
        this.$emit('refresh')
      }
      this.dialogVisible = false
    },
    /**
     * @method: 获取最新发布内容
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 11:20:07
     */
    getDetail(id) {
      api.getAuthData({ pageManageId: id, status: 3 }, { 
        context: this, 
        cache: 60, 
        noAuth: true, 
        preview302: true 
      }).then((res) => {
        if (res.data && res.data.content) {
          this.$store.dispatch('setPageButtonAuth', {
            data: res.data.authList,
            type: 'add'
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
        
        this.dislogIds = Object.keys(idModule)
        // 模块数据增加当前页面的id
        Object.keys(idModule).forEach(item => Object.assign(idModule[item], {
          pageId: pageId,
          isDialog: 'Dialog'
        }))
        // 存入vuex
        this.$store.dispatch('manage/addModules', formRules.addFormRules(idModule))
        this.floorList = floorList
        this.pagesModule = idModule[pagesModuleId]
        this.pagesModule.pageId = this.pageId
        this.componentType = this.commentModel[this.pagesModule.type]
        delete idModule[pagesModuleId]
        // 过滤按钮显示
        this.pageButton = this.pagesModule.action.filter(item => item.type === 'submit')
        // 设置接口环境变量
        install(this.pagesModule.envApi)
      } catch (error) {
        console.error('获取数据异常')
      }
    },
    /**
     * @method: 删除本次弹出层的idModule
     * @param {type} 
     * @return: 
     * */
    removeDetails() {
      this.dislogIds.forEach(item => this.$store.dispatch('manage/removeModule', { module: item }))
    },
    handleConfirm(item) {
      try {
        this.$refs.model.submit(item)
      } catch (error) {
        this.dialogVisible = false
      }
    }
  }
}
</script>
