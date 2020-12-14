export default {
  name: 'PreviewTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    }
  },
  render() {
    let { location } = this
    let template
    if (!this.title) location = ''
    switch (location) {
      case 'top': 
        template = <div class="preview-table"><div class="preview-table-title-top">{this.title}</div>{this.$slots.default}</div>
        break
      case 'left': 
        template = <div class="preview-table"><div class="preview-table-title-left">
          {this.title}：</div><div class="preview-table-title-left-content">{this.$slots.default}</div></div>
        break
      default: 
        template = <div class="preview-table">{this.$slots.default}</div>
        break
    }
    return template
  }
}
