import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const productTypeRoutes: RouteConfig = {
  path: '/product-types',
  component: Layout,
  redirect: '/product-types/list',
  name: 'ProductType',
  meta: {
    title: 'productType',
    icon: 'nested'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/product-types/create.vue'),
      name: 'CreateProductType',
      meta: { title: 'createProductType', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/product-types/edit.vue'),
      name: 'EditProductType',
      meta: {
        icon: 'edit',
        title: 'editProductType',
        noCache: true,
        activeMenu: '/product-types/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/product-types/list.vue'),
      name: 'ProductTypeList',
      meta: { title: 'productTypeList', icon: 'list' }
    }
  ]
}

export default productTypeRoutes
