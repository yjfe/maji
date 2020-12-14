<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-06-18 16:23:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="lego-panel-preview">
    <div class="lego-panel-preview-icon" v-if="item.imgSrc">
      <img :src="item.imgSrc" class="lego-panel-preview-icon-img"/>
    </div> 
    <div class="lego-panel-preview-description" :class="`textAlign-${item.textAlign}`">
      <div class="lego-panel-preview-text" v-text="item.label"></div> 
      <span class="lego-panel-preview-num" 
        :style="{color: item.color}"
        v-html="text" />
    </div>
  </div>
</template>
<script>
import { getTextRender, useCodeEvent } from '@/views/lego/utils'

export default {
  name: 'DetailPanelPreview',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    pageData: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  computed: {
    text() {
      if (!this.item.formatValue) {
        try {
          // eslint-disable-next-line
          return eval(`this.pageData.${this.item.key}`) || this.item.value || ''
        } catch (error) {
          return []
        }
      }
      return getTextRender(this.item.formatValue, this.pageData)
    }
  },  
  beforeDestroy() {
    // 代码组件 - 自定义生命周期 - 销毁前 created
    useCodeEvent(this.item, 'componentWillDestroy', this)(this.item, this.$store.getters['manage/idModule'])
  },
  mounted() {
    // 代码组件 - 自定义生命周期 - 初始化 created
    useCodeEvent(this.item, 'componentCreated', this)(this.pageData, this.item, this.$store.getters['manage/idModule'])
  }
}
</script>
<style lang="less">
.lego-panel-preview{
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0,0,0,.05);
  box-shadow: 4px 4px 40px rgba(0,0,0,.05);
  border-color: rgba(0,0,0,.05);
  margin: 10px 5px;
  &-icon{
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    -webkit-transition: all .38s ease-out;
    transition: all .38s ease-out;
    border-radius: 6px;
    &-img{
      float: left;
      width: 46px;
      height: 46px;
      vertical-align: -.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
  &-description{
    font-weight: 700;
    margin: 26px;
    margin-left: 0;
  }
  &-text{
    line-height: 18px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
  &-num{
    font-size: 20px;
  }
  .textAlign-left{
    text-align: left;
  }
  .textAlign-center{
    text-align: center;
  }
  .textAlign-right{
    text-align: right;
  }
}
</style>
