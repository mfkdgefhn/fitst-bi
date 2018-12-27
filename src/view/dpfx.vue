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
        <span class="demonstration">月份区间</span>
        <el-date-picker v-model="beginMonth"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM"
                        placeholder="开始月"
                        type="month">
        </el-date-picker>
      </div>
      <span>至</span>
      <div class="block">
        <el-date-picker v-model="endMonth"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM"
                        type="month"
                        align="center"
                        placeholder="结束月"
                        :picker-options="pickerOptions1">
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
      beginMonth: '',
      endMonth: '',
      getYear: [],
      // fullscreenLoading: false,
      loading: false,
      pickerOptions1: {
        // disabledDate是日期组件的一个方法
        disabledDate: (time) => {
          // 获取开始月份
          let currentTime = this.beginMonth
          // 将开始月份转换成时间戳，再限制结束日期的选择只能大于开始日期
          return time.getTime() < new Date(currentTime).getTime() - 8.64e6
        }
      }
    }
  },
  created () {
    // 初始化开始月份与结束月份
    this.beginMonth = this.getBeginMonth()
    this.endMonth = this.getBeginMonth()
    this.getYear = this.getYearFormat()
  },
  methods: {
    getAjax (ev) {
      this.loading = !this.loading

      let successCallback = (response) => {
        this.date1 = response.data
        this.loading = !this.loading
      }
      let errorCallback = (response) => {
        this.loading = !this.loading
      }
      this.$http.get('http://10.10.1.41/Q/r.do?o=bidpfx&vBeginMonth=' + this.beginMonth.replace(/-/g, '') + '&vEndMonth=' + this.endMonth.replace(/-/g, '')).then(successCallback, errorCallback)
    },
    getBeginMonth () {
      let date = new Date()
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M)
      // let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + '-' + M
    },
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
.block {
  margin: 10px;
  display: inline-block;
}
.demonstration {
  font-size: 16px;
  font-weight: 700;
  color: #000;
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
