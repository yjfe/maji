<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-24 15:17:27
 * @LastEditTime: 2020-11-07 17:39:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-submenu :index="item.url || 'id' + item.id" :key="item.id" v-if="item.chirdMenuList">
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </template>
      <template v-for="(chird, index) in item.chirdMenuList">
        <SubmenuItem :item="chird" :key="index" :level="level + 1" v-if="!chird.hidden" />
      </template>
      <!-- <el-menu-item v-for="chird in item.chirdMenuList" :key="chird.id" :index="chird.url" :item="chird" v-show="!chird.hidden"> -->
      <!-- {{chird.menuName}}
    </el-menu-item> -->
    </el-submenu>
    <el-menu-item
      :index="item.url"
      :class="`${!!!level ? 'el-submenu__title' : ''} el-submenu__level${level}`"
      :key="item.id"
      :item="item"
      v-else
    >
      <i :class="item.icon"></i>
      <span>{{ item.menuName }}</span>
    </el-menu-item>
  </div>
</template>
<script>
import SubmenuItem from './SubmenuItem'

export default {
  name: 'SubmenuItem',
  components: { SubmenuItem },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
.el-menu--collapse {
  .el-submenu__title {
    span,
    .el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
