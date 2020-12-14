<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 15:06:23
 * @LastEditTime: 2019-09-16 16:36:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <LegoMixin :pageOption="pageOption">
    <div slot="SlotProductName">
      sdfsdfdS
    </div>
    <div slot="SlotInputName" >
      3123123
    </div>
  </LegoMixin>
</template>
<script>
import LegoMixin from './LegoMixin'
import data from './data'

export default {
  name: 'legoView',
  components: { LegoMixin },
  data() {
    return {
      pageOption: data
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
