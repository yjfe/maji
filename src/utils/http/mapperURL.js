/**
 * URL 映射
 */
let mapper = {
  txy: '//loacalhost' // 域名
}
const prefix = process.env.NODE_ENV === 'development' ? '' : ''
mapper = Object.keys(mapper).reduce((o, k) => {
  // o[k] = `${prefix}/${mapper[k]}`
  o[k] = `${mapper[k]}`
  return o
}, {})

export default (url) => {
  // mocks 不做映射
  if (url.indexOf('mocks') >= 0 && url.indexOf('mocks') < 2) {
    return url
  }
  // https或http 不做映射
  if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0 || url.indexOf('//') === 0) {
    return url
  }
  const arr = url.split('/')
  // 如果找到匹配的
  const matchValue = arr.length > 2 && mapper[arr[0]]
  if (matchValue) {
    return url.replace(arr[0], mapper[arr[0]], matchValue)
  }
  if (url.charAt(0) === '/') {
    url = `/${prefix}${url}`
  } else {
    url = `/${prefix}/${url}`
  }
  url = url.replace('//', '/')
  return url
}
