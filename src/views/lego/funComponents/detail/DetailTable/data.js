/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 16:03:03
 * @LastEditors: Please set LastEditors
 */
import data from '../../list/Table/data'

export default {
  schema: {
    ...data.schema,
    type: 'DetailTable',
    height: ''
  },
  rules: data.rules
}
