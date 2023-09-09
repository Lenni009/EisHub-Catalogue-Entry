import { createRouter, createWebHistory } from 'vue-router'
import ErrorNotFound from '../views/404.vue';
import Home from '../views/Home.vue';
import Form from '../views/Form.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/Home.vue')
        }
      ]
    },
    {
      path: '/starship',
      component: Form,
      children: [
        {
          path: '',
          name: 'starship',
          component: () => import('../pages/Starship.vue')
        }
      ]
    },
    {
      path: '/freighter',
      component: Form,
      children: [
        {
          path: '',
          name: 'freighter',
          component: () => import('../pages/Freighter.vue')
        }
      ]
    },
    {
      path: '/frigate',
      component: Form,
      children: [
        {
          path: '',
          name: 'frigate',
          component: () => import('../pages/Frigate.vue')
        }
      ]
    },
    {
      path: '/multitool',
      component: Form,
      children: [
        {
          path: '',
          name: 'multitool',
          component: () => import('../pages/Multitool.vue')
        }
      ]
    },
    {
      path: '/creature',
      component: Form,
      children: [
        {
          path: '',
          name: 'creature',
          component: () => import('../pages/Creature.vue')
        }
      ]
    },
    {
      path: '/flora',
      component: Form,
      children: [
        {
          path: '',
          name: 'flora',
          component: () => import('../pages/Flora.vue')
        }
      ]
    },
    {
      path: '/planet',
      component: Form,
      children: [
        {
          path: '',
          name: 'planet',
          component: () => import('../pages/Planet.vue')
        }
      ]
    },
    {
      path: '/:catchAll(.*)*',
      component: ErrorNotFound
    }
  ]
})

export default router
