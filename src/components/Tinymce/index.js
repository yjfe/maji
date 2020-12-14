/*
 * @Description:
 * @Author: yamanashi12
 * @Date: 2019-06-03 10:54:22
 * @LastEditTime: 2020-11-26 18:31:20
 * @LastEditors: Please set LastEditors
 */
import Tinymce from './src/index.vue'

Tinymce.install = (vue) => {
  vue.component(Tinymce.name, Tinymce)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  Tinymce.install(window.Vue)
}

export default Tinymce
