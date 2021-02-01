import { Image } from 'element-ui'

let prevOverflow = ''

export default {
  mixins: [Image],
  methods: {
    clickHandler() {
      // prevent body scroll
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      this.showViewer = true
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow
      this.showViewer = false
      this.$emit('close')
    }
  }
}
