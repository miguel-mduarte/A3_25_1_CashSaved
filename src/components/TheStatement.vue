<template>
  <div class="extrato-container">
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

    <div class="table-extrato-wrapper">
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
            <td>R$ {{ Number(item.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
            <td>{{ item.categoria }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ formatarData(item.data) }}</td>
            <td>{{ item.titulo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
      return [...new Set(this.extrato.map(item => item.banco))];
    },
    extratoFiltradoOrdenado() {
      let lista = this.extrato;
      if (this.contaSelecionada) {
        lista = lista.filter(item => item.banco === this.contaSelecionada);
      }
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

<style lang="scss" scoped>

.extrato-container {
  background: $secondary;
  border-radius: $radius;
  box-shadow: $shadow;
  padding: 20px;
  width: 80%;
  max-width: 100vw;
  margin: 24px auto 0 auto;
  color: $text-dark;
  transition: background 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
body.body--light .extrato-container {
  background: $background-light;
  color: $text-light;
}

.section-title {
  color: $primary;
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
  background: transparent;
  padding: 12px 18px;
  border-radius: 8px;
  width: 100%;
}
.filtro-label {
  color: $primary;
  font-weight: bold;
  font-size: 16px;
}

.filtro-select {
  padding: 7px 14px;
  border-radius: 6px;
  border: 1px solid $primary;
  font-size: 15px;
  background: $secondary;
  color: $text-dark;
  outline: none;
  transition: border 0.2s, background 0.3s, color 0.3s;
}
body.body--light .filtro-select {
  background: $background-light;
  color: $text-light;
}
.filtro-select:focus {
  border: 2px solid $primary;
}

.table-extrato-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-extrato {
  margin-top: 10px;
  width: 100%;
  min-width: 520px;
  border-radius: 8px;
  background-color: $secondary;
  color: $text-dark;
  border-collapse: collapse;
  box-shadow: $shadow;
  transition: background 0.3s, color 0.3s;
  display: table;
}
body.body--light .table-extrato {
  background-color: $background-light;
  color: $text-light;
}

.table-extrato th, .table-extrato td {
  padding: 12px 10px;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
}

.table-extrato th {
  background-color: $primary;
  color: $text-dark;
  font-weight: bold;
  font-size: 16px;
}

.table-extrato tr:nth-child(even) {
  background-color: lighten($secondary, 4%);
}
.table-extrato tr:nth-child(odd) {
  background-color: $secondary;
}
body.body--light .table-extrato tr:nth-child(even) {
  background-color: lighten($background-light, 3%);
}
body.body--light .table-extrato tr:nth-child(odd) {
  background-color: $background-light;
}

@media (max-width: 900px) {
  .extrato-container {
    width: 98vw;
    padding: 10px;
    max-width: 100vw;
  }
  .table-extrato {
    min-width: 420px;
    font-size: 13px;
  }
}

@media (max-width: 600px) {
  .extrato-container {
    width: 98vw;
    max-width: 98vw;
    margin: 18px 1vw 18px 1vw;
    padding: 12px 4px 10px 4px;
    box-sizing: border-box;
  }
  .table-extrato-wrapper {
    width: 100%;
    background: $secondary;
    border-radius: 10px;
    padding: 6px 0;
    margin: 0 auto;
    box-sizing: border-box;
    overflow-x: auto;
  }
  body.body--light .table-extrato-wrapper {
    background: $background-light;
  }
  .table-extrato {
    width: 100%;
    min-width: 340px;
    table-layout: fixed;
    font-size: 12px;
    border-radius: 8px;
    overflow: hidden;
    display: table;
    background: transparent;
  }
  .table-extrato th, .table-extrato td {
    padding: 8px 4px;
    word-break: break-word;
  }
}
</style>