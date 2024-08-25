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
    {
      path: '/Questionconfirm',
      name: 'Questionconfirm',
      component: () => import('../views/Questionconfirm.vue')
    },
    {
      path: '/UpdataQuestion/:id',
      name: 'UpdataQuestion',
      component: () => import('../views/UpdataQuestion.vue'),
      props: true,
    },
    {
      path: '/Updatafirm',
      name: 'Updatafirm',
      component: () => import('../views/Updatafirm.vue')
    },
    {
      path: '/PlayerFirstList',
      name: 'PlayerFirstList',
      component: () => import('../views/PlayerFirstList.vue')
    },
  ]
})

export default router
