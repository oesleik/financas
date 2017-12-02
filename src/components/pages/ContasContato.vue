<template>
  <div>
    <md-whiteframe md-elevation="2">
      <md-toolbar>
        <router-link tag="md-button" to="/contas" class="md-icon-button">
          <md-icon>arrow_back</md-icon>
        </router-link>

        <h2 class="md-title" style="flex: 1;">{{contato.nome}}</h2>
      </md-toolbar>
    </md-whiteframe>

    <div class="main-content">
      <resumo-totais>
        <resumo-total label="Retorno">
          <span class="text-receber">{{ totalRecebido | preco }}</span>
        </resumo-total>
        <resumo-total label="Despesas">
          <span class="text-pagar">{{ totalPago | preco }}</span>
        </resumo-total>
        <resumo-total label="Balanço">
          <span>{{ totalBalanco | preco }}</span>
        </resumo-total>
      </resumo-totais>

      <md-list>
        <md-divider></md-divider>

        <md-list-item v-for="lancamento in lancamentos" :key="lancamento.id">
          <md-ink-ripple></md-ink-ripple>

          <div class="md-list-text-container">
            <span>
              {{ lancamento.data | data }}
              <span style="float: right;" :class="{ 'text-receber': lancamento.valor > 0, 'text-pagar': lancamento.valor < 0 }">
                {{ Math.abs(lancamento.valor) | preco }}
              </span>
            </span>
          </div>

          <md-divider></md-divider>
        </md-list-item>
      </md-list>
    </div>

    <md-dialog-prompt
      md-title="Novo lançamento"
      md-ok-text="Salvar"
      md-cancel-text="Cancelar"
      md-input-placeholder="Valor"
      v-model="valorNovoLancamento"
      @close="onCloseDialogNovoLancamento"
      ref="dialogNovoLancamento">
    </md-dialog-prompt>

    <md-button class="md-fab md-fab-bottom-right" @click="incluirLancamento">
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>

<script>
import db from '../../database'

export default {
  props: ['id_contato'],

  data () {
    return {
      contato: {
        id: this.id_contato,
        nome: ''
      },
      lancamentos: [],
      valorNovoLancamento: ''
    }
  },

  mounted () {
    db.contatos.get(parseInt(this.id_contato)).then((contato) => {
      if (contato) {
        this.contato.nome = contato.nome

        db.lancamentos.where({ 'id_contato': this.id_contato }).toArray().then((lancamentos) => {
          this.lancamentos = lancamentos
        })
      } else {
        this.$router.push({ name: 'Contas' })
      }
    })
  },

  computed: {
    totalBalanco () {
      var total = 0

      this.lancamentos.forEach((lancamento) => {
        total += lancamento.valor
      })

      return total
    },

    totalRecebido () {
      var total = 0

      this.lancamentos.forEach((lancamento) => {
        if (lancamento.valor > 0) {
          total += lancamento.valor
        }
      })

      return total
    },

    totalPago () {
      var total = 0

      this.lancamentos.forEach((lancamento) => {
        if (lancamento.valor < 0) {
          total += lancamento.valor * -1
        }
      })

      return total
    }
  },

  methods: {
    incluirLancamento () {
      this.$refs['dialogNovoLancamento'].open()
      this.valorNovoLancamento = ''
    },

    onCloseDialogNovoLancamento (status) {
      var valorLancamento = parseFloat(this.valorNovoLancamento.replace('.', '').replace(',', '.'))

      if (status === 'ok' && (valorLancamento > 0 || valorLancamento < 0)) {
        var lancamento = {
          id_contato: this.id_contato,
          valor: valorLancamento,
          data: Date.now()
        }

        db.lancamentos.add(lancamento).then((id) => {
          lancamento.id = id
          this.lancamentos.unshift(lancamento)
        })
      }
    }
  }
}
</script>
