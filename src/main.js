import 'vue-material/dist/vue-material.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'

import mixinFilters from '@/filters'

import ResumoTotais from '@/components/ResumoTotais'
import ResumoTotal from '@/components/ResumoTotal'
import Spacer from '@/components/Spacer'

Vue.mixin({
  filters: mixinFilters
})

Vue.component('resumo-totais', ResumoTotais)
Vue.component('resumo-total', ResumoTotal)
Vue.component('spacer', Spacer)

Vue.use(VueMaterial)
Vue.config.productionTip = false

Vue.material.registerTheme('default', {
  primary: 'teal',
  accent: 'pink'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
