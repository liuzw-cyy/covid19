import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/city/:city',
    name: 'city',
    component: () => import("@/views/City.vue"),
    props: true
  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import("@/views/PolicyDetail.vue"),
  }
]

export default new VueRouter({
  routes
})