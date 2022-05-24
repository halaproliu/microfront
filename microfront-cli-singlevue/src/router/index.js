import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home'

const routes = [
  {
    path: '/vue',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router