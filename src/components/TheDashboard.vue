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

    <div class="dashboard-cards" :class="{ single: contas.length === 1 }">
      <CardDashboard
        v-for="(conta, index) in contas"
        :key="conta.nome"
        :conta="conta.nome"
        :valor="Number(conta.saldo)"
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
  props: {
    contas: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      showSaldoTotal: false,
      categorias: JSON.parse(localStorage.getItem('categorias') || '[]'),
      extrato: JSON.parse(localStorage.getItem('extrato') || '[]')
    }
  },
  computed: {
    saldoTotal() {
      return this.contas.reduce((acc, conta) => acc + Number(conta.saldo), 0)
    }
  },
  methods: {
    toggleSaldo() {
      this.showSaldoTotal = !this.showSaldoTotal
    },
    updateValor(index, novoValor) {
      if (!isNaN(novoValor) && novoValor >= 0) {
        const novasContas = this.contas.map((conta, i) =>
          i === index ? { ...conta, saldo: novoValor } : conta
        );
        this.$emit('contas-atualizadas', novasContas);
      }
    },
    novaOperacao(operacao) {
      this.$emit('nova-operacao', operacao);
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  background-color: $secondary;
  border-radius: $radius;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: $text-dark;
  box-shadow: $shadow;
  transition: background 0.3s, color 0.3s;
}

body.body--light .dashboard {
  background-color: $background-light;
  color: $text-light;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.section-title {
  color: $primary;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.saldo-container {
  text-align: center;
  background: $secondary;
  border-radius: $radius;
  padding: 18px 10px;
  box-shadow: $shadow;
  color: $text-dark;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  transition: background 0.3s, color 0.3s;
}

body.body--light .saldo-container {
  background: $background-light;
  color: $text-light;
}

.saldo-label {
  color: $accent;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.saldo-valor {
  font-size: 32px;
  font-weight: bold;
  color: $text-dark;
  margin: 5px 0;
  transition: color 0.3s;
}

body.body--light .saldo-valor {
  color: $text-light;
}

.btn-saldo {
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: $radius;
  background-color: $primary;
  color: $text-dark;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-saldo:hover {
  background-color: $accent;
  color: $text-dark;
}

.dashboard-cards {
  display: grid;
  gap: 24px;
  width: 100%;
  justify-items: stretch;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.dashboard-cards:only-child,
.dashboard-cards.single {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 24px;
}

.dashboard-cards.single > * {
  flex: 1 1 0;
  max-width: 100%;
}

.dashboard-cards.uma-conta {
  grid-template-columns: 1fr;
}

.dashboard-cards.duas-contas {
  grid-template-columns: 1fr 1fr;
}

.dashboard-cards.tres-ou-mais {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1200px) {
  .dashboard-cards.tres-ou-mais {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .dashboard-cards.duas-contas {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .dashboard {
    width: 98vw;
    padding: 10px;
  }
  .dashboard-cards {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .saldo-container {
    padding: 12px 4px;
    max-width: 98vw;
  }
  .section-title {
    font-size: 20px;
  }
  .saldo-label {
    font-size: 18px;
  }
  .saldo-valor {
    font-size: 22px;
  }
}

@media (max-width: 700px) {
  .dashboard-cards {
    gap: 12px;
    grid-template-columns: 1fr;
  }
}
</style>
