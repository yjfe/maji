/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-01-25 14:43:48
 * @LastEditTime: 2020-11-26 15:17:50
 * @LastEditors: Please set LastEditors
 */
const pattern = {
  // eslint-disable-next-line
  keyCode: /^[a-zA-Z]+[a-zA-Z0-9\_\.]*[a-zA-Z0-9]+$/,
  // eslint-disable-next-line
  ip: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|30|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  phone: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  familyPhone: /^0\d{2,3}-?\d{7,8}$/, // 座机
  password: /^[a-zA-Z0-9_]+$/,
  nickname: /^[A-Za-z0-9_、.\u4e00-\u9fa5]{4,20}$/,
  intadd: /^(0|[1-9][0-9]*)$/,
  username: /^[a-zA-Z\u4e00-\u9fa5\s]{1,20}$/,
  letterNumber: /^[0-9a-zA-Z]*$/,
  idNo: /^[A-Za-z0-9]+$/
}

export default {
  pattern,
  rule: {
    email: {
      pattern: pattern.email,
      message: '邮箱格式不正确'
    },
    phone: {
      pattern: pattern.phone,
      message: '电话号码格式不正确'
    },
    mobile: {
      pattern: pattern.mobile,
      message: '手机号码格式不正确'
    },
    password: {
      pattern: pattern.password,
      message: '密码格式不正确'
    },
    nickname: {
      pattern: pattern.nickname,
      message: '昵称格式不正确'
    },
    ip: {
      pattern: pattern.ip,
      message: '身份证号不合法'
    },
    username: {
      pattern: pattern.username,
      message: '姓名格式不正确'
    },
    isPhone: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.phone.test(value)) {
            callback()
          }
          callback(new Error('请输入正确的手机号!'))
        }
        callback()
      }
    },
    isLandline: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.familyPhone.test(value)) {
            callback()
          }
          callback(new Error('请输入正确的座机号!'))
        }
        callback()
      }
    },
    isPhoneAndLandline: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.phone.test(value)) {
            callback()
          } else if (pattern.familyPhone.test(value)) {
            callback()
          }
          callback(new Error('请输入正确的手机号或座机号!'))
        }
        callback()
      }
    },
    isEmail: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.email.test(value)) {
            callback()
          }
          callback(new Error('请输入正确的邮箱!'))
        }
        callback()
      }
    },
    isPassword: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.password.test(value)) {
            callback()
          }
          callback(new Error('请输入格式正确的密码!'))
        }
        callback()
      }
    },
    idNo: {
      pattern: pattern.idNo,
      message: '输入的证件号不符合规则'
    },
    account: { // phoneAndEmail
      validator(rule, value, callback) {
        if (value) {
          if (pattern.email.test(value) || pattern.phone.test(value)) {
            callback()
          }
          callback(new Error(this.message))
        }
        callback()
      },
      message: '请输入正确的邮箱或者手机号!'
    },
    nickName: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.nickname.test(value)) {
            callback()
          }
          callback(new Error('请输入符合规范的昵称!'))
        }
        callback()
      }
    },
    userName: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.username.test(value)) {
            callback()
          }
          callback(new Error('该姓名含非法字符，请使用中英文!'))
        } else {
          callback()
        }
      }
    },
    isIntadd: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.intadd.test(value)) {
            callback()
          }
          callback(new Error('请输入正整数!'))
        }
        callback()
      }
    },
    emptyArray: { // 数组索引全为空校验
      validator(rule, value, callback) {
        if (value && value instanceof Array && value.some(item => !!item)) {
          callback()
        }
        callback(new Error(this.message))
      },
      message: '不能为空'
    },
    amountNumber: {
      validator(rule, value, callback) {
        if (value) {
          // console.log(Number.isInteger(Number(value)))
          if (value >= 4 && value <= 8 && Number.isInteger(Number(value))) {
            callback()
          }
          callback(new Error(this.message))
        }
        callback()
      }
    },
    isTwoPower: {
      validator(rule, value, callback) {
        if (value) {
          const isTwoPower = Math.log(value) / Math.log(2)
          // console.log(Number.isInteger(isTwoPower))
          if (Number.isInteger(isTwoPower) && isTwoPower > 0) {
            callback()
          }
          callback(new Error(this.message))
        }
        callback()
      }
    },
    cannotBeEmpty: { // 数组每一个都不能为空
      validator(rule, value, callback) {
        if (value && value instanceof Array && value.every(item => item.length > 0)) {
          callback()
        }
        callback(new Error(this.message))
      },
      message: '不能为空'
    },
    letterNumber: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.letterNumber.test(value)) {
            callback()
          }
          callback(new Error('请输入字母或数字!'))
        }
        callback()
      }
    },
    idCard: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.ip.test(value)) {
            callback()
          }
          callback(new Error('身份证格式不正确!'))
        } else {
          callback()
        }
      }
    },
    isHttp: { // http
      validator: (rule, value, callback) => {
        if (value && !/^(http):\/\/.*/.test(value)) {
          callback(new Error('请填写是http://的链接地址'))
        }
        callback()
      }, 
      trigger: 'blur' 
    },
    isHttps: { // https
      validator: (rule, value, callback) => {
        if (value && !/^(https):\/\/.*/.test(value)) {
          callback(new Error('请填写是https://的链接地址'))
        }
        callback()
      }, 
      trigger: 'blur' 
    },
    isHttpAndHttps: { // http and https
      validator: (rule, value, callback) => {
        if (value && !/^(https|http):\/\/.*/.test(value)) {
          callback(new Error('请填写是http或https的链接地址'))
        }
        callback()
      }, 
      trigger: 'blur' 
    },
    keyCode: {
      pattern: pattern.keyCode,
      message: '请输入正确的格式，以字母开头，只能包含字母、数字、“.”、”_”'
    },
    isIp: {
      validator(rule, value, callback) {
        if (value) {
          if (pattern.ip.test(value)) {
            callback()
          }
          callback(new Error('号码有误，请仔细核对后重新输入!'))
        } else {
          callback()
        }
      }
    },
    passwordNumber: {
      pattern: /^[0-9]*$/,
      message: '密码只能是数字'
    },
    passwordNumbera: {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{0,999}$/,
      message: '请输入数字和字母的组合'
    },
    passwordNumberAa: {
      pattern: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{0,999}$/,
      message: '请输入数字和大小写字母的组合'
    }
  }
}
