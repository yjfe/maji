<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import Preview from '../../Preview'

export default {
  componentName: 'PreviewBox',
  props: {
    /**
     * @prop {Boolean} indicator 开启底部缩略图  默认: true
     */
    indicator: {
      type: Boolean,
      default: true
    }
    // only: {
    //   type: Boolean,
    //   default: false
    // }
  },
  methods: {
    handleClick(e) {
      if (/^img$/i.test(e.target.nodeName)) {
        e.preventDefault()
        e.stopPropagation()
        const list = []
        let index = 0

        Array.from(this.$el.querySelectorAll('img')).forEach((item, i) => {
          if (item === e.target) {
            index = i
          }
          list.push(item.getAttribute('data-src') || item.src)
        })
        const node = document.createElement('div')
        document.body.appendChild(node)
        // eslint-disable-next-line no-new
        new Vue({
          el: node,
          components: {
            Preview
          },
          data: () => ({
            visible: true,
            index: index,
            list: list
          }),
          mounted() {
            this.index = index
          },
          methods: {
            handleClose() {
              this.$destroy()
            }
          },
          render(h) {
            return h('Preview', {
              props: {
                visible: this.visible,
                index: this.index,
                list: this.list,
                indicator: this.indicator
              },
              on: {
                close: this.handleClose
              }
            })
          }
        })
      }
    }
  }
}
</script>
