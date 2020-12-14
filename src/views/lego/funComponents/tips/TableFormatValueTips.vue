<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-07-18 16:24:42
 * @LastEditTime: 2020-03-09 16:25:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-tooltip content="Top center" placement="top">
    <i class="el-icon-question font-text-sub"/>
    <div slot="content">
      自定义输出的解析规则： 使用两个大括号包裹字段<span class="c-error" v-text="'{{id}}'"></span>
      <br>表格行内数据：{ id: 1, name: ‘张三’ }
      <br>自定义输出的值： 名字是<span class="c-error" v-text="'{{name}}'"/>，id是<span class="c-error" v-text="'{{id}}'"></span>
      <br>输出结果：名字是张三，id是1
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'TableFormatValueTips'
}
</script>
