import Vue from 'vue'
import EventCodeEdit from './index.vue'

export default function EditCode(code, info) {
  return new Promise((resolve) => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    new Vue({ // eslint-disable-line
      el: node,
      components: {
        EventCodeEdit
      },
      data() {
        return {
          code,
          info
        }
      },
      methods: {
        handleChange(code) {
          if (code) {
            resolve(code)
          }
        },
        handleClose() {
          this.$destroy()
          const dom = document.querySelectorAll('.event-code-edit')[0]
          dom.remove()
        }
      },
      render() {
        return <EventCodeEdit 
          code={this.code} 
          eventInfo={this.info} 
          onClose={this.handleClose}
          onChange={this.handleChange} />
      }
    })
  })
}
