<template>
  <div id="index">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <v-header></v-header>
      </el-header>
      <!-- 内容 -->
      <el-container>
        <!-- 左边菜单 -->
        <v-aside></v-aside>
        <!-- 主内容 -->
        <el-main>
          <v-main></v-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vHeader from './vHeader.vue'
import vAside from './vAside.vue'
import vMain from './vMain.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    vHeader,
    vAside,
    vMain
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  width: 100%;
  min-width: 700px;
}
.el-main {
  position: relative;
  padding: 10px 10px;
  width: 100%;
}
</style>
