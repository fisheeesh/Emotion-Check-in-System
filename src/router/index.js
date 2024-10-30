import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import CheckIn from '@/views/dashboard/CheckIn.vue'
import NotFound from '@/views/auth/NotFound.vue'
import Login from '@/views/auth/Login.vue'
import { auth } from '@/firebase/config'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      let user = auth.currentUser
      if (!user) {
        next()
      }
      else {
        next('/admin/dashboard')
      }
    }
  },
  {
    path: '/admin',
    component: DashboardLayout, 
    beforeEnter(to, from, next) {
      let user = auth.currentUser
      if (user) {
        next()
      }
      else {
        next('/')
      }
    },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      }
      ,
      {
        path: 'check-in',
        name: 'check-in',
        component: CheckIn
      }
    ]
  },
  {
    path : '/:catchAll(.*)',
    name : 'not-found',
    component : NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
