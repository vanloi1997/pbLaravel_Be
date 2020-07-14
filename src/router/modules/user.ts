import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const userRoutes: RouteConfig = {
  path: '/users',
  component: Layout,
  redirect: '/users/list',
  name: 'User',
  meta: {
    title: 'user',
    icon: 'people'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/users/create.vue'),
      name: 'CreateUser',
      meta: { title: 'createUser', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/users/edit.vue'),
      name: 'EditUser',
      meta: {
        icon: 'edit',
        title: 'editUser',
        noCache: true,
        activeMenu: '/users/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/users/list.vue'),
      name: 'UserList',
      meta: { title: 'userList', icon: 'list' }
    }
  ]
}

export default userRoutes
