<template>
  <div>
    <md-whiteframe md-elevation="2">
      <md-toolbar>
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title" style="flex: 1;">Finanças</h2>

        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>

      <md-tabs md-fixed md-centered :md-dynamic-height="false" class="hide-tab-content" @change="alterarView">
        <md-tab  :md-active="view === 'T'" md-label="Todas"></md-tab>
        <md-tab :md-active="view === 'R'" md-label="Receber"></md-tab>
        <md-tab :md-active="view === 'P'" md-label="Pagar"></md-tab>
      </md-tabs>
    </md-whiteframe>

    <div class="main-content">
      <resumo-totais>
        <resumo-total label="A receber">
          <span class="text-receber">{{ totalReceber | preco }}</span>
        </resumo-total>
        <resumo-total label="A pagar">
          <span class="text-pagar">{{ totalPagar | preco }}</span>
        </resumo-total>
      </resumo-totais>

      <md-list class="md-double-line md-dense">
        <md-divider></md-divider>

        <md-list-item v-for="(conta, idx) in listaContas" :key="conta.id">
          <md-ink-ripple></md-ink-ripple>
          <md-icon>{{ conta.icone }}</md-icon>

          <div class="md-list-text-container">
            <span>{{ conta.contato }}</span>
            <p>
              <span :class="{ 'text-receber': conta.tipo === 'R', 'text-pagar': conta.tipo === 'P' }">
                {{ conta.valor - conta.pago | preco }}
              </span>
            </p>
          </div>

          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </div>

    <md-speed-dial md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>add</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="incluir('P')">
        <md-icon>file_upload</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean" @click="incluir('R')">
        <md-icon>file_download</md-icon>
      </md-button>
    </md-speed-dial>
  </div>
</template>

<script>
export default {
  data () {
    return {
      view: 'T',
      contas: [{
        id: 1,
        tipo: 'R',
        contato: 'Camila',
        icone: 'account_circle',
        valor: 1600,
        pago: 600
      }, {
        id: 2,
        tipo: 'R',
        contato: 'Felipe',
        icone: 'account_circle',
        valor: 700,
        pago: 500
      }, {
        id: 3,
        tipo: 'P',
        contato: 'Rafael',
        icone: 'shopping_cart',
        valor: 43,
        pago: 0
      }]
    }
  },

  computed: {
    listaContas () {
      return this.contas.filter((conta) => {
        if (conta.valor - conta.pago <= 0) {
          return false
        }

        return this.view === 'T' || conta.tipo === this.view
      })
    },
    totalReceber () {
      var total = 0

      this.contas.forEach((conta) => {
        if (conta.tipo === 'R' && conta.valor - conta.pago > 0) {
          total += conta.valor - conta.pago
        }
      })

      return total
    },
    totalPagar () {
      var total = 0

      this.contas.forEach((conta) => {
        if (conta.tipo === 'P' && conta.valor - conta.pago > 0) {
          total += conta.valor - conta.pago
        }
      })

      return total
    }
  },

  methods: {
    alterarView (view) {
      this.view = {
        'T': 'T',
        '0': 'T',
        'R': 'R',
        '1': 'R',
        'P': 'P',
        '2': 'P'
      }[view] || this.view
    },

    incluir (tipo) {
      this.contas.push({
        id: this.contas.length + 1,
        tipo: tipo,
        contato: 'Anônimo',
        icone: 'account_circle',
        valor: 100,
        pago: 0
      })
    }
  }
}
</script>

<style scoped>
  .main-content {
    top: 112px;
  }
</style>
