import Pagination from './Pagination'
import ContentBox from './ContentBox'
import Cellbox from './Cellbox'
import CellItem from './CellItem'

const components = {
  Pagination,
  Cellbox,
  CellItem,
  ContentBox
}

const install = (Vue) => {
  // 判断是否安装
  if (install.installed) {
    return
  }
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
