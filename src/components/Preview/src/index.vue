<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2018-10-29 16:30:28
 * @LastEditTime: 2020-11-08 15:06:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ElDialog :visible="visible" custom-class="dialog-preview" :before-close="handleClose">
    <ElCarousel
      ref="carousel"
      :initial-index="index"
      :interval="3000"
      :autoplay="false"
      :indicator-position="indicator ? 'none' : ''"
    >
      <ElCarousel-item v-for="(item, index) in list" :key="index">
        <button
          type="button"
          class="dialog-preview-image"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
        >
          <img
            :src="item"
            @mousedown="handleMouseDown"
            draggable="false"
            :style="
              `transform: scale(${imgScale})  rotate(${imgRotate}deg) translate(${translateX /
                imgScale}px, ${translateY / imgScale}px)`
            "
          />
        </button>
      </ElCarousel-item>
    </ElCarousel>
    <div class="dialog-preview-handle">
      <button type="button" class="dialog-preview-handle__button" @click="handleBigger">
        <i class="el-icon-minus" />
      </button>
      <button type="button" class="dialog-preview-handle__button" @click="handleSmaller">
        <i class="el-icon-plus" />
      </button>
      <button type="button" class="dialog-preview-handle__button" @click="handleReset">1:1</button>
      <button type="button" class="dialog-preview-handle__button" @click="handleRotate">
        <img :src="IconRotate" />
      </button>
    </div>
    <Indicator v-if="indicator" :list="list" :active-index="activeIndex" />
  </ElDialog>
</template>

<script>
import Indicator from './Indicator'
import IconRotate from './images/rotate.png'

export default {
  componentName: 'Preview',
  components: { Indicator },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
    },
    indicator: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(value) {
      if (!value) {
        this.$destroy()
      }
    },
    activeIndex() {
      // 切换后初始化比例和旋转
      this.imgScale = 1
      this.imgRotate = 0
      this.translateX = 0
      this.translateY = 0
    }
  },
  computed: {
    activeIndex() {
      return this.computedLock ? this.$refs.carousel.activeIndex : 0
    }
  },
  data() {
    return {
      computedLock: false,
      aciveIndex: 0,
      imgScale: 1,
      imgRotate: 0,
      mouseLock: false,
      mouseStart: {},
      translateX: 0,
      translateY: 0,
      timeout: null,
      IconRotate
    }
  },
  destroyed() {
    if (this.$el.parentNode) this.$el.parentNode.removeChild(this.$el)
  },
  mounted() {
    this.$nextTick(() => {
      this.computedLock = true
      window.event.returnValue = false
    })
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    /**
     * @description: 放大
     */
    handleBigger() {
      this.imgScale -= 0.1
    },
    /**
     * @description: 缩小
     */
    handleSmaller() {
      this.imgScale += 0.1
    },
    /**
     * @description: 重置大小
     */
    handleReset() {
      this.imgScale = 1
    },
    /**
     * @description: 旋转
     */
    handleRotate() {
      this.imgRotate += 90
      this.imgScale = 1
      this.translateX = 0
      this.translateY = 0
    },
    handleMouseDown(e) {
      this.mouseStart = {
        x: e.clientX,
        y: e.clientY,
        initX: this.translateX,
        initY: this.translateY
      }
      this.mouseLock = true
    },
    handleMouseMove(e) {
      if (!this.mouseLock) {
        return false
      }
      this.debounce(() => {
        const rotate = (this.imgRotate / 90) % 4
        let moveX = 0
        let moveY = 0
        switch (rotate) {
          case 0:
            moveX = e.clientX - this.mouseStart.x
            moveY = e.clientY - this.mouseStart.y
            break
          case 1:
            moveX = e.clientY - this.mouseStart.y
            moveY = this.mouseStart.x - e.clientX
            break
          case 2:
            moveX = this.mouseStart.x - e.clientX
            moveY = this.mouseStart.y - e.clientY
            break
          case 3:
            moveX = this.mouseStart.y - e.clientY
            moveY = e.clientX - this.mouseStart.x
            break
          default:
            break
        }
        this.translateX = this.mouseStart.initX + moveX
        this.translateY = this.mouseStart.initY + moveY
        // console.log(this.translateX, this.translateY)
      }, 20)
    },
    handleMouseUp() {
      this.mouseLock = false
    },
    /**
     * @description: 防抖
     */
    debounce(fn, wait) {
      if (this.timeout !== null) return
      fn()
      this.timeout = true
      setTimeout(() => {
        this.timeout = null
      }, wait)
    }
  }
}
</script>
<style lang="less">
@import '~styles/var.less';
.dialog-preview {
  margin-bottom: 0 !important;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: none;
  transform: none;
  top: 0 !important;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 0 !important;
  .el-dialog__header {
    border-bottom: 0;
  }
  &-image {
    height: 100%;
    width: 100%;
    background: transparent;
    border: 0;
    outline: none;
    -moz-user-select: none;
    img {
      transition: 0.2s;
      background: #fff;
      -moz-user-select: none;
      &:hover {
        cursor: move;
      }
    }
  }
  .el-dialog__body,
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
  .el-carousel,
  .el-carousel__container {
    height: 100%;
  }
  .el-carousel .el-carousel__arrow {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    font-size: 28px;
    background: #3b3b3a;
    &:hover {
      background: #505050;
    }
  }

  .el-dialog__headerbtn {
    right: 40px;
    top: 40px;
    position: absolute;
    z-index: 1000;
    font-size: 18px;
    color: #fff;
    .el-dialog__close {
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      font-size: 28px;
      background: #3b3b3a;
      color: @color-white;
      &:hover {
        background: #505050;
      }
    }
  }
  .dialog-preview-handle {
    position: absolute;
    left: 50%;
    bottom: 200px;
    width: 320px;
    transform: translateX(-50%);
    z-index: 100;
    text-align: center;
    display: flex;
    &__button {
      color: #ffffff;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #3b3b3a;
      font-size: 16px;
      box-shadow: none;
      border: 0;
      padding: 0;
      margin: 0 15px;
      outline: none;
      cursor: pointer;
      &:hover {
        background: #505050;
      }
    }
  }
}
</style>
