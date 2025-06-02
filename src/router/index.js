import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/category/:categorySlug',
    name: 'category',
    component: CategoryView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
