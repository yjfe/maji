<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-03-09 16:19:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">以字符串输入以<b class="c-error">‘,’</b>分割，如单输入字段名，则解析当前表格行内数据。
      <br>
      <br>1.如status:2这种带<b class="c-error">‘:’</b>的形式，则将status:2 直接带入请求或跳转链接
      <br>数据源：{id: 110} 示例输入： id,status:2  结果：id=110&status=2
      <br>
      <br>2.如pageId=id这种带<b class="c-error">‘=’</b>的形式，则将数据源的ID字段以pageId的新名称传递
      <br>数据源：{id: 110} 示例输入：pageId=id  结果：pageId=110
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ButtonQueryTips'
}
</script>
