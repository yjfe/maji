<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-17 16:46:01
 * @LastEditTime: 2020-07-13 17:00:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="preview-box-item" 
      v-for="(item, index) in floorList" 
      :key="item" 
      :class="{'preview-active': index === activeIndex || moveEnd === item || activeId === item}"
      v-dragging="{ item: item, group: 'addModule', type: 'sort' }"
      @click="handleIndex(index, item)">
      <div class="preview-box-item__id" v-text="item"></div>
      <div class="preview-box-item__remove" @click.stop="handleRemove(item)">
        <i class="el-icon-minus" />
      </div>
      <FreeComponentsId v-if="!!item" :moduleId="item" :key="item" :index="index"/>
    </div> 
  </div>
</template>
<script>
import FreeComponentsId from '@/views/lego/components/FreeComponentsId'

export default {
  name: 'ExprotComponent',
  componentName: 'ExprotComponent',
  components: {
    FreeComponentsId 
  },
  props: {
    floorList: {
      type: Array,
      default() {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: null
    },
    activeId: {
      type: String,
      default: ''
    },
    moveEnd: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleRemove(item) {
      this.$emit('remove', item)
    },
    handleIndex(index, item) {
      this.$emit('select', {
        index,
        item
      })
    }
  }
}
</script>
