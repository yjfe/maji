const typeEnums = { 
  // 是否是字符串类型
  string(v) {
    return Object.prototype.toString.call(v) === '[object String]'
  },
  // 是否是布尔类型
  boolean(v) {
    return Object.prototype.toString.call(v) === '[object Boolean]'
  },
  // 是否是数字类型
  number(v) {
    return Object.prototype.toString.call(v) === '[object Number]'
  },
  // 是否是数组类型
  array(v) {
    return Object.prototype.toString.call(v) === '[object Array]'
  },
  // 是否是函数类型
  function(v) {
    return Object.prototype.toString.call(v) === '[object Function]'
  },
  // 是否是对象类型
  object(v) {
    return Object.prototype.toString.call(v) === '[object Object]'
  },
  // 是否是null类型
  null(v) {
    return Object.prototype.toString.call(v) === '[object Null]'
  },
  // 是否是undefined
  undefined(v) {
    return Object.prototype.toString.call(v) === '[object Undefined]'
  },
  // 是否是symbol类型
  symbol(v) {
    return Object.prototype.toString.call(v) === '[object Symbol]'
  },
  // 是否是Set类型
  set(v) {
    return Object.prototype.toString.call(v) === '[object Set]'
  },
  // 是否是Worker类型
  worker(v) {
    return Object.prototype.toString.call(v) === '[object Worker]'
  },
  // 是否是Map类型
  map(v) {
    return Object.prototype.toString.call(v) === '[object Map]'
  }
}

export default function formatType(data) {
  return Object.keys(typeEnums).find(item => typeEnums[item](data))
}
