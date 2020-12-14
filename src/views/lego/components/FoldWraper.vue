<template>
  <div class="fold-wraper" v-if="systemLevel >= level">
    <h3 class="fold-wraper-title" @click="show = !show">
      {{label}}
      <span :class="`el-icon-arrow-${show?'down':'up'}`" />
    </h3>
    <div class="fold-wraper-content" v-show="show">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FoldWraper',
  computed: {
    ...mapState({
      systemLevel: state => state.manage.level
    })
  },
  props: {
    label: String,
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      show: true
    }
  }
}
</script>
<style lang="less" scoped>
  .fold-wraper{
    &-title{
      font-size: 12px;
      font-weight: bold;
      margin-top: 0;
      padding-top: 12px;
      height: 38px;
      line-height: 12px;
      margin-bottom: 0;
      cursor: pointer;
    }
    &-content{
    }
  }
</style>
