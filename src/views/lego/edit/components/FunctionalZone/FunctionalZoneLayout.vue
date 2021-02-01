<!--
 * @Description:
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-25 15:23:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="functional-zone-layout">
    <div class="functional-zone-layout-box">
      <template v-if="formItems.length > 0">
        <div class="title">表单组件</div>
        <FunctionalZoneItem :list="formItems" :componentsInfo="componentsInfo" v-on="$listeners" @click="handleClick" />
      </template>
      <template v-if="detailItems.length > 0">
        <div class="title">详情组件</div>
        <FunctionalZoneItem :list="detailItems" :componentsInfo="componentsInfo" v-on="$listeners" @click="handleClick" />
      </template>
      <template v-if="layoutItems.length > 0">
        <div class="title">布局组件</div>
        <FunctionalZoneItem :list="layoutItems" :componentsInfo="componentsInfo" v-on="$listeners" @click="handleClick" />
      </template>
      <template v-if="listItems.length > 0">
        <div class="title">列表页组件</div>
        <FunctionalZoneItem :list="listItems" :componentsInfo="componentsInfo" v-on="$listeners" @click="handleClick" />
      </template>
      <template v-if="privateItems.length > 0">
        <div class="title">业务组件</div>
        <FunctionalZoneItem :list="privateItems" :componentsInfo="componentsInfo" v-on="$listeners" @click="handleClick" />
      </template>
    </div>
  </div>
</template>
<script>
import manageJson from '@/views/lego/funComponents/manage.json'
import { cloneDeep } from '@/utils'
import { getComponentData } from '@/views/lego/utils'
import FunctionalZoneItem from './FunctionalZoneItem'
import validatorBase from '../ValidatorDialog/data'

export default {
  name: 'FunctionalZoneLayout',
  components: {
    FunctionalZoneItem
  },
  props: {
    formItems: { // 表单页组件
      type: Array,
      default() {
        return []
      }
    },
    layoutItems: { // 布局组件
      type: Array,
      default() {
        return []
      }
    },
    privateItems: { // 业务私有组件
      type: Array,
      default() {
        return []
      }
    },
    listItems: { // 列表页组件
      type: Array,
      default() {
        return []
      }
    },
    detailItems: { // 详情组件
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo
    }
  },
  methods: {
    /**
     * @description: 点击功能组件 新增
     * @param {type} 
     * @return: 
     */
    handleClick(item) {
      try {
        const { id, baseData } = getComponentData(item)
        const addData = {
          data: Object.assign(baseData, cloneDeep(validatorBase), { id }),
          id
        }
        this.$emit('select', addData)
      } catch (error) {
        console.error(error)
        console.error(`找不到${item}的data.js`)
      }
    },
    /**
     * @method: 获取组件ID
     * @param type {String} 类型
     * @return:
     * @Author: yamanashi12
     * @Date: 2019-05-17 17:59:19
      */
    getComponentId(type) {
      return `${type}${new Date().getTime()}`
    }
  }
}
</script>

<style lang="less">
@import '~styles/var';
.functional-zone-layout{
  &-box{
    background: @color-white;
  }
  .title{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 14px;
  }
  .fixedFloor{
    margin: 0 20px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid @border-color-base;
    &:last-child{
      border-bottom: 0;
    }
    li{
      width: 70px;
      height: 70px;
      display: inline-table;
      margin: 5px;
      &:hover{
        cursor: pointer;
        p, i{
          color: @color-primary !important;
        }
      }
      img{
        height: 20px;
      }
      .middle{
        width: 69px;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        i{
          color: @color-black-base;
          font-size: 24px;
        }
        p{
          width: 69px;
          margin: 0;
          margin-top: 5px;
          color: @color-black-base;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
      }
    }
  }
}
</style>
