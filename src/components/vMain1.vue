<template>
  <div id="vMain">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-bottom: 20px;">
      <el-button size="small"
                 @click="addTab(editableTabsValue2)">
        add tab
      </el-button>
    </div>
    <el-tabs v-model="$route.name"
             type="card"
             closable
             @tab-remove="removeTab">
      <el-tab-pane v-for="item in editableTabs2"
                   :key="item.name"
                   :label="item.title"
                   :name="item.route">
      </el-tab-pane>
    </el-tabs>
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
      editableTabsValue2: '1',
      editableTabs2: [
        //   {
        //   title: '首页',
        //   name: '1',
        //   content: 'Tab 1 content'
        // }
      ],
      tabIndex: 1
    }
  },
  mounted () {
    Bus.$on('open-view', (title) => {
      this.addTab(title.name)
    })
  },

  methods: {
    addTab (targetName) {
      let newTabName = ++this.tabIndex + ''
      this.editableTabs2.push({
        title: targetName,
        name: newTabName,
        content: '<div>New Tab content</div>'
      })
      this.editableTabsValue2 = newTabName
    },
    removeTab (targetName) {
      let tabs = this.editableTabs2
      let activeName = this.editableTabsValue2
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue2 = activeName
      this.editableTabs2 = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  margin: 10px 10px;
}
</style>
