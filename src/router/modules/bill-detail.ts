import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const billDetailRoutes: RouteConfig = {
  path: '/bill-details',
  component: Layout,
  redirect: '/bill-details/list',
  name: 'BillDetail',
  meta: {
    title: 'billDetail',
    icon: 'form'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-details/create.vue'),
      name: 'CreateBillDetail',
      meta: { title: 'createBillDetail', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-details/edit.vue'),
      name: 'EditBillDetail',
      meta: {
        icon: 'edit',
        title: 'editBillDetail',
        noCache: true,
        activeMenu: '/bill-details/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-details/list.vue'),
      name: 'BillDetailList',
      meta: { title: 'billDetailList', icon: 'list' }
    }
  ]
}

export default billDetailRoutes
