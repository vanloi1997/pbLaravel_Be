import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const billRoutes: RouteConfig = {
  path: '/bills',
  component: Layout,
  redirect: '/bill/list',
  name: 'Bill',
  meta: {
    title: 'bill',
    icon: 'money'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bills/create.vue'),
      name: 'CreateBill',
      meta: { title: 'createBill', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bills/edit.vue'),
      name: 'EditBill',
      meta: {
        icon: 'edit',
        title: 'editBill',
        noCache: true,
        activeMenu: '/bills/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bills/list.vue'),
      name: 'BillList',
      meta: { title: 'billList', icon: 'list' }
    }
  ]
}

export default billRoutes
