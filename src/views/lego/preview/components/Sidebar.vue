<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-12-09 16:17:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sidebar" :class="{'layoutGrid': !layoutGrid}">
    <div class="sidebar--logo">
     <router-link class="middle" to="/">
        <div class="logo" v-if="$slots.logo || logo">
          <slot v-if="$slots.logo" name="logo"></slot>
          <img v-else-if="logo" :src="logo"/>
        </div>
        <span>{{ title }}</span>
      </router-link>
    </div>
    <el-menu 
      ref="elMenu"
      :default-active="activeIndex" 
      :collapse="!layoutGrid"
      unique-opened 
      @select="handleSelect">
      <template>
        <el-menu-item 
          v-for="(item, index) in menuList" 
          :key="index"
          :index="item.url" 
          :item="item">
          <i :class="item.icon"></i>
          <span>{{item.menuName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="sidebar-button">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  componentName: 'Sidebar',
  components: {
  },
  props: {
    menuList: {
      type: Array
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      logo: '',
      activeIndex: 'tx'
    }
  },
  errorCaptured() {
    return false
  },
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid'
    })
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
      this.$emit('select', key)
    }
  }
}
</script>
<style lang="less" scope>
  @import '~components/Sidebar/src/index';
  @import '~styles/sidebar';
  .sidebar-button{
    margin: 20px;
    .el-button{
      width: 100%;
      display: block;
      margin: 10px 0;
      min-width: auto;
      padding-left: 0;
      padding-right: 0;
      text-align: center;
      span{
        margin-left: 0
      }
    }
  }
</style>
