<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-11-30 17:38:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="header">
    <wrapper>
      <slot v-if="$slots.default"></slot>
      <div v-else>
        <el-row class="header-row">
          <el-col class="header-sub" :span="16">
            <div class="showMenu" :class="{ hide: $store.getters.layoutGrid }" @click="showMenu"
              ><img src="./icon-menu.png"
            /></div>
            <el-breadcrumb separator="/" class="header-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                :to="breadcrumb.length === index - 1 ? '' : { path: item.path }"
                v-for="(item, index) in breadcrumb"
                :key="index"
                >{{ item.title }}</el-breadcrumb-item
              >
              <!-- <el-breadcrumb-item>{{menuName || ''}}</el-breadcrumb-item> -->
            </el-breadcrumb>
          </el-col>
          <el-col class="header-sub flex" :span="8">
            <slot name="right"></slot>
            <el-dropdown @command="userEdit" v-if="XUserName">
              <div class="el-dropdown-link">
                <!-- <e-avatar class="user-photo" :src="this.person_info.iconUrl" /> -->
                <span class="el-dropdown-trigger-text user-name small">{{ XUserName }}</span>
              </div>
              <i class="el-icon-arrow-down" />
              <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
                <el-dropdown-item command="userexit">
                  <i class="el-icon-back"></i> 退出</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </wrapper>
  </div>
</template>

<script>
import Wrapper from '../../Wrapper'

export default {
  componentName: 'XHeader',
  components: { Wrapper },
  props: {
    title: {
      type: String
    },
    hasExit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    XUserName() {
      const { userInfo } = this.$store.getters
      if (userInfo && userInfo.userName) {
        return userInfo.userName
      }
      return this.$store.getters.userName
    }
  },
  data() {
    return {
      breadcrumb: []
    }
  },
  mounted() {
    window.addEventListener(
      'message',
      (e) => {
        if (e.data.act === 'breadcrumb') {
          this.breadcrumb = e.data.msg
        }
      },
      false
    )
  },
  methods: {
    userEdit(command) {
      if (command === 'userexit') {
        this.$confirm('确定退出登录, 是否继续?', '温馨提示', {
          type: 'warning'
        }).then(() => {
          if (this.hasExit) {
            this.$emit('exit')
          } else {
            window.location.href = '/login'
          }
        })
      }
    },
    showMenu() {
      const show = this.$store.getters.layoutGrid
      this.$store.commit('LayoutGrid', !show)
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
