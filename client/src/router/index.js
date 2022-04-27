import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Create Feedback',
    component: () => import('../views/CreateFeedback.vue')
  },
  {
    path: '/update/:id',
    name: 'Update Feedback',
    component: () => import('../views/CreateFeedback.vue')
  },
  {
    path: '/detail/:id',
    name: 'Feedback Detail',
    component: () => import('../views/FeedbackDetail.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
