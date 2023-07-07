import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/product-home.vue')
    },
    {
      path: '/allstore',
      name: 'Allstore',
      component: () => import('../views/all-product.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about-project.vue')
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('../compentens/error-page.vue')
    },
    {
      path: '/allstore/details',
      name: 'Details',
      component: () => import('../views/product-detail.vue')
    },
    {
      path: '/collect',
      name: 'Collect',
      component: () => import('../views/collect-product.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('../views/order/order-list.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/shoppingCart',
      name: 'ShoopingCart',
      component: () => import('../views/Shopping-cart.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: () => import('../views/confirm-order.vue'),
      meta: {
        requireAuth: true
      }
    },

  ]
})

export default router
