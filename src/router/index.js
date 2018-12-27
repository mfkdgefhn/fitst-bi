import Vue from 'vue'
import Router from 'vue-router'
import Nxfx from '@/view/nxfx'
import home from '@/components/index'
import Xbfx from '@/view/xbfx'
import Cjfx from '@/view/cjfx'
import Xsfx from '@/view/xsfx'
import Yjfx from '@/view/yjfx'
import Dpfx from '@/view/dpfx'
import Dpjyfx from '@/view/dpjyfx'
import Xsyjfx from '@/view/xsyjfx'
import Xsmxfx from '@/view/xsmxfx'
import anan from '@/view/anan'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'home',
    component: home
  }, {
    path: '/nxfx',
    component: Nxfx
  }, {
    path: '/xbfx',
    component: Xbfx
  }, {
    path: '/cjfx',
    component: Cjfx
  }, {
    path: '/xsfx',
    component: Xsfx
  }, {
    path: '/yjfx',
    component: Yjfx
  }, {
    path: '/dpfx',
    component: Dpfx
  }, {
    path: '/dpjyfx',
    component: Dpjyfx
  }, {
    path: '/xsyjfx',
    component: Xsyjfx
  }, {
    path: '/xsmxfx',
    component: Xsmxfx
  }, {
    path: '/anan',
    component: anan
  }]

  // [{
  //   path: '/home',
  //   name: 'home',
  //   component: home,
  //   children: [{
  //     path: '/nxfx',
  //     component: Nxfx
  //   }, {
  //     path: '/xbfx',
  //     component: Xbfx
  //   }, {
  //     path: '/cjfx',
  //     component: Cjfx
  //   }, {
  //     path: '/xsfx',
  //     component: Xsfx
  //   }, {
  //     path: '/yjfx',
  //     component: Yjfx
  //   }, {
  //     path: '/dpfx',
  //     component: Dpfx
  //   }, {
  //     path: '/anan',
  //     component: anan
  //   }]
  // }
  // ]
})
