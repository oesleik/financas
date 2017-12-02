import Vue from 'vue'
import Router from 'vue-router'

import Contas from '@/components/pages/Contas'
import ContasContato from '@/components/pages/ContasContato'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/contas',
      name: 'Contas',
      component: Contas
    },
    {
      props: true,
      path: '/contas/:id_contato',
      name: 'ContasContato',
      component: ContasContato
    },
    {
      path: '*',
      redirect: { name: 'Contas' }
    }
  ]
})
