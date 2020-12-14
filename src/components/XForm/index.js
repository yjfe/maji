import XForm from './src/index.vue'

XForm.install = (vue) => {
  vue.component(XForm.name, XForm)
}

export default XForm
