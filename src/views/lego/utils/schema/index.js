import formatType from './formatType'

class Schema {
  constructor(rule = {}, data = {}) {
    Object.keys(rule).forEach((key) => {
      const ruleItem = rule[key]
      const dataItem = data[key]
      const schemaData = this.schemaContext(ruleItem, dataItem)
      const newdata = schemaData !== undefined ? schemaData : undefined
      if (newdata !== undefined) {
        data[key] = newdata
      }
    })
    return data
  }

  // eslint-disable-next-line class-methods-use-this
  ruleType(rule) {
    if (typeof rule === 'string') {
      return {
        type: rule
      }
    }
    return rule
  }

  schemaContext(rule = {}, data) {
    rule = this.ruleType(rule)
    const type = formatType(data)
    switch (rule.type) {
      case 'array':
        return this.schemaArray(rule, data)
      case 'object':
        return this.schemaObject(rule, data)
      default:
        return this.schemaDefault(type, rule, data)
    }
  }
  
  schemaObject(rule = {}, data) {
    rule = this.ruleType(rule)
    if (formatType(data) === 'object') { 
      if (rule.children) {
        Object.keys(rule.children).forEach((key) => {
          const ruleItem = rule.children[key]
          const dataItem = data[key]
          data[key] = this.schemaContext(ruleItem, dataItem)
        })
      }
      return data
    }
    return rule.default || {}
  }
  
  schemaArray(rule = {}, data) {
    rule = this.ruleType(rule)
    if (Array.isArray(data)) {
      if (typeof rule.children === 'string') {
        // eslint-disable-next-line array-callback-return
        data = data.map(item => this.schemaContext(rule.children, item)).filter(item => item !== undefined)
      } else if (rule.children) {
        data = data.map(item => new Schema(rule.children, item))
      }
      return data.length > 0 ? data : data.default || []
    }
    return rule.default || []
  }

  schemaDefault(type, rule = {}, data) {
    if (rule.type === 'any') return data
    rule = this.ruleType(rule)
    // eslint-disable-next-line valid-typeof
    if (type === rule.type) {
      return data
    }
    return rule.default
  }
}

export default Schema
