<template>
  <el-menu :default-active="activeIndex2"
           class="el-menu-demo"
           mode="horizontal"
           @select="handleSelect"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <el-menu-item index="1">
      <el-tooltip class="item"
                  effect="dark"
                  :content="show ? `隐藏侧边栏`:`显示侧边栏`"
                  placement="bottom">
        <li @click="openclose"
            :class="closeopen"><i class="el-icon-menu"></i>
          <transition name="el-zoom-in-center"><span v-show="show">戈美其</span></transition>
        </li>
      </el-tooltip>
    </el-menu-item>
    <el-menu-item index="2">处理中心</el-menu-item>
    <el-submenu index="3">
      <template slot="title">我的工作台</template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项1</el-menu-item>
        <el-menu-item index="3-4-2">选项2</el-menu-item>
        <el-menu-item index="3-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="4"
                  disabled>消息中心</el-menu-item>
    <el-menu-item index="5"><a href="https://www.anan976.com"
         target="_blank">订单管理</a></el-menu-item>
    <el-tooltip class="item"
                effect="dark"
                :content="fullscreen ? `取消全屏`:`全屏`"
                placement="bottom">
      <el-menu-item index="2"
                    @click="handleFullScreen"><i class="icon-quanpin"></i></el-menu-item>
    </el-tooltip>
  </el-menu>
</template>

<script>
import Bus from '../common/eventBus.js'

export default {
  data () {
    return {
      activeIndex2: '1', // 刚进入激活的索引值index
      show: true, // 提示框
      closeopen: 'open',
      fullscreen: false // 全屏状态
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    },

    // 侧边栏显示隐藏
    openclose () {
      this.show = !this.show

      // 样式
      if (this.closeopen === 'close') {
        this.closeopen = 'open'
      } else {
        this.closeopen = 'close'
      }
      Bus.$emit('reset-component') // 传给兄弟组件，侧边栏
    },

    // 全屏
    handleFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style scoped>
.el-tooltip {
  width: 60px;
  text-align: center;
}
/* .el-menu--horizontal > .el-submenu .el-submenu__title,
.el-menu-item {
  height: 50px !important;
  line-height: 50px !important;
}
.gongzhuotai {
  height: 50px !important;
  line-height: 50px !important;
} */
.close,
.open {
  float: left;
  line-height: 60px;
  font-size: 18px;
  color: #fff;
}

.open {
  width: 119px;
}

.close {
  width: 24px;
}
.icon-quanpin {
  font-weight: 700;
  font-size: 18px;
  margin: 0 auto;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
</style>
