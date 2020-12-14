import Pagination from './src/index.vue'

Pagination.install = (vue) => {
  vue.component(Pagination.name, Pagination)
}

export default Pagination
