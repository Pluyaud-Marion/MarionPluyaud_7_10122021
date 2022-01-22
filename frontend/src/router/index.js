import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from "@/components/PageNotFound.vue"

const routes = [
  
  {
    path: '/',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
   component: () => import(/* webpackChunkName: "login" */ '../views/Signup.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "login" */ '../views/Posts.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "login" */ '../views/Profile.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  }
]

const router = createRouter({
 history: createWebHistory(),
  routes
})

export default router
