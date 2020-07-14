import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const billStateRoutes: RouteConfig = {
  path: '/bill-states',
  component: Layout,
  redirect: '/bill-states/list',
  name: 'BillState',
  meta: {
    title: 'billState',
    icon: 'tree-table'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-states/create.vue'),
      name: 'CreateBillState',
      meta: { title: 'createBillState', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-states/edit.vue'),
      name: 'EditBillState',
      meta: {
        icon: 'edit',
        title: 'editBillState',
        noCache: true,
        activeMenu: '/bill-states/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/bill-states/list.vue'),
      name: 'BillStateList',
      meta: { title: 'billStateList', icon: 'list' }
    }
  ]
}

export default billStateRoutes
