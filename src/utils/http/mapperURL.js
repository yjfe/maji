/**
 * URL 映射
 */
let mapper = {
  // txy: 'https://wei-1g2pttqj973937f8-1300184316.ap-shanghai.service.tcloudbase.com' // 个人
  txy: 'https://node-generate-7glxke4qc18d7586-1254201734.ap-shanghai.service.tcloudbase.com' // 公司
}
const prefix = process.env.NODE_ENV === 'development' ? '' : ''
mapper = Object.keys(mapper).reduce((o, k) => {
  // o[k] = `${prefix}/${mapper[k]}`
  o[k] = `${mapper[k]}`
  return o
}, {})

function isJDY(url, options = {}) {
  if (options.JDY) {
    return `${url}?method=${options.JDY}`
  }
  return url
}

export default (url, options) => {
  // mocks 不做映射
  if (url.indexOf('mocks') >= 0 && url.indexOf('mocks') < 2) {
    return isJDY(url, options)
  }
  // https或http 不做映射
  if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0 || url.indexOf('//') === 0) {
    return isJDY(url, options)
  }
  const arr = url.split('/')
  // 如果找到匹配的
  const matchValue = arr.length > 2 && mapper[arr[0]]
  if (matchValue) {
    return isJDY(url.replace(arr[0], mapper[arr[0]], matchValue))
  }
  if (url.charAt(0) === '/') {
    url = `/${prefix}${url}`
  } else {
    url = `/${prefix}/${url}`
  }
  url = url.replace('//', '/')
  return isJDY(url, options)
}
