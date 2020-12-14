/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:18:19
 * @LastEditTime: 2019-09-11 17:44:17
 * @LastEditors: Please set LastEditors
 */
import data from '../../list/Table/data'

export default {
  baseData: {
    ...data.baseData,
    type: 'DetailTable',
    height: ''
  },
  rules: data.rules
}
