<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:23
 * @LastEditTime: 2020-12-09 15:45:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <layout class="frame">
    <x-header slot="header">
      <template slot="right">
        <!-- <li><i class="el-icon-bell"/></li> -->
        <HeaderTips />
      </template>
    </x-header>
    <sidebar slot="sidebar" class="frame-sidebar" ref="frame-sidebar" :menuList="menuList" title="麻鸡搭建系统">
    <!-- <ProjectSelect slot="header" v-show="layoutGrid" /> -->
    </sidebar>
    <XBody slot="body" class="frame-body">
      <wrapper :class="classes">
        <div class="frame-container" ref="frame-container">
          <router-view></router-view>
        </div>
      </wrapper>
    </XBody>
    <div slot="footer"></div>
  </layout>
</template>
<script>
import { mapGetters } from 'vuex'
import Layout from '@/components/Layout'
import XBody from '@/components/XBody'
import Wrapper from '@/components/Wrapper'
import Sidebar from '@/components/Sidebar'
import XHeader from '@/components/XHeader'
import HeaderTips from '@/components/HeaderTips'

export default {
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid', // 是否栅格布局
      menuList: 'menuList' // 菜单
    }),
    classes() {
      return this.layoutGrid ? 'layout-grid' : ''
    }
  },
  components: { 
    Layout, 
    XBody, 
    Wrapper, 
    Sidebar, 
    XHeader,
    HeaderTips
  },
  data() {
    return {}
  },
  watch: {
    layoutGrid(value) {
      this.styles(value)
    }
  },
  mounted() {
    this.styles(this.layoutGrid)
    this.$store.dispatch('getUserInfo') // 获取用户信息
    this.getMenuList()
    this.getButtonAuth()
    window.onresize = () => {
      this.styles(this.layoutGrid)
    }
  },
  methods: {
    styles(layout) {
      const height = window.innerHeight - 60
      // let sidebar = this.$refs['frame-sidebar'].$el
      const container = this.$refs['frame-container']
      if (layout && container) {
        // sidebar && (sidebar.style.height = height + 10 + 'px')
        container.style.minHeight = `${height - 300}px`
      }
    },
    /**
     * @description: 获取按钮权限
     * @param {type} 
     * @return: 
     */
    getButtonAuth() {
      // TODO: 按钮权限未提供接口
      // this.$store.dispatch('getButtonAuth')
    },
    getMenuList() {
      this.$store.dispatch('getMenuList') // 获取菜单列表
    }
  },
  beforeRouteUpdate(to, from, next) {
    window.parent.postMessage(
      {
        act: 'routeUpdate',
        msg: to.fullPath
      },
      '*'
    )
    next()
  }
}
</script>

<style lang="less">
@import '~styles/sidebar';
body {
  background: #ebf0f5;
}
.frame {
  display: flex;
  .layout--content{
    flex: 1;
  }
  &-body {
    &::after {
      content: '';
      clear: both;
      display: table;
    }
  }
  &-sidebar {
    max-width: 180px;
    transition: .4s;
    margin-right: 0px;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background-color: #242d3b;
      border-radius: 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #6b7fa4;
      border-radius: 10px;
    }
  }
  &-container {
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    bottom: 0;
    top: 65px;
    left: 0;
    right: 0;
    margin-left: 64px;
    // margin-left: 180px;
    transition: .4s;
  }
  .frame-sidebar {
    display: block;
  }
  .layout-grid {
    .frame-sidebar {
    }
    .frame-container {
      margin-left: 180px;
    }
  }
  .content {
    padding: 60px;
    > .heading-1:first-child {
      margin-top: 0;
    }
  }
}
.router-link:hover {
  color: #3983e5 !important;
}
</style>
