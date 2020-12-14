<template>
  <div class="preview-indicators">
    <div class="arrow-button" @click="handleClickPrev">
      <i class="el-icon-arrow-left" />
    </div>
    <div class="preview-indicators__mind" ref="mind">
      <div class="maxWidth" :style="`transform: translateX(-${translateX}px`">
        <li v-for="(item, index) in list" :key="index" :class="{ active: activeIndex === index }">
          <button type="button" @click="handleClick(index)">
            <img :src="item" draggable="false" />
          </button>
        </li>
      </div>
    </div>
    <div class="arrow-button" @click="handleClickNext">
      <i class="el-icon-arrow-right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      maxWidth: 0,
      mindWidth: 0,
      pageItem: 0
    }
  },
  computed: {
    translateX() {
      const half = Math.ceil(this.pageItem / 2)
      if (this.activeIndex + 1 >= this.pageItem - half) {
        const translateX = 220 * (this.activeIndex - half)
        return translateX > 0 ? translateX : 0
      }
      return 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.maxWidth = this.list.length * 220 - 10
      this.mindWidth = this.$refs.mind.offsetWidth
      this.pageItem = Math.floor(this.mindWidth / 220)
    })
  },
  methods: {
    handleClick(index) {
      // console.log(this.$parent.$parent)
      this.$parent.$parent.$refs.carousel.setActiveItem(index)
    },
    handleClickPrev() {
      this.$parent.$parent.$refs.carousel.prev()
    },
    handleClickNext() {
      this.$parent.$parent.$refs.carousel.next()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~styles/var.less';
.preview-indicators {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 180px;
  z-index: 200;
  padding: 30px 12px;
  display: flex;
  background: rgba(34, 37, 39, 0.7);
  .arrow-button {
    width: 55px;
    height: 120px;
    background: #000;
    line-height: 120px;
    font-size: 60px;
    &:hover {
      cursor: pointer;
      background: #505050;
    }
  }
  &__mind {
    flex: 1;
    overflow: hidden;
    margin: 0 20px;
    .maxWidth {
      white-space: nowrap;
      transition: 0.5s;
      animation-duration: 0.5s;
    }
    li {
      width: 210px;
      height: 120px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-align: center;
      margin-left: 10px;
      transition: 0.3s;
      border: 5px solid transparent;
      &:hover,
      &.active {
        border: 5px solid @color-primary;
      }
      button {
        border: 0;
        padding: 0;
        background: #d8d8d8;
        height: 100%;
        width: 100%;
        outline: none;
        cursor: pointer;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
