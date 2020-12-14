import XHeader from './src/index.vue'

XHeader.install = (vue) => {
  vue.component(XHeader.name, XHeader)
}

export default XHeader
