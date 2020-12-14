import Wrapper from './src/index.vue'

Wrapper.install = (vue) => {
  vue.component(Wrapper.name, Wrapper)
}

export default Wrapper
