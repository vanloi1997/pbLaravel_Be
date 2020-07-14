import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import VeeValidate from 'vee-validate'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app'
import router from '@/router'
import i18n from '@/lang' // Internationalization
import '@/icons/components'
import '@/permission'
import '@/utils/error-log' // Error log
import '@/registerServiceWorker'
import { unique } from './api'

import { mockXHR } from '../mock'
import { uniqueEmail } from './api/validate'
mockXHR()

Vue.use(ElementUI, {
  size: AppModule.size, // set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

VeeValidate.Validator.extend('unique', {
  getMessage(field: string) {
    return `${field} must be unique`
  },
  async validate(value: any, condition: any) {
    if (condition[1] === undefined) return await unique(value, condition[0])
    return await unique(value, condition[0], condition[1])
  }
})

VeeValidate.Validator.extend('uniqueEmail', {
  getMessage(field: string) {
    return `${field} must be unique`
  },
  async validate(value: any, condition: any) {
    if (condition[1] === undefined) {
      return await uniqueEmail(value, condition[0])
    }
    return await uniqueEmail(value, condition[0], condition[1])
  }
})

Vue.use(VeeValidate, { events: 'blur', fieldsBagName: 'veeFields' })

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
