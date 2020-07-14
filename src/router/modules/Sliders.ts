import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const sliderRoutes: RouteConfig = {
  path: '/sliders',
  component: Layout,
  redirect: '/sliders/list',
  name: 'Slider',
  meta: {
    title: 'slider',
    icon: 'qq'
  },
  children: [
    {
      path: 'create',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/sliders/create.vue'),
      name: 'CreateSlider',
      meta: { title: 'createSlider', icon: 'edit' }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/sliders/edit.vue'),
      name: 'EditSlider',
      meta: {
        icon: 'edit',
        title: 'editSlider',
        noCache: true,
        activeMenu: '/sliders/list',
        hidden: true
      }
    },
    {
      path: 'list',
      component: () =>
        import(/* webpackChunkName: "tab" */ '@/views/sliders/list.vue'),
      name: 'SliderList',
      meta: { title: 'sliderList', icon: 'list' }
    }
  ]
}

export default sliderRoutes
