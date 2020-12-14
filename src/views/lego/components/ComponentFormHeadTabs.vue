<template>
  <el-tabs v-model="activeName">
    <template v-for="item in tabsList">
      <el-tab-pane :key="item.value" :label="item.label" :name="item.value">
      </el-tab-pane>
    </template>
    
    <slot name="event" v-if="activeName === 'event'" />
    <AdvancedPropsPane v-else-if="activeName === 'advanced'"></AdvancedPropsPane>
    <template v-else>
      <slot name="base" />
      <slot name="styles" />
      <slot name="data" />
    </template>
  </el-tabs>
</template>
<script>
import AdvancedPropsPane from '@/views/lego/edit/components/AdvancedPropsPane'

export default {
  components: {
    AdvancedPropsPane
  },
  props: {
    hasAdvanced: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      activeName: 'base',
      tabsList: [],
      tabsEnums: [
        { 
          value: 'base',
          label: '基础信息'
        },
        // { 
        //   value: 'styles',
        //   label: '样式配置'
        // },
        // { 
        //   value: 'data',
        //   label: '数据配置'
        // },
        { 
          value: 'event',
          label: '事件'
        },
        { 
          value: 'advanced',
          label: '高级配置'
        }
      ]
    }
  },
  created() {
    this.tabsList = this.tabsEnums.filter(item => this.$slots[item.value] || (this.hasAdvanced && item.value === 'advanced'))
  }
}
</script>
