import ContentBox from './src/index.vue'

ContentBox.install = (vue) => {
  vue.component(ContentBox.name, ContentBox)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  ContentBox.install(window.Vue)
}

export default ContentBox
