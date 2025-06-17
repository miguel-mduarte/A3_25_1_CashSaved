<template>
  <div>
    <div class="card-contas">
      <h5 class="card-title">Nova Conta</h5>
      <form @submit.prevent="adicionarConta">
        <div class="form-group">
          <label for="nomeConta">Nome</label>
          <input
            type="text"
            id="nomeConta"
            v-model="novaConta.nome"
            placeholder="Digite o nome da conta"
            class="input-conta"
            required
          />
        </div>
        <div class="form-group">
          <label for="saldoConta">Saldo inicial</label>
          <input
            type="number"
            id="saldoConta"
            v-model.number="novaConta.saldo"
            placeholder="Digite o saldo inicial"
            class="input-conta"
            min="0"
            required
          />
        </div>
        <div class="form-btns-contas">
          <button type="submit" class="btn-conta">Salvar</button>
        </div>
      </form>
    </div>

    <table class="table-contas" v-if="contas.length">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Saldo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conta in contas" :key="conta.nome">
          <td>{{ conta.nome }}</td>
          <td>
            R$ {{ Number(conta.saldo).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </td>
          <td>
            <button
              class="btn-conta btn-excluir"
              @click="excluirConta(conta)"
              title="Excluir conta"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ContasPage',
  data() {
    return {
      contas: JSON.parse(localStorage.getItem('contas') || '[]'),
      novaConta: {
        nome: "",
        saldo: null
      }
    }
  },
  methods: {
    adicionarConta() {
      if (!this.novaConta.nome || this.novaConta.saldo === null || this.novaConta.saldo < 0) return;
      if (this.contas.some(c => c.nome === this.novaConta.nome)) {
        alert("Já existe uma conta com esse nome!");
        return;
      }
      this.contas.push({ ...this.novaConta });
      localStorage.setItem('contas', JSON.stringify(this.contas));
      this.$emit('contas-atualizadas', this.contas);
      this.novaConta.nome = "";
      this.novaConta.saldo = null;
    },
    excluirConta(conta) {
      const idx = this.contas.findIndex(c => c.nome === conta.nome && c.saldo === conta.saldo);
      if (idx !== -1) {
        this.contas.splice(idx, 1);
        localStorage.setItem('contas', JSON.stringify(this.contas));
        this.$emit('contas-atualizadas', this.contas);
      }
    }
  }
}
</script>

<style scoped>
.card-contas {
  background-color: #2c3034;
  border-radius: 12px;
  padding: 32px 32px 24px 32px;
  max-width: 480px;
  margin: 36px auto 32px auto;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #00b894;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #00b894;
  margin-bottom: 2px;
  font-size: 15px;
}

.input-conta {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid #00b894;
  border-radius: 6px;
  background: #23272b;
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  margin-bottom: 0;
  transition: border 0.2s;
}

.input-conta:focus {
  border: 2px solid #00b894;
  outline: none;
}

.form-btns-contas {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.btn-conta {
  background-color: #00b894;
  color: #fff;
  border: none;
  padding: 10px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0 4px;
}
.btn-conta:hover {
  background-color: #019870;
}

.table-contas {
  margin-top: 24px;
  margin: auto;
  width: 80%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #23272b;
  color: #fff;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.table-contas th, .table-contas td {
  padding: 12px 10px;
  text-align: center;
}

.table-contas th {
  background-color: #00b894;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
}

.table-contas tr:nth-child(even) {
  background-color: #373b3e;
}

.table-contas tr:nth-child(odd) {
  background-color: #23272b;
}

.btn-excluir {
  background-color: #dc3545;
  color: #fff;
  margin-left: 4px;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.btn-excluir:hover {
  background-color: #fff;
  color: #dc3545;
  border: 1px solid #dc3545;
}

@media (max-width: 600px) {
  .card-contas {
    padding: 12px 4px 10px 4px;
    max-width: 98vw;
    margin: 18px 2vw 18px 2vw;
  }
  .table-contas th, .table-contas td {
    padding: 8px 4px;
    font-size: 13px;
  }
}
</style>