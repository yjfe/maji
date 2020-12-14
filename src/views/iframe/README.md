## iframe使用

### 一、配置说明
 文件地址： @/view/main.js
```
  ./config.js  配置环境变量
  ./iframe.vue iframe 入口
  @/router/router-iframe.js  iframe路由配置
  @/utils/host.js  环境变量识别
```

#### 1.config.js 配置
generate: { // 项目识别名
  tx: 'txstest.com/generate',   // 测试环境走的地址
  online: 'online.com/generate'
}
环境变量值  t 阿里测试 tx 腾讯云测试 online 正式环境 
环境变量根据host文件配置

### 2.iframe.vue 页面入口
postmessage接受类型
1. routerLink iframe外部项目跳转
2. setBreadcrumb 设置面包屑
3. export 外部导出事件
4. 继续扩展，根据业务需求

### 3.router-iframe.js
复制，没啥问题

### 4.host.js 环境变量处理
文件地址： @/utils/host
```
  const { hostname } = window.location
  const globalConfig = {}
  // 根据当前域名设置环境变量，env是给其他地方使用的变量
  switch (hostname) {
    case 'test.com':
      Object.assign(globalConfig, {
        env: 't'
      })
      break;
  }
```

## 二、使用
### 配置菜单跳转 [识别名]/[页面地址]
```
如： generate/lego/view/list/1
测试环境：//test.com/generate/lego/view/list/1
在正式环境：//online.com/generate/lego/view/list/1