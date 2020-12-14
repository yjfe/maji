import Preview from './src/index.vue'

Preview.install = (vue) => {
  vue.component(Preview.name, Preview)
}

export default Preview
