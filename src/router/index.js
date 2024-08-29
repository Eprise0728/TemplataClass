import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/UpdataQuestion:id',
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
    {
      path: '/Fillin:id',
      name: 'Fillin',
      component: () => import('../views/Fillin.vue')
    },
    {
      path: '/Fillinfirm',
      name: 'Fillinfirm',
      component: () => import('../views/Fillinfirm.vue')
    },
    {
      path: '/Echarts:id',
      name: 'Echarts',
      component: () => import('../views/Echarts.vue')
    },
    {
      path: '/PlayerEcharts:id',
      name: 'PlayerEcharts',
      component: () => import('../views/PlayerEcharts.vue')
    },
    {
      path: '/QueFeedback:id',
      name: 'QueFeedback',
      component: () => import('../views/QueFeedback.vue')
    },
    {
      path: '/QueFeedbackEc/:id/:email',
      name: 'QueFeedbackEc',
      component: () => import('../views/QueFeedbackEc.vue')
    },
  ]
})

export default router
