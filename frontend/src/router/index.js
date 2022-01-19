import { createRouter, createWebHistory } from 'vue-router'

// import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Signup from "../views/Signup"
// import Posts from "../views/Posts"
// import Profile from "../views/Profile"

// import HeaderHome from "../components/HeaderHome.vue"
// import News from "../components/News.vue"
// import Header from "../components/Header.vue"
// import LoginHome from "../components/LoginHome.vue"
// import SignupHome from "../components/SignupHome.vue"
// import ProfileComponent from "../components/ProfileComponent.vue"

const routes = [
  
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    //component: HeaderHome, SignupHome,
   component: () => import(/* webpackChunkName: "login" */ '../views/Signup.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    //component: Header, News,
    component: () => import(/* webpackChunkName: "login" */ '../views/Posts.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    //component: Header, ProfileComponent,
    component: () => import(/* webpackChunkName: "login" */ '../views/Profile.vue')
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
 history: createWebHistory(),
 
  routes
})

export default router
