/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-02 17:35:50
 * @LastEditTime: 2020-12-09 11:10:30
 * @LastEditors: Please set LastEditors
 */
import * as httpAgent from '@/utils/http'
import validator from '@/utils/validator'
import { apiResolver } from '@/views/lego/utils/apiResolver'

class formRules {
  static addFormRules(list) {
    for (const id in list) {
      const item = list[id]
      if (item.validator && item.validator.checked && item.validator.checked.length > 0) {
        const rules = []
        item.validator.checked.forEach((checked) => {
          rules.push(this.addRule(item, checked))
        })
        item.validator.rules = rules
      }
    }
    return list
  }
  
  static addRule(item, ruleKey = '') {
    let rule = {}
    switch (ruleKey) {
      case 'required':
        rule = { required: true, message: item.validator.message.required, trigger: 'blur' }
        // if ((item.optionsType === 2 && item.valueType === 'number') || item.type === 'InputNumber') {
        if (Array.isArray(item.value)) {
          rule.type = 'array'
        } else if ((item.valueType === 'number' && item.optionsType !== 1) || item.type === 'InputNumber') {
          rule.type = 'number'
        }
        break
      case 'maxLength':
        rule = { max: item.validator.params.maxLength, message: `限制字符或数组长度最大${item.validator.params.maxLength}位`, trigger: 'blur' }
        Object.assign(item, { textMaxLength: item.validator.params.maxLength })
        break
      case 'minLength':
        rule = { min: item.validator.params.minLength, message: `限制字符或数组长度最小${item.validator.params.minLength}位`, trigger: 'blur' }
        break
      case 'phoneNumber':
        // eslint-disable-next-line
        const numberEnum = {
          mobile: 'isPhone',
          tel: 'isLandline',
          all: 'isPhoneAndLandline'
        }
        rule = validator.rule[numberEnum[item.validator.params.phoneNumber]]
        break
      case 'email':
        rule = validator.rule.isEmail
        break
      case 'ip':
        rule = validator.rule.isIp
        break
      case 'web':
        // eslint-disable-next-line
        const webEnum = {
          http: 'isHttp',
          https: 'isHttps',
          all: 'isHttpAndHttps'
        }
        rule = validator.rule[webEnum[item.validator.params.web]]
        break
      case 'characters':
        rule = validator.rule.isCharacters
        break
      case 'apiCheck':
        // http
        rule = {  
          validator: (_rule, value, callback) => {
            // 空值不做检验
            if (!value) callback()
            // 校验规则 开始
            const formData = {}
            formData[item.validator.params.apiCheckKey] = value
            const { 
              url,
              type,
              requestQuery,
              option 
            } = apiResolver(item.validator.params.apiCheck)
            httpAgent[type](
              url, 
              { ...formData, ...requestQuery }, 
              { 
                context: this, 
                errorMsg: 'none', 
                noAuth: true, 
                ...option 
              }
            ).then(() => {
              // 请求成功 code非0都ok
              callback()
            }).catch((error) => {
              callback(new Error(error.responseText || error.errorMessage || '网络错误'))
            })
          }, 
          trigger: 'blur' 
        }
        break
      case 'regex':
        // 正则
        rule = {
          validator: (rule, value, callback) => {
            let reg
            try {
              // eslint-disable-next-line 
              reg = eval(item.validator.params.regex)
            } catch {
              throw new Error(`配置错误：正则表达式错误 -> ${item.id}`)
            }
            if (!reg.test(value)) {
              callback(new Error(item.validator.message.regex))
            }
            callback()
          }, 
          trigger: 'blur' 
        }
        break
      case 'password':
        // eslint-disable-next-line
        const passwordEnum = {
          number: 'passwordNumber',
          numbera: 'passwordNumbera',
          numberAa: 'passwordNumberAa'
        }
        rule = validator.rule[passwordEnum[item.validator.params.password]]
        break
      default:
        break
    }
    return rule
  }
}

export default formRules
