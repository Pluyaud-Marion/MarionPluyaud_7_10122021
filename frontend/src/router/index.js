import { createRouter, createWebHistory } from 'vue-router'
//import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
//import Signup from "../views/Signup"
//import Posts from "../views/Posts"
//import Profile from "../views/Profile"

const routes = [
  
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
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
  }
]

const router = createRouter({
  //history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})

export default router
