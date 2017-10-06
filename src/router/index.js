import Vue from 'vue'
import Router from 'vue-router'
import ResumoContas from '@/components/pages/ResumoContas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResumoContas',
      component: ResumoContas
    }
  ]
})
