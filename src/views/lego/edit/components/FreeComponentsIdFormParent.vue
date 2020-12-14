<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2020-10-22 14:38:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <component :is="`Preview${nowItem.type}`" :item="nowItem" :index="index" v-bind="$attrs" v-on="$listeners"></component>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import manageJson from '@/views/lego/funComponents/manage.json'
import { getComponentFile } from '@/views/lego/utils'

export default {
  name: 'FreeComponentsId',
  componentName: 'FreeComponentsId',
  props: {
    moduleId: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      componentsInfo: manageJson.componentsInfo,
      nowItem: {}
    }
  },
  computed: {
    ...mapState({
      idModule: state => state.manage.idModule
    })
  },
  created() {
    this.nowItem = this.idModule[this.moduleId]
    if (!Vue.component(`Preview${this.nowItem.type}`)) {
      // eslint-disable-next-line
      Vue.component(`Preview${this.nowItem.type}`, getComponentFile(this.nowItem.type, 'Preview'))
    }
  }
}
</script>
