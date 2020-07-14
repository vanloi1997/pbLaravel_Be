import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const providerRoutes: RouteConfig = {
  path: '/providers',
  component: Layout,
  redirect: '/providers/list',
  name: 'Provider',
  meta: {
    title: 'provider',
    icon: 'international'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/providers/create.vue'),
      name: 'CreateProvider',
      meta: { title: 'createProvider', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/providers/edit.vue'),
      name: 'EditProvider',
      meta: {
        icon: 'edit',
        title: 'editProvider',
        noCache: true,
        activeMenu: '/providers/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/providers/list.vue'),
      name: 'ProviderList',
      meta: { title: 'providerList', icon: 'list' }
    }
  ]
}

export default providerRoutes
