<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/nxfx' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'path' }">{{breadcrumb}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- tabs标签 -->
    <el-tabs v-model="activeName2"
             type="card"
             closable
             @tab-click="handleClick"
             @tab-remove="removeTab">
      <el-tab-pane v-for="tit in titles"
                   :key="tit.name"
                   :label="tit.label"
                   :name="tit.name"></el-tab-pane>
    </el-tabs>
    <!-- vue路由 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Bus from '../common/eventBus.js'

export default {
  data () {
    return {
      path: '1-1',
      vsum: 0,
      breadcrumb: '女鞋分析',
      activeName2: '1-1',

      // 初始化标签页
      titles: [{
        label: '女鞋分析',
        name: '1-1',
        path: '/nxfx'
      }]
    }
  },
  components: {
    Bus
  },
  mounted () {
    // 接收兄弟组件传回的值，进行新增tab
    Bus.$on('open-view', (title) => {
      this.breadcrumb = title.name
      this.addtab(title)
    })
  },
  methods: {
    // 点击tab标签，切换路由
    handleClick (tab, event) {
      for (let i = 0; i < this.titles.length; i++) {
        if (tab.name === this.titles[i].name) {
          this.$router.push({ path: this.titles[i].path })
          return
        }
      }
    },
    // 新增tab标签
    addtab (title) {
      for (let i = 0; i < this.titles.length; i++) {
        if (title.index === this.titles[i].name) {
          this.vsum++
        }
      }
      if (this.vsum === 0) {
        this.titles.push({
          label: title.name,
          name: title.index,
          path: title.id
        })
        this.activeName2 = title.index
        this.vsum = 0
      } else {
        this.activeName2 = title.index
        this.vsum = 0
      }
    },
    removeTab (targetName) {
      let tabs = this.titles
      let nextTab = 0
      // 只有一个tabs不执行删除操作
      if (tabs.length > 1) {
        for (let i = 0; i < tabs.length; i++) {
          if (targetName === tabs[i].name) {
            // 查删除的tabs的前后标签
            nextTab = tabs[i + 1] || tabs[i - 1]
            if (nextTab) {
              // 索引指向
              this.activeName2 = nextTab.name
              // 路由指向
              this.$router.push({ path: nextTab.path })
            }
            // 删除tabs
            tabs.splice(i, 1)
          }
        }
        // tabs.forEach((tab, index) => {
        //   if (tab.name === targetName) {
        //     nextTab = tabs[index + 1] || tabs[index - 1]
        //     tabs.splice(index, 1)
        //     if (nextTab) {
        //       this.activeName = nextTab.name
        //       this.$router.push({ path: nextTab.path })
        //     }
        //   }
        // })
      }
    }
  }
}
</script>

<style scoped>
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
.el-breadcrumb {
  margin: 0 0 10px 10px;
}
.el-tabs > :first-child {
  margin: 0;
}
</style>
