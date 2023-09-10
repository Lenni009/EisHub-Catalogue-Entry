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
          name: 'Home',
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
          name: 'Starship',
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
          name: 'Freighter',
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
          name: 'Organic Frigate',
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
          name: 'Multi-Tool',
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
          name: 'Creature',
          component: () => import('../pages/Creature.vue')
        }
      ]
    },
    {
      path: '/sandworm',
      component: Form,
      children: [
        {
          path: '',
          name: 'Sandworm',
          component: () => import('../pages/Sandworm.vue')
        }
      ]
    },
    {
      path: '/flora',
      component: Form,
      children: [
        {
          path: '',
          name: 'Flora',
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
          name: 'Planet',
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
