<template>
  <div id="aside">
    <el-menu :default-active="$route.path"
             router
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <el-submenu v-for="menu in caidan"
                  :key="menu.id"
                  :index="menu.index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <el-menu-item v-for="zimenu in menu.zicaidan"
                      :key="zimenu.id"
                      :index="zimenu.id"
                      @click="openview(zimenu)">
          {{zimenu.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import Bus from '../common/eventBus.js'

export default {
  data () {
    return {
      isCollapse: false,
      // 侧边栏菜单
      caidan: [{
        name: '货品分析',
        index: '1',
        icon: 'icon-xiezhi',
        zicaidan: [
          {
            name: '女鞋分析',
            id: '/nxfx',
            index: '1-1'
          }, {
            name: '箱包分析',
            id: '/xbfx',
            index: '1-2'
          }, {
            name: '厂家分析',
            id: '/cjfx',
            index: '1-3'
          }
        ] }, {
        name: '店铺分析',
        index: '2',
        icon: 'icon-dianpu',
        zicaidan: [{
          name: '店铺分析',
          id: '/dpfx',
          index: '2-1'
        }, {
          name: '店铺结业分析',
          id: '/dpjyfx',
          index: '2-2'
        }
        ] }, {
        name: '销售分析',
        index: '3',
        icon: 'icon-xiaoshou',
        zicaidan: [{
          name: '销售分析',
          id: '/xsfx',
          index: '3-1'
        }, {
          name: '销售明细分析',
          id: '/xsmxfx',
          index: '3-2'
        }, {
          name: '销售业绩分析',
          id: '/xsyjfx',
          index: '3-3'
        }]
      }]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },

    // 跳转路由，并向兄弟组件vMain.vue(内容页)传值
    openview (ev) {
      this.$router.push({ path: ev.id })
      Bus.$emit('open-view', ev)
    }
  },
  mounted () {
    // 接收兄弟组件 头部组件 传过来的值
    Bus.$on('reset-component', () => {
      this.isCollapse = !this.isCollapse
    })
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 159px;
  min-height: 400px;
}
.icon-xiezhi {
  font-size: 20px;
  margin-right: 5px;
}
.el-submenu .el-menu-item {
  padding: 0;
  padding-left: 0px !important ;
  min-width: 100px;
}
.icon-xiaoshou {
  font-size: 26px;
  margin-right: 1px;
}
.icon-dianpu {
  font-size: 20px;
  margin-right: 5px;
}
.el-submenu .el-menu-item[data-v-7d4f111c] {
  text-align: center;
}
a,
a:hover {
  text-decoration: none;
  color: #303133;
}
</style>
