<template>
  <div class="statement">
    <h2 class="section-title">Extrato</h2>

    <div class="filtros">
      <label for="filtroConta" class="filtro-label">Conta:</label>
      <select id="filtroConta" v-model="contaSelecionada" class="filtro-select">
        <option value="">Todas</option>
        <option v-for="conta in contasDisponiveis" :key="conta" :value="conta">
          {{ conta }}
        </option>
      </select>
    </div>

    <table class="table-extrato">
      <thead>
        <tr>
          <th>Conta</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Tipo</th>
          <th>Data</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in extratoFiltradoOrdenado" :key="idx">
          <td>{{ item.banco }}</td>
          <td>R$ {{ parseFloat(item.valor).toFixed(2) }}</td>
          <td>{{ item.categoria }}</td>
          <td>{{ item.tipo }}</td>
          <td>{{ formatarData(item.data) }}</td>
          <td>{{ item.titulo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TheStatement",
  props: {
    extrato: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      contaSelecionada: ""
    };
  },
  computed: {
    contasDisponiveis() {
      // Retorna lista única de contas presentes no extrato
      return [...new Set(this.extrato.map(item => item.banco))];
    },
    extratoFiltradoOrdenado() {
      let lista = this.extrato;
      if (this.contaSelecionada) {
        lista = lista.filter(item => item.banco === this.contaSelecionada);
      }
      // Ordena por data decrescente (mais recente primeiro)
      return lista.slice().sort((a, b) => new Date(b.data) - new Date(a.data));
    }
  },
  methods: {
    formatarData(data) {
      if (!data) return "";
      const d = new Date(data);
      return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    }
  }
};
</script>

<style scoped>
.statement {
  background-color: #2c3034;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  color: #00b894;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.filtros {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 14px;
  background: #23272b;
  padding: 12px 18px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.filtro-label {
  color: #00b894;
  font-weight: bold;
  font-size: 16px;
}

.filtro-select {
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid #00b894;
  font-size: 15px;
  background: #2c3034;
  color: #fff;
  outline: none;
  transition: border 0.2s;
}
.filtro-select:focus {
  border: 2px solid #00b894;
}

.table-extrato {
  margin-top: 10px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: #23272b;
  color: #fff;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.table-extrato th, .table-extrato td {
  padding: 12px 10px;
  text-align: center;
}

.table-extrato th {
  background-color: #00b894;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.table-extrato tr:nth-child(even) {
  background-color: #373b3e;
}

.table-extrato tr:nth-child(odd) {
  background-color: #23272b;
}

@media (max-width: 600px) {
  .statement {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
  }
  .table-extrato th, .table-extrato td {
    padding: 8px 4px;
    font-size: 13px;
  }
  .filtros {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    width: 100%;
    padding: 10px 8px;
  }
}
</style>