<template>
  <div>
    <div class="select">
      <!-- 来源 -->
      <div class="block">
        <span class="demonstration">来源筛选:</span>
        <el-select v-model="vsource"
                   collapse-tags
                   style="margin-left: 10px;width:130px;"
                   placeholder="默认：全选">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 季节 -->
      <div class="block">
        <span class="demonstration">季节:</span>
        <el-select v-model="vseason"
                   collapse-tags
                   multiple
                   style="margin-left: 10px;width:150px;"
                   placeholder="默认：四季">
          <el-option v-for="item in seasons"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!-- 款号年份 -->
      <div class="block">
        <span class="demonstration">款号年份:</span>
        <el-date-picker v-model="productYear"
                        type="year"
                        value-format="yyyy"
                        style="margin-left: 10px;width:110px;"
                        placeholder="选择年">
        </el-date-picker>
      </div>
      <!-- 日期 -->
      <el-tooltip :content="dateselect === '1' ? '按区间' : '按截止'"
                  placement="top">
        <el-switch v-model="dateselect"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   active-value='1'
                   inactive-value='0'>
        </el-switch>
      </el-tooltip>
      <!-- 按区间 -->
      <div class="block"
           v-if="dateselect=='1'">
        <el-date-picker v-model="vdate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="margin-left: 10px;width:300px;"
                        :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <!-- 按截止 -->
      <div class="block"
           v-else>
        <el-date-picker v-model="closingDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        style="margin-left: 10px;width:150px;"
                        placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- 搜索 -->
      <el-button @click="getAjax"
                 type="primary"
                 icon="el-icon-search"
                 style="margin-left:10px">搜索</el-button>
      <!-- v-loading.fullscreen.lock="loading" -->
    </div>
    <!-- 横线 -->
    <hr class="shoes-hr">

  </div>
</template>
<script>

export default {
  data () {
    return {
      // 来源
      vsource: [],
      options: [{
        value: '1,2',
        label: '全选'
      }, {
        value: '1',
        label: '外购'
      }, {
        value: '2',
        label: '本厂'
      }],
      // 季节
      vseason: [],
      seasons: [{
        value: '37',
        label: '春季'
      }, {
        value: '38',
        label: '夏季'
      }, {
        value: '39',
        label: '秋季'
      }, {
        value: '40',
        label: '冬季'
      }],
      // 日期
      vdate: [],
      productYear: '2018',
      dateselect: '1',
      closingDate: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 8)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 31)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 91)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    // 初始化
    // 截止日期
    this.closingDate = this.formatdate(1)
    // 区间日期
    this.vdate.push(this.formatdate(7))
    this.vdate.push(this.formatdate(1))
  },
  methods: {
    getAjax () {
      // 接口
      let url = 'http://10.10.1.41/Q/r.do?o=xsfx&vJzdate='
      // 来源
      let vSotype = this.vsource || '1,2'
      // 季节
      let vSeason = this.vseason.length === 0 ? '37,38,39,40' : JSON.stringify(this.vseason).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '')

      // 款号年份
      let vYear = this.productYear

      // 按区间或者截止日期
      if (this.dateselect === '1') {
        let vBeginDate = this.vdate[0].replace(/-/g, '')
        let vEndDate = this.vdate[1].replace(/-/g, '')
        url = url + '&vSotype=' + vSotype + '&vSeason=' + vSeason + '&vBeginDate=' + vBeginDate + '&vEndDate=' + vEndDate + '&vYear=' + vYear
      } else {
        let vJzDate = this.closingDate
        url = url + '&vSotype=' + vSotype + '&vSeason=' + vSeason + '&vJzDate=' + vJzDate + '&vYear=' + vYear
      }

      let successCallback = (response) => {
        this.date1 = response.data
        this.loading = !this.loading
      }
      let errorCallback = (response) => {
        this.loading = !this.loading
      }
      this.$http.get(url).then(successCallback, errorCallback)
    },
    // 初始化日期
    formatdate (sum) {
      let date = new Date()
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * sum)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M)
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + '-' + M + '-' + D
    }

  }
}

</script>
<style scoped>
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
.select {
  min-width: 1200px;
}
</style>
