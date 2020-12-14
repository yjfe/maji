import XBody from './src/index.vue'

XBody.install = (vue) => {
  vue.component(XBody.name, XBody)
}

export default XBody
