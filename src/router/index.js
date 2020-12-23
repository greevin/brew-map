import Vue from 'vue'
import VueRouter from 'vue-router'

import Brew from '@/components/Brew/Brew'
import BrewInfo from '@/components/BrewInfo'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Brew,
  },
  {
    name: 'info',
    path: '/info',
    component: BrewInfo,
  }
]

const router = new VueRouter({ routes })

export default router