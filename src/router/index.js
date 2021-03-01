import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/menu'
  },
  {
    path: '/menu',
    component: () => import('../views/Menu.vue')
  },
  {
    path: '/bussiness',
    name: 'Bussiness',
    component: () => import('../views/Bussiness.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
