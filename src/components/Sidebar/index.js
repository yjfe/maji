import Sidebar from './src/index.vue'

Sidebar.install = (vue) => {
  vue.component(Sidebar.name, Sidebar)
}

export default Sidebar
