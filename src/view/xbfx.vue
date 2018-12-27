<template>
  <div class="vue-shoes">
    <!-- 搜索栏 -->
    <div class="select">
      <!-- 截止日期 -->
      <div class="block">
        <span class="demonstration">截止日期:</span>
        <el-date-picker v-model="value1"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        type="date"
                        :picker-options="pickerOptions1">
        </el-date-picker>
      </div>
      <!-- 产品年份 -->
      <div class="block">
        <span class="demonstration">产品年份:</span>
        <el-date-picker v-model="value2"
                        value-format="yyyy"
                        type="year"
                        placeholder="选择年份">
        </el-date-picker>
      </div>
      <!-- 搜索 -->
      <el-button @click="getAjax"
                 type="primary"
                 icon="el-icon-search"
                 v-loading.fullscreen.lock="loading">搜索</el-button>
      <!-- @click="getAjax" -->
    </div>
    <!-- 横线 -->
    <hr class="bags-hr">

    <!-- 内容展示 -->
    <div class="bags-main">
      <div v-for="o in 4"
           :key="o.id"
           class="bags-4">
        <router-link v-if="date1[o-1]"
                     :to="'/bags/'+vDate+'/'+vYear">
          <div class="div-img-css">
            <img class="img-css"
                 :src="'http://10.10.1.32:8018/Images/sku/'+date1[o-1].kh+'.jpg'">
          </div>
        </router-link>
        <img v-else
             class="img-css"
             :src=ywjijie[o]>
        <el-table :data="dxTosz(date1[o-1])"
                  size="medium"
                  :fit="true"
                  :cell-style="{padding:'0',textAlign:'center'}"
                  :header-cell-style="{padding:'0',textAlign:'center'}">
          <el-table-column :label="'外购'+jijie[o-1]">
            <el-table-column prop="fhl"
                             label="发货量">
            </el-table-column>
            <el-table-column prop="bh"
                             label="补单量">
            </el-table-column>
            <el-table-column prop="bdl"
                             label="补单%">
            </el-table-column>
            <el-table-column prop="ks"
                             label="款数">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      pickerOptions2: {
        disabledDate (time) {
          return time.getTime() > Date.getFullYear()
        }
      },
      value1: '',
      value2: '',
      fullscreenLoading: false,
      loading: false,
      getYear: [],
      vDate: '',
      vYear1: '',
      date1: [],
      jijie: ['春季', '夏季', '秋季', '冬季'],
      ywjijie: ['', 'http://10.10.1.32:8018/Images/sku/springbao.jpg', 'http://10.10.1.32:8018/Images/sku/summerbao.jpg', 'http://10.10.1.32:8018/Images/sku/autumnbao.jpg', 'http://10.10.1.32:8018/Images/sku/winterbao.jpg']

    }
  },
  created () {
    // 获取年月日
    this.value1 = this.createdTimeFormat()
    // 获取年份
    this.value2 = this.createdDateFormat()
    // 获取portal年份
    this.getYear = this.getYearFormat()
  },
  components: {
    // vueJiazai
  },
  methods: {
    getdate () {
    },
    getYearFormat () {
      let successCallback = (response) => {
        this.getYear = response.data
      }
      let errorCallback = (response) => {
      }
      this.$http.get('http://10.10.1.41/Q/r.do?o=biyear').then(successCallback, errorCallback)
    },
    createdTimeFormat () {
      let date = new Date()
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      M = (M < 10 ? '0' + M : M)
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      return Y + '-' + M + '-' + D
    },
    createdDateFormat () {
      let date1 = new Date()
      let Y1 = date1.getFullYear()
      return '' + Y1
    },
    dxTosz (obj) {
      let date3 = []
      date3.push(obj)
      return date3
    },
    // 搜索
    getAjax () {
      this.loading = !this.loading

      this.vDate = this.value1.replace(/-/g, '') // replace(/\-/g, '').trim()
      this.vYear = this.value2
      this.vYear1 = '1411'
      for (var k in this.getYear) {
        if (this.getYear[k].name === this.vYear) {
          this.vYear = this.getYear[k].id
        }
      }

      let successCallback = (response) => {
        this.date1 = response.data
        this.loading = !this.loading
      }
      let errorCallback = (response) => {
        this.loading = !this.loading
      }
      this.$http.get('http://10.10.1.41/Q/r.do?o=bixb&vJzdate=' + this.vDate + '&vYear=' + this.vYear).then(successCallback, errorCallback)
    }

  },
  computed: {
    judge: function (a) {
      return a
      // return ''+(this.date1[a].bhl/this.date1[a].fhl)
    }
  }
}
</script>

<style scoped>
.block {
  display: inline-block;
  line-height: 60px;
  margin: 0px 10px;
}

.demonstration {
  font-size: 16px;
  font-weight: 700;
  color: #000;
}

.bags-hr {
  /*内嵌水平线*/
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.bags-main {
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.div-img-css {
  width: 100%;
}
.img-css {
  width: 30%;
}
/* .bags-4 {
  margin: 10px;
  width: 47%;
  min-width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
} */
.bags-4 {
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  width: 47%;
  min-width: 400px;
}
.select {
  min-width: 850px;
}
</style>
