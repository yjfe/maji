<template>
  <div @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import Image from './Elimage'

export default {
  componentName: 'PreviewBox',
  props: {
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
        // eslint-disable-next-line
        new Vue({
          el: node,
          components: {
            XElImage: Image
          },
          data: () => ({
            visible: true,
            index: index,
            list: list
          }),
          mounted() {
            this.index = index
            this.$nextTick(() => {
              this.$refs.elImage.clickHandler()
              // handleClose = this.handleClose
            })
          },
          methods: {
            handleClose() {
              this.$destroy()
              const allElImage = document.querySelectorAll('.el-image')
              allElImage[allElImage.length - 1].remove()
            }
          },
          render(h) {
            return h('XElImage', {
              ref: 'elImage',
              props: {
                src: this.list[this.index],
                'preview-src-list': this.list
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
