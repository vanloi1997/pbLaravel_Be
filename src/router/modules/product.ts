import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const productRoutes: RouteConfig = {
  path: '/products',
  component: Layout,
  redirect: '/products/list',
  name: 'Product',
  meta: {
    title: 'product',
    icon: 'shopping'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/products/create.vue'),
      name: 'CreateProduct',
      meta: { title: 'createProduct', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/products/edit.vue'),
      name: 'EditProduct',
      meta: {
        icon: 'edit',
        title: 'editProduct',
        noCache: true,
        activeMenu: '/products/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/products/list.vue'),
      name: 'ProductList',
      meta: { title: 'productList', icon: 'list' }
    }
  ]
}

export default productRoutes
