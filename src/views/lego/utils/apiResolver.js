/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-08-26 15:43:30
 * @LastEditTime: 2020-12-01 15:11:37
 * @LastEditors: Please set LastEditors
 */
window.envApiConfig = {}

// http方法的option参数配置
const optionKey = {
  XTimeout: 'timeout',
  XCache: 'cache',
  XType: 'type'
}

/**
 * @method: 获取参数解析
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-12 17:10:02
 */
function GetQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
  const r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

export function getRequestQuery(urlStr) {
  const url = urlStr.split('?')
  const queryStr = url[1]
  if (queryStr) {
    const theRequest = {}
    const strs = queryStr.split('&')
    for (let i = 0; i < strs.length; i++) {
      const [key] = strs[i].split('=')
      theRequest[key] = decodeURI(strs[i].substr(key.length + 1))
    }
    return {
      requestUrl: url[0],
      query: theRequest
    }
  }
  return {
    requestUrl: urlStr,
    query: {}
  }
}

/**
 * @method: 初始化环境变量
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-12 17:10:10
 */
export function install(data) {
  Object.assign(window.envApiConfig, data)
}

/**
 * @method: url转换配置变量拼接
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-12 17:11:01
 */
export function mapperENV(url) {
  const env = GetQueryString('env') || window.globalConfig.env
  // //开头直接请求
  if (/^(http:\/\/|https:\/\/|\/\/)/.test(url)) {
    return url
  }
  try {
    // 处理环境变量
    const project = url.split('/')[0]
    let mapperUrl = url.replace(`${project}/`, '')
    try {
      mapperUrl = `//${window.envApiConfig[project][env || 'tx']}/${mapperUrl}`
    } catch (error) {
      // 跟在当前域名后
      mapperUrl = `${url}`
      // 关闭开发走代理
      // if (process.env.NODE_ENV === 'development') { // 开发环境加api
      //   mapperUrl = `${window.origin}/api${url}`
      // }
    }
    return mapperUrl
  } catch (error) {
    console.error('请求错误，请检查url参数')
    return ''
  }
}

/**
 * @method: 清理环境变量
 * @param {type} 
 * @return: 
 * @Author: yamanashi12（yamanashi12@qq.com）
 * @Date: 2019-09-12 17:10:53
 */
export function clear() {
  window.envApiConfig = {}
}

export function apiResolver(url) {
  if (!url) return false
  const type = ['POST', 'GET', 'PUT', 'DELETE']
  let data
  let hasType = false
  type.forEach((item) => {
    // eslint-disable-next-line 
    const reg = eval(`/^${item}:/`)
    if (!hasType && reg.test(url)) {
      data = {
        url: mapperENV(url.replace(reg, '')),
        type: item
      }
      hasType = true
    }
  })
  const res = data || {
    url: mapperENV(url),
    type: 'POST'
  }
  const { query, requestUrl } = getRequestQuery(res.url)
  // 处理http的opitons参数
  const option = {}
  Object.keys(optionKey).forEach((item) => {
    if (query[item] !== undefined) {
      option[optionKey[item]] = query[item]
      delete query[item]
    }
  })
  return {
    ...res,
    url: requestUrl.replace('////', '//'),
    requestQuery: query,
    option
  }
}
