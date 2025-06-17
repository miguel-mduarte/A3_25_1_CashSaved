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

  <div class="table-categorias-wrapper">
    <table class="table-categorias">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Receita total</th>
          <th>Tipo</th>
          <th>Ícone</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categoriasFiltradas" :key="cat.nome + cat.tipo + cat.cor + cat.icone">
          <td>{{ cat.nome }}</td>
          <td>
            R$ {{ Number(calcularTotalCategoria(cat)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </td>
          <td>{{ cat.tipo }}</td>
          <td>
            <i :class="cat.icone" :style="{ color: cat.cor, fontSize: '1.5rem' }"></i>
          </td>
          <td>
            <button
              class="btn-categorias btn-excluir"
              @click="excluirCategoria(cat)"
              title="Excluir categoria"
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
  name: "TheForms",
  props: {
    extrato: {
      type: Array,
      default: () => JSON.parse(localStorage.getItem('extrato') || '[]')
    }
  },
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
  computed: {
    categoriasFiltradas() {
      return this.categorias.filter(cat => cat.nome && cat.nome.trim() !== '');
    }
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
    calcularTotalCategoria(cat) {
      return this.extrato
        .filter(item => item.categoria === cat.nome)
        .reduce((total, item) => {
          return item.tipo === 'entrada'
            ? total + parseFloat(item.valor)
            : total - parseFloat(item.valor);
        }, 0);
    },
    getCategoriaIndex(cat) {
      return this.categorias.findIndex(c => c.nome === cat.nome && c.tipo === cat.tipo);
    },
    excluirCategoria(cat) {
      const idx = this.categorias.findIndex(c =>
        c.nome === cat.nome &&
        c.tipo === cat.tipo &&
        c.cor === cat.cor &&
        c.icone === cat.icone
      );
        this.categorias.splice(idx, 1);
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
        this.$emit('categorias-atualizadas', this.categorias);
    }
  },
};
</script>

<style lang="scss" scoped>

.card-categorias {
  background-color: $secondary;
  border-radius: 12px;
  padding: 32px 32px 24px 32px;
  max-width: 480px;
  margin: 36px auto 32px auto;
  box-shadow: $shadow;
  color: $text-dark;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: background 0.3s, color 0.3s;
}
body.body--light .card-categorias {
  background-color: $background-light;
  color: $text-light;
}

.card-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: $primary;
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
  color: $primary;
  margin-bottom: 2px;
  font-size: 15px;
}

.input-categoria {
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid $primary;
  border-radius: 6px;
  background: $secondary;
  color: $text-dark;
  font-size: 15px;
  box-sizing: border-box;
  margin-bottom: 0;
  transition: border 0.2s, background 0.3s, color 0.3s;
}
body.body--light .input-categoria {
  background: $background-light;
  color: $text-light;
}

.input-categoria:focus {
  border: 2px solid $primary;
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
  background-color: $primary;
  color: $text-dark;
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
  background-color: $accent;
}

.table-categorias-wrapper {
  margin-top: 24px;
  margin: auto;
  width: 80%;
  border-radius: 10px;
  overflow: hidden;
  background-color: $secondary;
  color: $text-dark;
  border-collapse: collapse;
  box-shadow: $shadow;
  text-align: center;
  transition: background 0.3s, color 0.3s;
}
body.body--light .table-categorias-wrapper {
  background-color: $background-light;
  color: $text-light;
}

.table-categorias {
  width: 100%;
  border-collapse: collapse;
}

.table-categorias th, .table-categorias td {
  padding: 12px 10px;
  text-align: center;
}

.table-categorias th {
  background-color: $primary;
  color: $text-dark;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1px;
}

.table-categorias tr:nth-child(even) {
  background-color: lighten($secondary, 4%);
}
.table-categorias tr:nth-child(odd) {
  background-color: $secondary;
}
body.body--light .table-categorias tr:nth-child(even) {
  background-color: lighten($background-light, 3%);
}
body.body--light .table-categorias tr:nth-child(odd) {
  background-color: $background-light;
}

.btn-excluir {
  background-color: $error;
  color: $text-dark;
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
  color: $error;
  border: 1px solid $error;
}

@media (max-width: 600px) {
  .card-categorias {
    padding: 12px 4px 10px 4px;
    max-width: 98vw;
    margin: 18px 1vw 18px 1vw;
    width: 98vw;
    box-sizing: border-box;
  }
  .table-categorias-wrapper {
    width: 98vw;
    max-width: 98vw;
    margin: 18px 1vw 0 1vw;
    box-sizing: border-box;
    overflow-x: auto;
  }
  .table-categorias {
    width: 100%;
    min-width: 420px;
    table-layout: fixed;
    font-size: 13px;
    border-radius: 10px;
    display: table;
  }
  .table-categorias th, .table-categorias td {
    padding: 8px 4px;
  }
}
</style>
