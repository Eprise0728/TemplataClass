import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/FirstList',
      name: 'FirstList',
      component: () => import('../views/FirstList.vue')
    },
    {
      path: '/Question',
      name: 'Question',
      component: () => import('../views/Question.vue')
    },
  ]
})

export default router
