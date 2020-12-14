import axios from 'axios'
import sha1 from 'sha-1'
import setHeaders from './setHeaders'
import repsonseSideEffect from './repsonseSideEffect'
import repsonseFilters from './repsonseFilters'
import * as httpCache from './httpCache'
import * as httpQueue from './httpQueue'

// 创建axios实例
const service = axios.create({
  timeout: 3 * 1000, // 请求超时时间
  withCredentials: true,
  headers: {
    // connection: 'keep-alive',
    // 'x-requested-with': 'XMLHttpRequest',
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
})

// request拦截器
service.interceptors.request.use((config) => {
  const { options = {} } = config
  // 重设超时时间
  config.timeout = options.timeout || config.timeout
  // context default action
  if (/^(post)|(put)|(delete)$/i.test(config.method)) { // 处理POST请求默认行为
    if (typeof config.data === 'object' && options.type === 'formData') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      // 处理formdata格式
      config.transformRequest = [(data) => {
        let ret = ''
        for (const it in data) {
          ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
        }
        return ret
      }]
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    // 拦截器 - 开始状态
    repsonseSideEffect('start', config)
  }
  return config
}, (error) => {
  const errorInfo = {
    status: error.request.status,
    options: error.config.options,
    error,
    message: error.message
  }
  // 过滤器处理数据
  repsonseFilters(error.config.options, errorInfo)
  // 成功处理队列回调
  httpQueue.handleCallbackQueue({
    key: error.config.key, 
    error: errorInfo,
    type: 'reject'
  })
  return Promise.reject(errorInfo)
})

// response拦截器
service.interceptors.response.use(
  (res) => {
    const { options = {} } = res.config
    try {
      const resolveData = repsonseFilters(res.config, res)
      // 成功处理队列回调
      httpQueue.handleCallbackQueue({
        key: res.config.key, 
        data: resolveData,
        type: 'resolve'
      })
      // 需要缓存
      if (options.cache) {
        httpCache.setCacheData(res.config.key, res.data, options.cache)
      }
      repsonseSideEffect('complete', {
        options: options,
        data: resolveData
      })
      return resolveData
    } catch (error) {
      console.log(error)
      // 错误处理
      repsonseSideEffect('filterError', {
        options: error.response.config.options,
        data: error.response.data,
        error
      })
      // 销毁进行队列
      httpQueue.handleCallbackQueue({
        key: res.config.key, 
        error,
        type: 'reject'
      })
      return Promise.reject(error)
    }
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  (error) => {
    const errorInfo = {
      status: error.request.status,
      options: error.config.options,
      error,
      message: error.message
    }
    repsonseFilters(error.config.options, errorInfo)
    // 成功处理队列回调
    httpQueue.handleCallbackQueue({
      key: error.config.key, 
      error: errorInfo,
      type: 'reject'
    })
    return Promise.reject(errorInfo)
  }
)

const httpCore = async (config) => {
  const { options = {} } = config
  // 初始化headers
  config.headers = config.headers || {}
  // 设置headers
  Object.assign(config.headers, await setHeaders())
  // 生成唯一id
  config.key = sha1(`${config.url}${JSON.stringify(config.params)}${JSON.stringify(config.data)}`)
  // 判断需要缓存
  if (options.cache) {
    // 根据key查找缓存
    const data = httpCache.getCacheData(config.key)
    if (data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          httpCache.clearCacheData()
        }, 0)
        resolve({
          data: JSON.parse(window.httpCache[config.key].data).data,
          response: config
        })
      })
    }
  }
  if (options.quque !== false) {
    // 存在正在进行中的相同接口
    if (httpQueue.hasQueue(config.key)) {
      return new Promise((resolve, reject) => {
        httpQueue.addQueue({
          key: config.key,
          config,
          resolve,
          reject
        })
      })
    } 
    // 创建正在请求的队列
    httpQueue.newQueue(config.key)
  }
  return service(config)
}

export default httpCore
