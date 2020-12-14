<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-11-30 19:18:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      <span>接口地址组成 [请求类型]:[识别名]/[请求地址]</span>
      <br>请求类型：<span class="c-primary">GET || POST</span> 非必填，默认POST
      <br>识别名：非必填，配置于[页面配置] -> [环境变量]
      <br>请求地址：以http:// 或 https:// 或 // 开头请求配置地址，其他会转化为online.com/[请求地址]
      <br><br>如：<span class="c-primary">GET</span>:<span class="c-error">generate</span>/getList  <span class="c-error">（识别名前面不能加 /）</span>
      <br>识别名：generate 地址：//test.com/generate
      <br><br>结果：请求类型 GET 地址：//test.com/generate/getList
      <br><br>在url末尾使用 '?a=1&b=4' 可以作为接口默认请求参数，GET和POST均可 

      <br><br>高级配置：
      <br>1.参数拼接 <span class="c-error">XTimeout</span> 设置超时时间 单位毫秒 如： ?XTimeout=10000 接口超时中断设置为10秒
      <br>2.参数拼接 <span class="c-error">XType</span> 设置post请求类型 如： ?XType=formData 请求方式为formData
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ApiTips'
}
</script>
