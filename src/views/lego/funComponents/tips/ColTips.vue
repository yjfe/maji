<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2019-07-18 16:30:29
 * @LastEditors: yamanashi12
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      <span>宽度设置是栅格布局模式，通过基础的 24 分栏，迅速简便地创建布局。</span>
      <br>如：2列平分，全部宽度设置 12
      <br>如：3列平分，全部宽度设置 8
      <br>如：4列平分，全部宽度设置 6
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ColTips'
}
</script>
