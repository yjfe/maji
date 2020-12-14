<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-19 16:36:00
 * @LastEditTime: 2020-12-10 11:52:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="fixedFloor">
    <li v-for="(item, index) in list" :key="index">
      <div class="middle" 
        @click="handleClick(item)" 
        :key="item"
        v-dragging="{ item: item, group: 'addModule', type: 'add', comb: 'funButton' }"
        :title="componentsInfo[item].name"
        :data-img="componentsInfo[item].preview"
        @mouseenter="handleStart" 
        @mouseleave="handleEnd">
        <i class="iconfont" :class="componentsInfo[item].icon"/>
        <p>{{componentsInfo[item].name}}</p>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  name: 'FunctionalZoneItem',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    componentsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item)
    },
    handleStart(e) {
      if (e.srcElement.attributes['data-img']) {
        this.$emit('sitePreview', {
          top: e.y - e.offsetY,
          img: e.srcElement.attributes['data-img'].value
        })
      }
    },
    handleEnd() {
      this.$emit('sitePreview', {
        top: 0,
        img: ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
.fixedFloor{
  position: relative;
  .fun-preview{
    position: fixed;
    padding: 10px;
    background: #333;
    z-index: 200;
    img{
      width: 200px;
      height: auto;
    }
  }
}
</style>
