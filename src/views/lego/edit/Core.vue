<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-28 10:12:03
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
import { getComponentData } from '@/views/lego/utils'
import { cloneDeep } from '@/utils'
import validatorBase from '@/views/lego/edit/components/ValidatorDialog/data'
import manageJson from '@/views/lego/funComponents/manage.json'
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
        this.$store.dispatch('manage/setLegoInit', this.getInitData())
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
    },
    /**
     * @msg: 初始化数据的快速添加 对应页面创建的专业模式 
     * @return: 初始化数据
     */
    getInitData() {
      // 获取缓存
      let data = window.sessionStorage.getItem('quickCreate')
      // 删除缓存
      window.sessionStorage.removeItem('quickCreate')
      if (data && this.$route.query.expert === 'true') {
        data = JSON.parse(data)
        let initCode
        switch (this.pageType) {
          case 'PagesList': // list 的初始化数据解析
            initCode = this.getListInitData(data)
            break
          case 'PagesDetail': // detail 的初始化数据解析
            initCode = this.getDetailInitData(data)
            break
          case 'PagesForm': // form 的初始化数据解析
            initCode = this.getFormInitData(data)
            break
          default:
            break
        }
        return {
          floorList: initCode.floorList,
          idModule: initCode.idModule,
          pagesModuleId: ''
        }
      }
      return {
        floorList: [], 
        idModule: {}, 
        pagesModuleId: ''
      }
    },
    /**
     * @msg: 初始化数据的快速添加 list 
     * @param {array} list  
     * @return: 初始化数据
     */
    getListInitData(list = []) {
      const idModule = {}
      // 搜索框的
      const searchModule = getComponentData('Search')
      // 表格的
      const tableModule = getComponentData('Table')
      list.forEach((item) => {
        const { id, baseData } = getComponentData('Input')
        baseData.key = item.key
        baseData.label = item.label
        idModule[id] = Object.assign(baseData, cloneDeep(validatorBase), { id, parent: searchModule.id })
        // 给表格塞数据
        tableModule.baseData.layout.push({
          label: item.label,
          key: item.key,
          fixed: false,
          openType: 0
        })
        // 给搜索塞数据
        searchModule.baseData.layout.push({
          col: 6,
          module: id,
          type: manageJson.componentsInfo.Input.name
        })
      })
      // 删除第一个初始化数据
      tableModule.baseData.layout.splice(0, 1)
      // 删除第一个初始化数据
      searchModule.baseData.layout.splice(0, 1)
      idModule[searchModule.id] = Object.assign(searchModule.baseData, { id: searchModule.id })
      idModule[tableModule.id] = Object.assign(tableModule.baseData, { id: tableModule.id })
      return {
        idModule,
        floorList: [searchModule.id, tableModule.id]
      }
    },
    /**
     * @msg: 初始化数据的快速添加 form  
     * @param {array} list  
     * @return: 初始化数据
     */
    getFormInitData(list = []) {
      const idModule = {}
      const floorList = []
      list.forEach((item) => {
        const { id, baseData } = getComponentData('Input')
        baseData.key = item.key
        baseData.label = item.label
        idModule[id] = Object.assign(baseData, cloneDeep(validatorBase), { id })
        floorList.push(id)
      })
      return {
        idModule,
        floorList
      }
    },
    /**
     * @msg: 初始化数据的快速添加  detail 
     * @param {array} list  
     * @return: 初始化数据
     */
    getDetailInitData(list = []) {
      const idModule = {}
      const floorList = []
      list.forEach((item) => {
        const { id, baseData } = getComponentData('DetailText')
        baseData.key = item.key
        baseData.label = item.label
        idModule[id] = Object.assign(baseData, cloneDeep(validatorBase), { id })
        floorList.push(id)
      })
      return {
        idModule,
        floorList
      }
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
