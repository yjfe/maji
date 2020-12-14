<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2019-11-28 16:05:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i style="margin-left: 5px;" class="el-icon-question font-text-sub"/>
    <div slot="content">
      <span>输入行数据的Key，作为跨页面勾选的标识，为空则不开启跨页勾选</span>
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'TableSecectTips'
}
</script>
