export default [
  {
    eventName: 'componentCreated',
    info: '组件初始化时执行',
    params: [
      {
        name: 'query',
        info: '页面参数',
        type: 'Object'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ]
  },
  {
    eventName: 'componentBeforeSend',
    info: '组件初始化接口请求之前执行',
    params: [
      {
        name: 'params',
        info: '接口请求参数',
        type: 'Object'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ],
    return: {
      name: 'data',
      info: '接口返回数据',
      type: 'Object'
    }
  },
  {
    eventName: 'componentAfterSend',
    info: '组件初始化接口请求之后执行',
    params: [
      {
        name: 'data',
        info: '接口返回数据',
        type: 'Object'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ],
    return: {
      name: 'data',
      info: '接口返回数据',
      type: 'Object'
    }
  },
  {
    eventName: 'componentWillDestroy',
    info: '组件将卸载的时执行',
    params: [
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ]
  },
  {
    eventName: 'componentValueChange',
    info: '组件值变化的时候',
    params: [
      {
        name: 'value',
        info: '改变的值',
        type: 'any'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ]
  },
  {
    eventName: 'componentBeforeSubmit',
    info: '组件提交按钮接口请求之前执行',
    params: [
      {
        name: 'params',
        info: '接口请求参数',
        type: 'Object'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ],
    return: {
      name: 'data',
      info: '接口返回数据',
      type: 'Object'
    }
  },
  {
    eventName: 'inputChange',
    info: '表单组件值变化的时候触发',
    params: [
      {
        name: 'value',
        info: '该组件变化后的值',
        type: 'any'
      },
      {
        name: 'self',
        info: '当前组件配置数据',
        type: 'Object'
      },
      {
        name: 'idModules',
        info: '组件列表',
        type: 'Array'
      }
    ],
    return: {
      name: 'value',
      info: '该组件的值',
      type: 'any'
    }
  }
]
