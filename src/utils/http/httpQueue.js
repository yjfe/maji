// http合并请求队列空间
window.httpQueue = {}

/**
 * @Date: 2020-10-14 18:39:51
 * @method: 判断是否有缓存
 * @param {String} key 请求url标识key
 * @return {Boolean} 
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function hasQueue(key) {
  return !!window.httpQueue[key]
}

/**
 * @Date: 2020-10-14 18:40:30
 * @method: 初始化队列空间
 * @param {String} key 请求url标识key
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function newQueue(key) {
  window.httpQueue[key] = []
}

/**
 * @Date: 2020-10-14 18:40:47
 * @method: 增加等待请求信息到队列
 * @param {Object} options 配置信息 包含 key，config请求配置， promise的resolve和reject 
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function addQueue(options = {}) {
  if (!options.key) return
  if (window.httpQueue[options.key]) {
    window.httpQueue[options.key].push(options)
  } else {
    window.httpQueue[options.key] = [options]
  }
}

/**
 * @Date: 2020-10-14 18:42:51
 * @method: 
 * @param {Object} options 配置信息 包含 key，type(回调方式)，data/error(返回内容)
 * @return {type} 
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function handleCallbackQueue(options) {
  const { key, type } = options
  let data
  if (!options.key) return
  if (window.httpQueue[key]) {
    if (type === 'resolve') {
      data = JSON.stringify(options.data.data)
    } else if (type === 'reject') {
      data = JSON.stringify(options.error || {})
    }
    // 让第一个接口先走吧
    setTimeout(() => {
      // 逐个触发回调
      window.httpQueue[key].forEach((item) => {
        if (type === 'resolve') {
          // 成功回调
          item[type]({
            data: JSON.parse(data),
            response: item.config
          })
        } else if (type === 'reject') {
          // 失败回调
          item[type](Object.assign({}, JSON.parse(data), { response: item.config }))
        }
      })
      delete window.httpQueue[key]
    }, 0)
    // 销毁字段
  }
}
