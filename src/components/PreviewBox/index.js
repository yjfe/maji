import PreviewBox from './src/index.vue'

PreviewBox.install = (vue) => {
  vue.component(PreviewBox.name, PreviewBox)
}

export default PreviewBox
