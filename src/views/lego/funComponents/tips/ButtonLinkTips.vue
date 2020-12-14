<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-11-30 17:34:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      <span>该url可能是接口地址或跳转链接</span>
      <br>接口地址： 以//开头，确保地址完整、正确
      <br>如：https://www.baidu.com
      <br>接口地址：跳转地址根据开头两种形式跳转
      <br>1. 以//开头，会以url重定向的形式打开页面，用于跳转非配置页面
      <br>如：//www.baidu.com
      <br>2. 以/开头，本项目内路由跳转，用于跳转同是配置页的页面
      <br>如：/lego/view/form/20
      <br>3. 以<span class="c-error">[识别名]</span>开头，则使用环境变量替换
      <br>如：xxxadmin/order/list
      <br>
      <br>扩展: 链接按钮
      <br>本页跳转麻鸡页面，如：/view/60
      <br>新页面跳转麻鸡页面，如：/generate/view/60
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ButtonLinkTips'
}
</script>
