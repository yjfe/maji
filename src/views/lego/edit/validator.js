/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-06-25 15:39:24
 * @LastEditTime: 2020-10-22 14:44:01
 * @LastEditors: Please set LastEditors
 */
import AsyncValidator from 'async-validator'
import { getComponentFile } from '@/views/lego/utils'

/**
 * @method: 获取组件规则
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-26 17:03:33
 */
export function getRules(type) {
  try {
    const { rules } = getComponentFile(type, 'data')
    return rules
  } catch (error) {
    return {}
  }
}

/**
 * @method: 处理校验
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-26 17:03:42
 */
export function validate(moduleItem) {
  return new Promise((resolve) => {
    // 获取默认验证规则
    const rules = getRules(moduleItem.type)
    Object.keys(rules).forEach((key) => {
      const rule = Array.isArray(rules[key]) ? rules[key] : [rules[key]]
      rule.forEach((item) => {
        if (typeof item.validator === 'function') {
          item.validator = item.validator.bind(moduleItem)
        }
      })
    })
    // new AsyncValidator 校验方法
    const validator = new AsyncValidator(rules)
    validator.validate(moduleItem, {}, (errors, invalidFields) => {
      resolve({
        type: moduleItem.type,
        id: moduleItem.id,
        invalidFields
      })
    })
  })
}

/**
 * @method: 处理全部表单数据，分拆校验
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-06-26 17:03:49
 */
export function checkFormValidate(model) {
  return new Promise((resolve, reject) => {
    const validateAll = []
    Object.keys(model).forEach(item => validateAll.push(validate(model[item])))
    Promise.all(validateAll).then((result) => {
      const total = {}
      result.forEach((item) => {
        if (item.invalidFields) {
          total[item.id] = { type: item.type, message: item.invalidFields }
        }
      })
      resolve(total)
    }).catch((error) => {
      reject(error)
    })
  })
}
