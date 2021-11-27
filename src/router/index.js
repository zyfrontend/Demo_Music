import Vue from 'vue'
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    redirect: '/discover',
    children: [
      {
        path: '/discover',
        component: () => import('@/views/pages/discover/Discover.vue'),
        redirect: '/discover/recommend',
        children: [
          {
            path: '/discover/recommend',
            component: () => import('@/views/pages/discover/Children/recommend/recommend.vue')
          },
          {
            path: '/discover/musiclist',
            component: () => import('@/views/pages/discover/Children/musiclist/musiclist.vue')
          },
          {
            path: '/discover/ranking',
            component: () => import('@/views/pages/discover/Children/leaderboard/leaderboard.vue')
          },
          {
            path: '/discover/singer',
            component: () => import('@/views/pages/discover/Children/singer/singer.vue')
          }
        ]
      },
      {
        path: '/video',
        redirect: '/discover',
        component: () => import('@/views/pages/video/Video.vue')
      },
      {
        path: '/favorites',
        redirect: '/discover',
        component: () => import('@/views/pages/collect/Collect.vue')
      },
      {
        path: '/recommendmusic',
        redirect: '/discover',
        component: () => import('@/views/pages/daily/Daily.vue')
      },
      {
        path: '/musiclistdetail/:id',
        name: 'musicListDetail',
        component: () => import('@/views/pages/listdetail/listdetail.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
