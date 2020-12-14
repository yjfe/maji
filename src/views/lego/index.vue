<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 16:19:54
 * @LastEditTime: 2019-09-05 11:21:51
 * @LastEditors: yamanashi12
 -->
<template>
  <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('getUserInfo') // 获取用户信息
  },
  methods: {
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
