<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-10 09:23:36
 * @LastEditTime: 2020-12-09 14:41:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dropdown @command="handleClick">
    <div class="el-dropdown-link">
      <li><i class="el-icon-s-help"/></li>
    </div>
    <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
      <el-dropdown-item v-for="(item, index) in menu" :key="index" :command="item.url">
        <i :class="item.icon"></i> 
        {{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'HeaderTips',
  data() {
    return {
      menu: [
        {
          url: '',
          icon: 'el-icon-s-promotion',
          label: '操作指南'
        },
        {
          url: '',
          icon: 'el-icon-tickets',
          label: '接口规范'
        }
      ]
    }
  },
  methods: {
    handleClick(value) {
      window.open(encodeURI(value), '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~styles/var.less';
.header-tips-link{
  color: #333;
  text-decoration: none;
  &:hover{
    color: @color-primary
  }
}
</style>
