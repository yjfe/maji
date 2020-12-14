<!--
 * @Author: your name
 * @Date: 2020-06-10 11:13:18
 * @LastEditTime: 2020-09-21 10:07:33
 * @LastEditors: Please set LastEditors
 * @Description: 代码组件，生命周期插入代码
 * @FilePath: \generate\src\views\lego\components\CodePointEvent\index.vue
--> 
<template>
  <div>
    <el-dropdown @command="handleAddEvent">
      <el-button type="">插入生命周期/事件</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item 
          v-for="item in eventList" 
          :key="item.eventName" 
          :disabled="!!data.componentEvent[item.eventName]"
          :command="item">{{`${item.eventName} - ${item.info}`}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-table :data="componentEventList" style="margin-top:10px">
      <el-table-column label="已有事件" prop="eventName">
        <template slot-scope="scope">
          <span class="CodePointEvent-name"
            @click="handleOpenCode(scope.row.eventName)" v-text="scope.row.eventName"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="50px" align="center">
        <template slot-scope="scope">
          <i class="el-icon-delete CodePointEvent-del"
            @click="handleDelEvent(scope.row.eventName)"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import eventOption from './eventOption'
import EventCodeEdit from '../EventCodeEdit'

export default {
  props: {
    event: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      componentEventList: [] // 已经定义的组件用  输出用
    }
  },
  computed: {
    eventList() { // 渲染的可选生命周期
      // 过滤配置传入的生命周期
      return eventOption.filter(item => this.event.indexOf(item.eventName) !== -1)
    }
  },
  created() {
    if (!this.data.componentEvent) {
      this.data.componentEvent = {}
    }
    this.setEventToArray()
  },
  methods: {
    /**
     * @Date: 2020-06-12 15:51:35
     * @method: 增加生命周期事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleAddEvent(data) {
      if (!this.data.componentEvent[data.eventName]) {
        this.data.componentEvent[data.eventName] = this.initCode(data)
        // 转成数组使用
        this.setEventToArray()
      }
    },
    /**
     * @Date: 2020-06-12 15:52:01
     * @method: 删除生命周期事件
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleDelEvent(name) {
      this.$confirm('删除该事件?', '提示', {
        type: 'warning'
      }).then(() => {
        delete this.data.componentEvent[name]
        this.setEventToArray()
      })
    },
    /**
     * @Date: 2020-06-12 15:52:16
     * @method: 打开代码编辑
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    handleOpenCode(name) {
      const data = eventOption.find(item => item.eventName === name)
      const code = this.data.componentEvent[name]
      // 代开代码编辑框
      EventCodeEdit(code, data).then((code) => {
        this.data.componentEvent[name] = code
      })
    },
    /**
     * @Date: 2020-06-12 15:52:52
     * @method: 设置已选的生命周期数组
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    setEventToArray() {
      this.componentEventList = Object.keys(this.data.componentEvent).map(item => ({
        eventName: item
      })) || []
    },
    /**
     * @Date: 2020-06-12 15:52:40
     * @method: 初始化代码段
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     */
    initCode(data) {
      const str = `function ${data.eventName} (${data.params.map(item => item.name).join(', ')}) {
  
}`
      return str
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var.less';
.CodePointEvent-del{
  color: @color-error;
  font-size: 14px;
  cursor: pointer;
}
.CodePointEvent-name{
  color: @color-primary;
  font-size: 14px;
  cursor: pointer;
}
</style>
