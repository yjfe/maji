<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-10 10:21:50
 * @LastEditTime: 2019-05-21 14:08:54
 * @LastEditors: yamanashi12
 -->
<template>
<ContentBox class="system404">
  <Cellbox middle class="system404">
    <CellItem>
      <img src="./404.png" />
      <p>抱歉！你的页面跟别人私奔了！ 404 <a class="link" onclick="history.back()">返回</a></p>
    </CellItem>
  </Cellbox>
</ContentBox>
</template>

<script>
export default {
}
</script>
<style lang="less">
@import '~styles/var.less';
.system404{
  text-align: center;
  height: 100%;
  color: #c6c6c6;
  img{
    width: 459px;
  }
  a{
    color: @color-primary
  }
}
</style>
