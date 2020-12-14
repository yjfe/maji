<!--
 * @Author: your name
 * @Date: 2020-03-23 17:32:19
 * @LastEditTime: 2020-12-08 14:57:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \generate\src\views\pageCount\index.vue
 -->
<template>
  <div>
    <ContentBox label="统计组件使用情况">
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-input-number v-model="startIndex" ></el-input-number>
      <el-input-number v-model="endIndex" ></el-input-number>
      <el-button @click="handleStart">总计</el-button>
    </ContentBox>
    <ContentBox label="统计组件使用情况">
      <el-row>
        <el-col :span="8">迭代页面: {{updateNum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">列表页: {{showData.pageList}}</el-col>
        <el-col :span="8">表单页: {{showData.pageForm}}</el-col>
        <el-col :span="8">详情页: {{showData.pageDetail}}</el-col>
      </el-row>
      <el-table :data="showData.componentsNum">
        <el-table-column prop="name" label="组件名"></el-table-column>
        <el-table-column prop="num" label="使用次数"></el-table-column>
      </el-table>
    </ContentBox>
  </div>
</template>
<script>
import { getNewData } from '@/views/lego/service'

export default {
  data() {
    return {
      startIndex: 1,
      endIndex: 10,
      countNum: {},
      showData: {},
      time: [],
      createNum: 0,
      updateNum: 0
    }
  },
  methods: {
    handleStart() {
      this.createNum = 0
      this.updateNum = 0
      this.getPageData(this.startIndex, this.endIndex)
    },
    getPageData(s, e) {
      let sTime 
      let eTime
      try {
        sTime = new Date(this.time[0])
        eTime = new Date(this.time[1])
      } catch (error) {
        console.log('未选择时间')
      }
      const https = []
      while (s < e) {
        https.push(getNewData({ pageManageId: s, status: 4 }, { timeout: 500000 }))
        s++
      }
      Promise.all(https).then((res) => {
        res.forEach((item) => {
          try {
            let isNewUpdate = true
            if (sTime && eTime) {
              const updateTime = new Date(item.data.modifyTime)
              isNewUpdate = updateTime >= sTime && updateTime <= eTime
              if (isNewUpdate) this.updateNum++
            }
            if (isNewUpdate) {
              const { idModule } = JSON.parse(item.data.content)
              Object.keys(idModule).forEach((com) => {
                this.countData(idModule[com])
              })
              // 输出时间和id，方便
              console.log(item.data.pageManageId, item.data.modifyTime)
            }
          } catch (_) {
            return false
          }
        })
        this.trimData(this.countNum)
      })
    },
    countData(data) {
      const { type } = data
      if (this.countNum[type]) {
        this.countNum[type]++
      } else {
        this.countNum[type] = 1
      }
    },
    trimData(data) {
      this.$set(this.showData, 'pageForm', data.PagesForm)
      this.$set(this.showData, 'pageList', data.PagesList)
      this.$set(this.showData, 'pageDetail', data.PagesDetail)
      delete data.PagesForm
      delete data.PagesList
      delete data.PagesDetail
      this.$set(this.showData, 'componentsNum', Object.keys(data)
        .sort((a, b) => data[b] - data[a])
        .map(item => ({
          name: item,
          num: data[item]
        })))
    }
  }
}
</script>
