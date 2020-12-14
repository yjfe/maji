<!--
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-05-24 10:45:19
 * @LastEditTime: 2019-10-10 14:28:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-popover
    placement="bottom"
    width="400"
    trigger="click">
    <div class="project-select" slot="reference">
      <span>{{nowProjcet.title}}</span>
      <i class="el-icon-arrow-down"></i>
    </div>
    <div class="project-select__more">
      <div class="project-select__more-item" 
        v-for="(item, index) in projectList" 
        :key="index"
        @click="handleSelect(item)">
        <div class="middle">
          <img :src="item.logo"/>
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="project-select__more-item add" @click="handleAdd">
        <div class="middle">
          <i class="el-icon-plus"/>
          <p>添加项目</p>
        </div>
      </div>
    </div>
  </el-popover>
  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProjectSelect',
  computed: {
    ...mapGetters({
      projectList: 'projectList',
      nowProjcet: 'nowProject'
    })
  },
  data() {
    return {
    }
  },
  methods: {
    /**
     * @method: 选择项目
     * @param type {String}  选择类型
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-05-22 10:43:09
     */
    handleSelect(item) {
      this.$store.dispatch('setNowProject', item)
      this.$router.push({ path: '/' })
    },
    /**
     * @method: 
     * @param {type} 
     * @return: 
     * @Author: yamanashi12（yamanashi12@qq.com）
     * @Date: 2019-05-27 11:11:44
     */  
    handleAdd() {
      this.$router.push({ path: '/config/addProject' })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~styles/var';
.project-select{
  margin: 10px auto;
  width: 100px;
  text-align: center;
  line-height: 20px;
  border-radius: 20px;
  background: #252629;
  color: #666;
  &__more{
    margin: 0 auto;
    width: 330px;
    &-item{
      height: 80px;
      width: 100px;
      border-radius: 4px;
      text-align: center;
      list-style-type: none;
      margin: 0 5px 5px;
      float: left;
      display: table;
      .middle{
        display: table-cell;
        vertical-align: middle;
        width: 100%;
        img{
          width: 50px;
          height: auto;
        }
        p{
          width: 100px;
          margin-top: 5px;
          margin-bottom: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &:hover{
        cursor: pointer;
      }
      &.add{
        border: 1px dashed #C4C7CC;
        &:hover{
          border-color: @color-primary;
          p{
            color: @color-primary;
          }
          .el-icon-plus{
            color: @color-primary;
          }
        }
        p{
          color: #C4C7CC;
        }
        .el-icon-plus{
          font-size: 50px;
          display: inline-block;
          padding: 10px 0;
          color: #C4C7CC;
        }
      }
    }
  }
}
</style>
