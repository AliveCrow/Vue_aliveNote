import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/rel',
    // name: 'Rel',
    redirect:'/login',
    component: ()=>import('@/views/Container.vue'),
    children:[
      {
        path: '/login',
        name: 'Login',
        component: ()=>import('@/components/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: ()=>import('@/components/Register.vue')
      },
      {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: ()=>import('@/components/ForgotPassword.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
