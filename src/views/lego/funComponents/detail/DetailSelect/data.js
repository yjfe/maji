/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 16:00:20
 * @LastEditors: Please set LastEditors
 */
import data from '../../form/Select/data'

export default {
  schema: {
    ...data.schema,
    type: 'DetailSelect'
  },
  rules: data.rules
}
