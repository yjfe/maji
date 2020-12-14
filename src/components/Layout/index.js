import Layout from './src/index.vue'

Layout.install = (vue) => {
  vue.component(Layout.name, Layout)
}

export default Layout
