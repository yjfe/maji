<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-04-24 11:03:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      以字符串输入以<span class="c-error">‘,’</span>分割，如单输入字段名，则解析当前表格行内数据，
      如<span class="c-error">status==2</span> 或 <span class="c-error">status!=2</span>
      <br>
      <br>在表格内按钮数据源为：表格行内数据
      <br>在表格上方按钮数据源为：url参数
      <br>示例输入： <span class="c-error">type==1 && status==2</span>  判断表格行内数据 type = 1 且 status = 2 才显示
      <br>非操作示例输入： <span class="c-error">type!=1 || status==2</span>  判断表格行内数据 type != 1 或 status = 2 才显示
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'TableStatusTips'
}
</script>
