<template>
  <div v-show="visivel" class="card-categorias">
    <h5 class="card-title">Nova Categoria</h5>
    <form @submit.prevent="salvarCategoria">
      <div class="form-group">
        <label for="nomeCategoria">Nome</label>
        <input
          type="text"
          id="nomeCategoria"
          v-model="categoria.nome"
          placeholder="Digite o nome da categoria"
          class="input-categoria"
        />
      </div>

      <div class="form-group">
        <label for="tipoCategoria">Tipo</label>
        <select id="tipoCategoria" v-model="categoria.tipo" class="input-categoria">
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>

      <div class="form-group">
        <label for="corCategoria">Cor</label>
        <input
          type="color"
          id="corCategoria"
          v-model="categoria.cor"
          title="Escolha uma cor"
          class="input-categoria input-color"
        />
      </div>

      <div class="form-group">
        <label for="iconeCategoria">Ícone</label>
        <select id="iconeCategoria" v-model="categoria.icone" class="input-categoria">
          <option value="bi-cart">🛒 Carrinho</option>
          <option value="bi-house">🏠 Casa</option>
          <option value="bi-car-front">🚗 Carro</option>
          <option value="bi-briefcase">💼 Trabalho</option>
          <option value="bi-x-circle">Nenhum</option>
        </select>
      </div>

      <div class="form-btns-categorias">
        <button type="submit" class="btn-categorias">Salvar</button>
      </div>
    </form>
  </div>

  <table class="table-categorias">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Valor</th>
        <th>Tipo</th>
        <th>Ícone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(cat, index) in categorias" :key="index">
        <td>{{ cat.nome }}</td>
        <td>R$ {{ parseFloat(cat.valor).toFixed(2) }}</td>
        <td>{{ cat.tipo }}</td>
        <td>
          <i :class="cat.icone" :style="{ color: cat.cor, fontSize: '1.5rem' }"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TheForms",
  data() {
    return {
      visivel: true,
      categoria: {
        nome: "",
        valor: "",
        tipo: "entrada",
        cor: "#000000",
        icone: "bi-cart",
      },
      categorias: JSON.parse(localStorage.getItem('categorias') || '[]'), 
    };
  },
  methods: {
    salvarCategoria() { 
      this.categorias.push({ ...this.categoria });
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
      this.categoria = {
        nome: "",
        valor: "",
        tipo: "entrada",
        cor: "#000000",
        icone: "bi-cart",
      };
      this.$emit('categorias-atualizadas', this.categorias);
    },
  },
};
</script>

<style scoped>
.card-categorias {
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

.input-categoria {
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

.input-categoria:focus {
  border: 2px solid #00b894;
  outline: none;
}

.input-color {
  height: 38px;
  width: 54px;
  padding: 2px;
  border: none;
  background: transparent;
}

.form-btns-categorias {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.btn-categorias {
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
.btn-categorias:hover {
  background-color: #019870;
}

.table-categorias {
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

.table-categorias th, .table-categorias td {
  padding: 12px 10px;
  text-align: center;
}

.table-categorias th {
  background-color: #00b894;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
}

.table-categorias tr:nth-child(even) {
  background-color: #373b3e;
}

.table-categorias tr:nth-child(odd) {
  background-color: #23272b;
}

@media (max-width: 600px) {
  .card-categorias {
    padding: 12px 4px 10px 4px;
    max-width: 98vw;
    margin: 18px 2vw 18px 2vw;
  }
  .table-categorias th, .table-categorias td {
    padding: 8px 4px;
    font-size: 13px;
  }
}
</style>
