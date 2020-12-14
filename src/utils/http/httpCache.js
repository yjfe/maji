// http缓存空间
window.httpCache = {}
// http缓存清理时间
window.httpCacheClearTime = new Date().getTime

/**
 * @Date: 2020-10-14 17:54:53
 * @method: 清理缓存
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function clearCacheData() {
  const nowDate = new Date().getTime()
  // 30秒内只处理一次，防止短时间内多次清理
  if (nowDate - window.httpCacheClearTime > 30 * 1000) {
    Object.keys(window.httpCache).forEach((item) => {
      // 超过缓存时间的数据
      if (window.httpCache[item].date <= nowDate) {
        delete window.httpCache[item]
      }
    })
    // 
    window.httpCacheClearTime = nowDate
  }
}

/**
 * @Date: 2020-10-14 17:54:57
 * @method: 请求成功添加缓存
 * @param {String} key 请求url标识key
 * @param {Object} data 请求成功的data
 * @param {Number} cacheTime 缓存时间
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function setCacheData(key, data, cacheTime) {
  if (!key) return
  window.httpCache[key] = {
    date: new Date().getTime() + cacheTime,
    data: JSON.stringify(data)
  }
}

/**
 * @Date: 2020-10-14 17:55:00
 * @method: 获取缓存的接口数据
 * @param {String} key 请求url标识key  
 * @return {Objct | Boolean} 缓存的请求返回值
 * @Author: yamanashi12（yamanashi12@qq.com）
 */
export function getCacheData(key) {
  if (window.httpCache[key] && window.httpCache[key].date > new Date().getTime()) {
    return JSON.parse(window.httpCache[key].data)
  }
  return false
}
