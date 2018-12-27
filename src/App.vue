<template>
  <div id="app">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container>
        <v-aside></v-aside>
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
      name: 'App'
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
}
.el-main {
  position: relative;
  padding: 10px 10px;
  width: 100%;
}
</style>
