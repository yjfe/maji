<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-12-08 14:31:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="preview-box" :class="{'isEdit': isEdit}">
    <template v-if="$route.path === '/lego/edit/list'">
      <ExprotComponent 
        :floorList="floorList" 
        :activeIndex="activeIndex" 
        :activeId="activeId" 
        :moveEnd="moveEnd"
        @select="handleIndex"
        @remove="handleRemove"/>
    </template>
    <el-form label-width="100px" v-else>
      <ExprotComponent 
        :floorList="floorList" 
        :activeIndex="activeIndex" 
        :activeId="activeId" 
        :moveEnd="moveEnd"
        @select="handleIndex"
        @remove="handleRemove"/>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import manageJson from '@/views/lego/funComponents/manage.json'
import { cloneDeep } from '@/utils'
import { getComponentData } from '@/views/lego/utils'
import validatorBase from '../ValidatorDialog/data'
import ExprotComponent from './ExprotComponent'

export default {
  name: 'Preview',
  components: {
    ExprotComponent
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo,
      moveStart: '',
      moveEnd: ''
    }
  },
  computed: {
    ...mapState({
      floorList: state => state.manage.floorList,
      activeId: state => state.manage.activeId,
      activeIndex: state => state.manage.activeIndex
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.listenersMove()
    })
  },
  methods: {
    handleIndex({ index, item }) {
      // 设置选中的组件id
      this.$store.dispatch('manage/setActiveId', item)
      // 设置楼层index
      this.$store.dispatch('manage/setActiveIndex', index)
    },
    listenersMove() {
      this.$dragging.$on('dragged', (val) => {
        this.moveEnd = val.to
        this.moveStart = val.draged
      })
      this.$dragging.$on('dragend', (val) => {
        if (val.group === 'addModule') { // 属于这个 拖拽组
          if (this.floorList.indexOf(this.moveStart) !== -1) { // 存在该id 排序
            this.handleMoveInsert()
          } else {
            this.handleAddMoveFun()
          }
        }
        this.moveStart = ''
        this.moveEnd = ''
      })
    },
    /**
     * @description: 拖拽结果，处理插入排序位置
     * @param {type} 
     * @return: 
     */
    handleMoveInsert() {
      const start = this.floorList.indexOf(this.moveStart)
      const end = this.floorList.indexOf(this.moveEnd)
      if (start >= 0 && end >= 0) {
        this.$store.dispatch('manage/moveInsert', { start, end })
      }
    },
    /**
     * @description: 拖拽结果，处理新增
     * @param {type} 
     * @return: 
     */
    handleAddMoveFun() {
      const index = this.floorList.indexOf(this.moveEnd)
      if (index !== -1) {
        this.addModule(this.moveStart, index + 1 || 1)
      }
    },
    /**
     * @description: 添加楼层模块
     * @param {type} 
     * @return: 
     */
    addModule(item, index) {
      try {
        const id = `${item}${new Date().getTime()}`
        // eslint-disable-next-line 
        const baseData = getComponentData(item)
        this.$store.dispatch('manage/addFloorList', { 
          id, 
          data: Object.assign(baseData, cloneDeep(validatorBase), { id }),
          index 
        })
      } catch (error) {
        // console.log(error)
        console.error(`找不到${item}的data.js`)
      }
    },
    /**
     * @method: 删除组件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-05-30 14:58:48
     */
    handleRemove(id) {
      this.$confirm('请确认是否删除该组件', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('manage/removeFloor', id)
      })
    }
  }
}
</script>

<style lang="less">
@import './index.less';
</style>
