<template>
  <div class="dashboard">
    <div class="top-section">
      <h2 class="section-title">Saldos</h2>

      <div class="saldo-container">
        <h3 class="saldo-label">Saldo Total:</h3>
        <p class="saldo-valor" v-if="showSaldoTotal">
          {{ saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
        </p>
        <p class="saldo-valor" v-else>R$ *********</p>
        <button class="btn-saldo" @click="toggleSaldo">
          {{ showSaldoTotal ? 'Ocultar Saldo' : 'Ver Saldo' }}
        </button>
      </div>
    </div>

    <div class="dashboard-cards">
      <CardDashboard
        v-for="(conta, index) in contas"
        :key="conta.id"
        :conta="conta.id"
        :valor="conta.valor"
        @update-valor="updateValor(index, $event)"
        @nova-operacao="novaOperacao"
      />
    </div>
  </div>
</template>

<script>
import CardDashboard from './CardDashboard.vue'

export default {
  name: 'TheDashboard',
  components: {
    CardDashboard,
  },
  data() {
    return {
      showSaldoTotal: false,
      contas: [
        { id: 1, valor: 500 },
        { id: 2, valor: 200 },
        { id: 3, valor: 300 }
      ]
    }
  },
  computed: {
    saldoTotal() {
      return this.contas.reduce((acc, conta) => acc + conta.valor, 0)
    }
  },
  methods: {
    toggleSaldo() {
      this.showSaldoTotal = !this.showSaldoTotal
    },
    updateValor(index, novoValor) {
      if (!isNaN(novoValor) && novoValor >= 0) {
        this.contas[index].valor = novoValor
      }
    },
    novaOperacao(operacao) {
      this.$emit('nova-operacao', operacao);
    }
  }
}
</script>

<style>
.dashboard {
  background-color: #2c3034;
  border-radius: 10px;
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-cards {
  display: flex;
  justify-content: space-around;
}

.section-title {
  color: #00b894;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.saldo-container {
  text-align: center;
}

.saldo-label {
  color: #d9d9d9;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.saldo-valor {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin: 5px 0;
}

.btn-saldo {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #00b894;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-saldo:hover {
  background-color: #019870;
}

@media (max-width: 600px) {
  .dashboard-cards {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
