<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-22 14:35:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="">
    <component :is="`Preview${item.type}`" :item="item" :index="index"></component>
  </div>
</template>
<script>
import Vue from 'vue'
import manageJson from '@/views/lego/funComponents/manage.json'
import { getComponentFile } from '@/views/lego/utils'

export default {
  name: 'FreeComponents',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo
    }
  },
  created() {
    if (!Vue.component(`Preview${this.item.type}`)) {
      Vue.component(`Preview${this.item.type}`, getComponentFile(this.item.type, 'Preview'))
    }
  }
}
</script>
