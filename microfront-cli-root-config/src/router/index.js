import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home'
}, {
  path: '/vue',
  name: 'vue'
}, {
  path: '/vue2',
  name: 'vue2'
}, {
  path: '/react',
  name: 'react'
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router