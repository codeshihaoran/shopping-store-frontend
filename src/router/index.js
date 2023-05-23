import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/allstore',
      name: 'Allstore',
      component: () => import('../views/Allstore.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    },
    {
      path: '/error',
      name: 'Error',
      component: () => import('../compentens/Error.vue')
    },
    {
      path: '/allstore/details',
      name: 'Details',
      component: () => import('../views/Details.vue')
    },
    {
      path: '/collect',
      name: 'Collect',
      component: () => import('../views/Collect.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: () => import('../views/Order.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/shoppingCart',
      name: 'ShoopingCart',
      component: () => import('../views/ShoppingCart.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: () => import('../views/confirmOrder.vue'),
      meta: {
        requireAuth: true
      }
    },

  ]
})

export default router
