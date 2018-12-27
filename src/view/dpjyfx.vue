<template>
  <div>
    <div class="select">
      <!-- <div class="block">
        <span class="demonstration">月份区间:</span>
        <el-date-picker v-model="value1"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        :picker-options="pickerOptions1">
        </el-date-picker>
      </div> -->
      <div class="block">
        <span class="demonstration">日期选择:</span>
        <el-date-picker v-model="value13"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
      <el-button @click="getAjax"
                 type="primary"
                 icon="el-icon-search"
                 v-loading.fullscreen.lock="loading">搜索</el-button>

      <!-- 横线 -->
      <hr class="shoes-hr">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value13: [],
      getYear: [],
      vBeginDate: '',
      vEndDate: '',
      loading: false
      // pickerOptions1: {
      //   // disabledDate是日期组件的一个方法
      //   disabledDate: (time) => {
      //     // 获取开始月份
      //     let currentTime = this.beginMonth
      //     // 将开始月份转换成时间戳，再限制结束日期的选择只能大于开始日期
      //     return time.getTime() < new Date(currentTime).getTime() - 8.64e6
      //   }
      // }
    }
  },
  created () {
    // 初始化开始月份与结束月份

    var date = new Date()
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
    this.value13.push(firstDay)
    this.value13.push(lastDay)

    this.getYear = this.getYearFormat()
  },
  methods: {
    getAjax (ev) {
      this.loading = !this.loading
      this.vBeginDate = this.getdatefarmat(this.value13[0])
      this.vEndDate = this.getdatefarmat(this.value13[1])
      let successCallback = (response) => {
        this.date1 = response.data
        this.loading = !this.loading
      }
      let errorCallback = (response) => {
        this.loading = !this.loading
      }
      this.$http.get('http://10.10.1.41/Q/r.do?o=bi_mdjyxx&vBeginDate=' + this.vBeginDate + '&vEndDate=' + this.vEndDate).then(successCallback, errorCallback)
    },
    getdatefarmat (vDate) {
      vDate = new Date(vDate)
      let Y = vDate.getFullYear()
      let M = vDate.getMonth() + 1
      M = (M < 10 ? '0' + M : M)
      let D = (vDate.getDate() < 10 ? '0' + vDate.getDate() : vDate.getDate())
      return '' + Y + M + D
    },
    // 获取portal年份
    getYearFormat () {
      let successCallback = (response) => {
        this.getYear = response.data
      }
      let errorCallback = (response) => {
      }
      this.$http.get('http://10.10.1.41/Q/r.do?o=biyear').then(successCallback, errorCallback)
    }
  }

}
</script>

<style scoped>
.demonstration {
  font-size: 16px;
  font-weight: 700;
  color: #000;
}
.block {
  margin: 10px;
  display: inline-block;
}
.shoes-hr {
  /*内嵌水平线*/
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
