import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const categoryRoutes: RouteConfig = {
  path: '/categories',
  component: Layout,
  redirect: '/categories/list',
  name: 'Category',
  meta: {
    title: 'category',
    icon: 'example'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/categories/create.vue'),
      name: 'CreateCategory',
      meta: { title: 'createCategory', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/categories/edit.vue'),
      name: 'EditCategory',
      meta: {
        icon: 'edit',
        title: 'editCategory',
        noCache: true,
        activeMenu: '/categories/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/categories/list.vue'),
      name: 'CategoryList',
      meta: { title: 'categoryList', icon: 'list' }
    }
  ]
}

export default categoryRoutes
