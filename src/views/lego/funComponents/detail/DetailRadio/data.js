/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-08-27 17:01:58
 * @LastEditors: yamanashi12
 */
import data from '../../form/Radio/data'

export default {
  schema: {
    ...data.schema,
    type: 'DetailRadio'
  },
  rules: data.rules
}
