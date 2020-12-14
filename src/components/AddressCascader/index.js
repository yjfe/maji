/*
 * @Description:
 * @Author: yamanashi12
 * @Date: 2019-06-03 10:54:22
 * @LastEditTime: 2020-11-08 10:05:35
 * @LastEditors: Please set LastEditors
 */
import AddressCascader from './src/index.vue'

AddressCascader.install = (vue) => {
  vue.component(AddressCascader.name, AddressCascader)
}

export default AddressCascader
