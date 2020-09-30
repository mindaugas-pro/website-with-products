import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/editProduct',
    name: 'EditProduct',
    component: () => import('../views/EditProduct.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
