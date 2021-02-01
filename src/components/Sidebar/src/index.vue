<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2021-02-01 11:03:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sidebar" :class="{ layoutGrid: !layoutGrid }">
    <div class="sidebar--logo">
      <router-link class="middle" to="/">
        <div class="logo"
          ><slot v-if="$slots.logo" name="logo"></slot><img v-else :src="logo"
        /></div>
        <span>{{ title }}</span>
      </router-link>
    </div>
    <slot name="header" />
    <div class="sidebar--search" v-if="search">
      <el-input prefix-icon="el-icon-search" v-model.lazy="searchText" clearable />
      <p class="hasShow" v-if="!hasShow">未找到菜单</p>
    </div>
    <el-menu
      ref="elMenu"
      :default-active="activeIndex"
      :collapse="!layoutGrid"
      unique-opened
      @select="handleSelect"
    >
      <template v-for="(item, index) in menuList">
        <SubmenuItem :item="item" :key="index" v-if="!item.hidden" />
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubmenuItem from './SubmenuItem'
// import point from '@/utils/point/thinkingReport'

export default {
  componentName: 'Sidebar',
  components: {
    SubmenuItem
  },
  props: {
    /**
     * @prop {Array} menuList 菜单数组
     */
    menuList: {
      type: Array
    },
    /**
     * @prop {String} title 标题
     */
    title: {
      type: String
    },
    /**
     * @prop {Boolean} search 菜单快捷搜索  默认: false
     */
    search: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      logo: '',
      searchText: '',
      hasShow: true
    }
  },
  errorCaptured() {
    return false
  },
  computed: {
    ...mapGetters({
      layoutGrid: 'layoutGrid'
    }),
    activeIndex() {
      let { path } = this.$route
      if (this.$route.query.src && this.$route.path === '/iframe') {
        path = this.$route.query.src
      }
      return path || ''
    }
  },
  watch: {
    searchText(value) {
      this.hasShow = false
      this.menuList.forEach(item => this.eachHasSearchText(item, value))
      this.openSearch()
    }
  },
  methods: {
    handleSelect(key, route, $e) {
      const { item } = $e.$attrs
      // 埋点
      if (item.iframe) {
        // 判断是旧页面使用iframe打开
        this.$router.push({
          path: 'iframe',
          query: {
            src: key,
            title: item.menuName
          }
        })
      } else {
        this.$router.push({ path: key })
      }
    },
    /**
     * @description: 处理所有搜索显示隐藏
     * @param {type}
     * @return:
     */
    eachHasSearchText(data, value) {
      let noChir
      if (data.chirdMenuList && data.chirdMenuList.length > 0) {
        data.chirdMenuList.forEach(item => this.eachHasSearchText(item, value))
        noChir = data.chirdMenuList.some(item => item.hidden === false)
      }

      if (data.menuName && data.menuName.indexOf(value) === -1 && !noChir) {
        data.hidden = true
      } else if (data.menuName && data.menuName.indexOf(value) !== -1) {
        this.hasShow = true
        data.hidden = false
        if (data.chirdMenuList && data.chirdMenuList.length > 0) {
          data.chirdMenuList.forEach(item => item.hidden = false)
        }
      } else {
        this.hasShow = true
        data.hidden = false
      }
      return data
    },
    /**
     * @method: 打开所有搜索到的
     */
    openSearch() {
      const filter = []
      this.menuList.forEach((item) => {
        if (!item.hidden) {
          filter.push(`id${item.id}`)
        }
      })
      this.$refs.elMenu.openedMenus = filter
    }
  }
}
</script>
<style src="./index.less" lang="less"></style>
