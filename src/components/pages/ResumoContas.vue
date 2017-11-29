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

        <md-list-item v-for="contato in contatos" :key="contato.id">
          <md-ink-ripple></md-ink-ripple>
          <md-icon>account_circle</md-icon>

          <div class="md-list-text-container">
            <span>{{ contato.nome }}</span>
            <p>
              <span :class="{ 'text-receber': contato.saldo > 0, 'text-pagar': contato.saldo < 0 }">
                {{ Math.abs(contato.saldo) | preco }}
              </span>
            </p>
          </div>

          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </div>

    <md-dialog-prompt
      md-title="Novo contato"
      md-ok-text="Incluir"
      md-cancel-text="Cancelar"
      md-input-placeholder="Nome"
      v-model="nomeNovoContato"
      @close="onCloseDialogNovoContato"
      ref="dialogNovoContato">
    </md-dialog-prompt>

    <md-button class="md-fab md-fab-bottom-right" @click="incluirContato">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contatos: [{
        id: 1,
        nome: 'Camila',
        saldo: 530
      }, {
        id: 2,
        nome: 'Felipe',
        saldo: 150
      }, {
        id: 3,
        nome: 'Rafael',
        saldo: -5
      }],
      nomeNovoContato: ''
    }
  },

  computed: {
    totalReceber () {
      var total = 0

      this.contatos.forEach((contato) => {
        if (contato.saldo > 0) {
          total += contato.saldo
        }
      })

      return total
    },

    totalPagar () {
      var total = 0

      this.contatos.forEach((contato) => {
        if (contato.saldo < 0) {
          total += contato.saldo * -1
        }
      })

      return total
    }
  },

  methods: {
    incluirContato () {
      this.$refs['dialogNovoContato'].open()
      this.nomeNovoContato = ''
    },

    onCloseDialogNovoContato (status) {
      if (status === 'ok' && this.nomeNovoContato.trim().length) {
        this.contatos.push({
          id: this.contatos.length,
          nome: this.nomeNovoContato,
          saldo: 0
        })
      }
    }
  }
}
</script>

<style scoped>
  .main-content {
    top: 64px;
  }
</style>
