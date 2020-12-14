<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-15 10:05:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="manage-layout">
    <FunctionalZone ref="FunctionalZone" :fun="fun"/>
    <Preview ref="Preview" :isEdit="true"/>
    <FormZone ref="FormZone"/>
  </div>
</template>
<script>
import * as api from '@/views/lego/service'
import Preview from './components/Preview'
import FunctionalZone from './components/FunctionalZone'
import FormZone from './components/FormZone'

export default {
  name: 'manageCore',
  components: { Preview, FunctionalZone, FormZone },
  props: {
    pageType: {
      type: String,
      default: 'from'
    },
    fun: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    fun: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.FunctionalZone.initItems(val)
        })
      },
      immediate: true
    }
  },
  created() {
    // this.$store.dispatch('getButtonAuth') // 获取按钮权限
    this.$store.dispatch('getMenuList') // 获取菜单列表
    this.$store.dispatch('manage/setIsEdit', true)
  },
  mounted() {
    this.getPageDetail()
  },
  methods: {
    /**
     * @description: 获取接口配置信息
     * @param {type} 
     * @return: 
     */
    getPageDetail() {
      const { id, v } = this.$route.query
      if (id) {
        // 带有版本号
        if (v) {
          this.getVersionData({ id, v })
        } else {
          // 最新发布版本
          this.getNewData({ id })
        }
      } else {
        // 默认新增情况初始化
        this.$store.dispatch('manage/setLegoInit', {
          floorList: [], 
          idModule: {}, 
          pagesModuleId: ''
        })
        this.$nextTick(() => {
          this.$emit('savePagesModuleId', this.pageType)
        })
      }
    },
    /**
     * @method: 初始化数据设置
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:39:36
     */
    setDetails(jsonStr) {
      try {
        const { idModule, floorList, pagesModuleId } = JSON.parse(jsonStr)
        // 将数据放入vuex
        this.$store.dispatch('manage/setLegoInit', {
          idModule,
          floorList,
          pagesModuleId
        })
        // this.floorList = floorList
        // this.pagesModule = idModule[pagesModuleId]
        // console.log(idModule, floorList, this.pagesModule)
      } catch (error) {
        console.error(error)
        console.error('获取数据异常')
      }
    },
    /**
     * @method: 获取最新发布
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 11:20:07
     */
    getNewData({ id }) {
      api.getNewData({ pageManageId: id, status: 3 }).then((res) => {
        this.setDetails(res.data.content)
      })
    },
    /**
     * @method: 获取版本内容
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-07-05 14:38:52
     */
    getVersionData({ v }) {
      api.getVersionData({ id: v }).then((res) => {
        this.setDetails(res.data.content)
      })
    },
    /**
     * @msg: 编辑模块 
     * @param {index} 添加位置 
     * @return: 
     */
    handleEditModule(item) {
      this.$refs.Preview.handleEditModule(item)
    }
  }
}
</script>
<style lang="less">
.manage-layout{
  display: flex;
  margin: 0 10px;
  .el-textarea{
    width: 100%
  }
}
.el-input-number.is-without-controls .el-input__inner {
  text-align: left;
}
.primary{
  color: #409EFF
}
.fun-radio{
  display: inline-block;
  line-height: inherit;
  vertical-align: inherit;
  font-size: 12px;
  .el-radio + .el-radio{
    margin-left: 0
  }
}
.fun-checkbox{
  display: inline-block;
  line-height: inherit;
  vertical-align: inherit;
  font-size: 12px;
  .el-checkbox{
    margin-right: 5px
  }
}
</style>
