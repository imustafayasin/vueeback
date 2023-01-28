import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const requireAuth = (to, from, next) => {
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  store.getters.isAuth ? next() : next(loginPath)
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'Create Feedback',
    beforeEnter: requireAuth,
    component: () => import('../views/CreateFeedback.vue')
  },
  {
    path: '/update/:id',
    name: 'Update Feedback',
    beforeEnter: requireAuth,
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
  },
  {
    path: '/account',
    name: 'Account',
    beforeEnter: requireAuth,
    component: () => import('../views/Account.vue')
  },
  {
    path: '/myfeedbacks',
    name: 'My Feedback',
    beforeEnter: requireAuth,
    component: () => import('../views/MyFeedbacks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
