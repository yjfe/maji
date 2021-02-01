/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2021-01-20 16:01:07
 * @LastEditors: Please set LastEditors
 */
import data from '../../form/Checkbox/data'

export default {
  schema: {
    ...data.schema,
    type: 'DetailCheckbox'
  },
  rules: data.rules
}
