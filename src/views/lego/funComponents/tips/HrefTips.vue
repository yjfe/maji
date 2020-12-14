<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-03-09 16:20:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      <span>跳转地址根据开头两种形式跳转，</span>
      <br>1. 以//开头，会以url重定向的形式打开页面，用于跳转非配置页面
      <br>如：//www.baidu.com
      <br>2. 以/开头，本项目内路由跳转，用于跳转同是配置页的页面
      <br>如：/lego/view/form/20
      <br>3. 以<span class="c-error">[识别名]</span>开头，则使用环境变量替换
      <br>如：xxxadmin/order/list
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'HrefTips'
}
</script>
