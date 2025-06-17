<template>
  <div class="cashsaved-page">
    <TheHeader />
    <h4 class="resumo-title">Resumo Financeiro</h4>
    <TheDashboard
      :contas="contas"
      @contas-atualizadas="atualizarContas"
      @nova-operacao="adicionarExtrato"
    />
    <TheStatement :extrato="extrato" />
    <div class="div-graficos">
      <TheGrafico
        :categorias="categorias"
        :extrato="extrato"
        tipo="entrada"
      />
      <TheGrafico
        :categorias="categorias"
        :extrato="extrato"
        tipo="saida"
      />
      <!-- Repita para outros gráficos se necessário -->
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheDashboard from '../components/TheDashboard.vue'
import TheFooter from '../components/TheFooter.vue'
import TheGrafico from '../components/TheGrafico.vue'
import TheStatement from '../components/TheStatement.vue'

export default {
  name: 'CashSaved',
  data() {
    return {
      extrato: JSON.parse(localStorage.getItem('extrato') || '[]'),
      categorias: JSON.parse(localStorage.getItem('categorias') || '[]'),
      contas: JSON.parse(localStorage.getItem('contas') || '[]')
    }
  },
  components: {
    TheHeader,
    TheDashboard,
    TheFooter,
    TheGrafico,
    TheStatement
  },
  methods: {
    adicionarExtrato(operacao) {
      this.extrato.push({
        banco: operacao.conta,
        valor: operacao.valor,
        categoria: operacao.categoria,
        tipo: operacao.tipo,
        data: operacao.data,
        titulo: operacao.titulo
      });
      localStorage.setItem('extrato', JSON.stringify(this.extrato));
    },
    atualizarCategorias(novasCategorias) {
      this.categorias = novasCategorias;
      localStorage.setItem('categorias', JSON.stringify(novasCategorias));
    },
    atualizarExtrato(novoExtrato) {
      this.extrato = novoExtrato;
      localStorage.setItem('extrato', JSON.stringify(novoExtrato));
    },
    atualizarContas(novasContas) {
      this.contas = novasContas;
      localStorage.setItem('contas', JSON.stringify(novasContas));
    },
  }
}
</script>

<style lang="scss" scoped>

.cashsaved-page {
  background: $secondary;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}

body.body--light .cashsaved-page {
  background: $background-light;
}

.resumo-title {
  font-weight: bold;
  color: $primary;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}

.div-graficos {
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  padding-top: 20px;
}

.div-graficos > * {
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  background: $secondary;
  border-radius: $radius;
  box-shadow: $shadow;
  transition: background 0.3s, color 0.3s;
}

body.body--light .div-graficos > * {
  background: $background-light;
}

@media (max-width: 900px) {
  .div-graficos {
    flex-direction: column;
    gap: 20px;
    width: 98vw;
    min-width: unset;
    max-width: unset;
  }
  .div-graficos > * {
    width: 100%;
    min-width: unset;
    max-width: unset;
  }
}
</style>
