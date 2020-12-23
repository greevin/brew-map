import Vue from 'vue'
import VueRouter from 'vue-router'

import Brew from '@/components/Brew/Brew'
import Alarms from '@/components/Alarms/Alarms'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/brew',
    component: Brew,
  },
  {
    name: 'alarms',
    path: '/',
    component: Alarms,
  }
]

const router = new VueRouter({ routes })

export default router