<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-10-22 18:07:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="functional-zone" :class="{'hidden': !isShow}" ref="main">
    <div class="top-title">
      组件库
      <span v-show="isShow" @click="isShow = !isShow">收起</span>
    </div>
    <div class="private-box">
      <div class="private-box-scroll">
        <div class="botton-float" v-if="!isShow" @click="isShow = !isShow">组件库</div>
        <FunctionalZoneLayout 
          v-else
          ref="FunctionalZoneLayout"
          :formItems="formItems"
          :layoutItems="layoutItems"
          :privateItems="privateItems"
          :listItems="listItems"
          :detailItems="detailItems"
          @sitePreview="handleSitePreview"
          @select="handleClick"/>
        </div>
    </div>
    <div v-if="size.top && funPreviewImg" 
      class="fun-preview" :style="size">
      <img :src="funPreviewImg"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import manageJson from '@/views/lego/funComponents/manage.json'
import FunctionalZoneLayout from './FunctionalZoneLayout'

export default {
  name: 'FunctionalZone',
  components: {
    FunctionalZoneLayout
  },
  data() {
    return {
      formItems: manageJson.formItems,
      layoutItems: manageJson.layoutItems,
      privateItems: manageJson.privateItems,
      listItems: manageJson.listItems,
      detailItems: manageJson.detailItems,
      isShow: true,
      size: {},
      funPreviewImg: ''
    }
  },
  computed: {
    ...mapState({
      floorList: state => state.manage.floorList
    })
  },
  methods: {
    init(data) {
      if (this.floorList && this.floorList.length === 0) {
        this.$refs.FunctionalZoneLayout.handleClick(data)
      }
    },
    /**
     * @description: 点击功能组件 新增
     * @param {type} 
     * @return: 
     */
    handleClick(data) {
      this.$store.dispatch('manage/addFloorList', data)
    },
    /**
     * @description: 设置展示项目
     * @param {type} 
     * @return: 
     */  
    initItems({
      formItems, 
      layoutItems, 
      privateItems, 
      listItems,
      detailItems
    }) {
      function filterItems(newArr, allArr) {
        if (newArr && Array.isArray(newArr)) {
          return newArr.filter(item => allArr.indexOf(item) >= 0)          
        }
        return allArr
      }
      this.formItems = filterItems(formItems, manageJson.formItems)
      this.layoutItems = filterItems(layoutItems, manageJson.layoutItems)
      this.privateItems = filterItems(privateItems, manageJson.privateItems)
      this.listItems = filterItems(listItems, manageJson.listItems)
      this.detailItems = filterItems(detailItems, manageJson.detailItems)
    },
    handleSitePreview({ top, img }) {
      top = Math.min(top, this.$refs.main.offsetHeight - 50 + 65)
      this.funPreviewImg = img
      this.size = {
        top: top ? `${top - 60}px` : top,
        left: '100%'
      }
    }
  }
}
</script>

<style lang="less">
@import '~styles/var';
.functional-zone{
  position: relative;
  background: @color-white;
  float: right;
  width: 282px;
  height: calc(100vh - 65px);
  transition: .3s;
  *{
    box-sizing: border-box
  }
  &.hidden{
    width: 0;
  }
  .private-box{
    width: 100%;
    height: calc(100vh - 115px);
    overflow-y: auto;
    overflow-x: hidden;
    &-scroll{
      width: 282px;
    }
  }
  .top-title{
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    color: @color-black;
    border-bottom: 1px solid @border-color-hover;
    span{
      float: right;
      color: @color-primary;
      font-size: 14px;
      font-weight: normal;
      cursor: pointer;
      margin-right: 20px;
    }
  }
  .botton-float{
    position: absolute;
    left: 34px;
    top: 19px;
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    box-shadow: 0 2px 8px 0 rgba(8,11,31,0.08);
    border-radius: 18px;
    border-radius: 18px;
    font-size: 13px;
    color: #606266;
    width: 64px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    z-index: 10;
    cursor: pointer;
    &:hover{
      color: @color-primary
    }
  }
  .fun-preview{
    position: absolute;
    left: 100%;
    top: 100px;
    padding: 10px;
    background: #333;
    z-index: 200;
    text-align: center;
    img{
      width: auto;
      max-height: 100px;
    }
  }
}
</style>
