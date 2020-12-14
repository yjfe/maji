<template>
  <div class="content-box" :class="{ gap: gap }">
    <div class="fold-title font-title" :class="{ inner: inner }" v-if="fold" @click="handleClick"
      >{{ label }} <i class="el-icon-caret-bottom" :class="{ hide: !show }"
    /></div>
    <div class="title font-title" v-if="label && !fold" v-text="label" />
    <div
      :class="{ fold: fold, 'no-border': fold || label }"
      :style="`min-height: ${show ? `${height}px` : '0'};height: ${!show ? 0 : ''}`"
    >
      <div
        class="content-box__box"
        :class="{ hide: !show, isInner: inner }"
        :style="paddingClass"
        ref="box"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  componentName: 'ContentBox',
  props: {
    /**
     * @prop {String} label 标题
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * @prop {Boolean} fold 是否折叠
     */
    fold: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} inner 是否内部折叠
     */
    inner: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean, String} clearPadding padding清除，true是全部为0，单独方向清理left|right|top|bottom
     */
    clearPadding: {
      type: [Boolean, String],
      default: false
    },
    /**
     * @prop {Boolean} gap 上下间隙开关 默认15px
     */
    gap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true,
      loadend: false
    }
  },
  computed: {
    height() {
      if (this.loadend) {
        return this.$refs.box.clientHeight
      }
      return null
    },
    paddingClass() {
      if (this.clearPadding === true) {
        return 'padding: 0'
      } 
      if (typeof this.clearPadding === 'string') {
        return `padding-${this.clearPadding}: 0`
      }
      return ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadend = true
    })
  },
  methods: {
    handleClick() {
      this.show = !this.show
    }
  }
}
</script>
<style lang="less">
@import '~styles/var.less';
.content-box {
  padding: 0 15px;
  &.gap {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .fold-title {
    font-weight: bold;
    line-height: 50px;
    cursor: pointer;
    .el-icon-caret-bottom {
      line-height: 50px;
      float: right;
      transition: 0.3s;
    }
    .hide {
      transform-origin: center center; //旋转中心要是正中间 才行
      transform: rotate(-180deg);
      transition: 0.3s;
    }
    &.inner {
      background: #fff;
      padding: 0 20px;
      border-bottom: 1px solid @border-color-hover;
      &.isShow {
        border-bottom: 0;
      }
    }
  }
  .fold {
    transition: 0.3s;
    overflow: hidden;
  }
  &__box {
    padding: 15px 20px;
    margin-bottom: 10px;
    background: @color-white;
    transition: 0.3s;
    &.hide {
      transform: translateY(-100%);
    }
    &.isInner {
      border-top: 0 !important;
    }
    &::after {
      content: '';
      clear: both;
      display: table;
    }
    &.clearPadding {
      padding: 0;
    }
  }
  & + .content-box {
    & > .title {
      border-top: 1px solid @border-color-hover;
    }
    & > div > .content-box__box {
      border-top: 1px solid @border-color-hover;
      margin-bottom: 0;
    }
    & > .inner {
      border-top: 1px solid @border-color-hover;
    }
  }
  &:first-child {
    .content-box__box {
      margin-bottom: 0;
    }
  }
  .no-border {
    .content-box__box {
      border-top: 0;
      margin-bottom: 0;
    }
  }
  .title {
    font-weight: bold;
    background: @color-white;
    padding-left: 20px;
    line-height: 50px;
    font-weight: bold;
    border-bottom: 1px solid #eeeeee;
  }
}
</style>
