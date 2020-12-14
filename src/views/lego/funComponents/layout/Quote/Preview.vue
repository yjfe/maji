<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-17 15:57:24
 * @LastEditTime: 2020-10-15 10:09:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <template v-if="item.quotePageId">
      <div class="preview-box-item" 
        v-for="(moduleItem, index) in floorList" 
        :key="moduleItem">
        <FreeComponentsId v-if="!!moduleItem" 
          :moduleId="moduleItem" 
          :key="moduleItem" 
          :index="index" 
          :pageData="pageData"
          v-bind="$attrs" 
          v-on="$listeners"/>
      </div>
    </template>
    <div class="default-text" v-else>请输入引用ID</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import * as api from '@/views/lego/service'
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'
import formRules from '@/views/lego/formRules'

export default {
  name: 'QuotePreview',
  components: {
    FreeComponentsId
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    }
  },  
  data() {
    return {
      floorList: []
    }
  },
  computed: {
    ...mapState({
      isEdit: state => state.manage.isEdit
    })
  },
  watch: {
    'item.quotePageId': {
      handler(value) {
        this.getModuleById(value)
      },
      immediate: true
    }
  },
  methods: {
    getModuleById(value) {
      if (value) {
        if (value === this.$route.query.id) {
          this.$message.error('不能引用组件自身')
          this.$set(this.item, 'quotePageId', '')
          this.pageName = ''
        } else {
          api.getAuthData({ pageManageId: value, status: 3 }).then((res) => {
            if (res.data) {
              this.item.quotePageId = value
              this.pageName = res.data.pageName
              this.setDetails(res.data.content)
            } else {
              this.$message.error('该id不存在')
              this.$set(this.item, 'quotePageId', '')
              this.pageName = ''
            }
          })
        }
      } else {
        this.item.quotePageId = ''
        this.item.pageName = ''
      }
    },
    setDetails(jsonStr) {
      try {
        const { idModule, floorList, pagesModuleId } = JSON.parse(jsonStr)
        const pageType = this.$store.getters['manage/pagesModuleId']
        if (pageType.indexOf(idModule[pagesModuleId].type) === -1) {
          this.$message.error('不能引用不同类型组件')
          this.$set(this.item, 'quotePageId', '')
          this.pageName = ''
          return
        }
        Object.keys(idModule).forEach(item => idModule[item].pageId = this.pageId)
        delete idModule[pagesModuleId]
        if (this.isEdit) {
          this.$store.dispatch('manage/setQuoteIdModule', idModule)
        } else {
          this.$store.dispatch('manage/addModules', formRules.addFormRules(idModule))
        }
        this.$set(this, 'floorList', floorList)
      } catch (error) {
        console.error(error)
        console.error('获取数据异常')
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
