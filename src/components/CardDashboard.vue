<template>
  <div class="container">
    <div class="infos-conta">
      <p id="conta">{{ conta }}</p>
      <p id="valor" v-if="showValue">
        R$ {{ Number(valorInterno).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
      </p>
      <p id="valor" v-else>R$ *********</p>
    </div>

    <div class="linha-botoes">
      <button class="btn-saldo" @click="toggleValue">
        {{ showValue ? 'Ocultar Saldo' : 'Ver Saldo' }}
      </button>
    </div>
    <div class="linha-botoes">
      <button class="square-btn" @click="mostrarInput = mostrarInput === '+' ? null : '+'">
        <q-icon name="add" />
      </button>
      <button class="square-btn red-btn" @click="mostrarInput = mostrarInput === '-' ? null : '-'">
        <q-icon name="remove" />
      </button>
    </div>

    <div v-if="mostrarInput" class="input-container">
      <input
        type="number"
        v-model.number="novoValor"
        placeholder="Insira o valor"
        class="input-valor"
      />
      <select v-model="novaCategoria" class="input-valor" style="margin-bottom: 12px;">
        <option disabled value="">Selecione a categoria</option>
        <option v-for="cat in categoriasFiltradas" :key="cat.nome + cat.tipo" :value="cat.nome">
          {{ cat.nome }}
        </option>
      </select>
      <input
        type="text"
        v-model="novoTitulo"
        placeholder="Descrição"
        class="input-valor"
        style="margin-bottom: 12px;"
      />
      <div class="form-btns">
        <button id="button3" @click="confirmarOperacao">
          Confirmar
        </button>
        <button id="button-cancelar" @click="cancelarOperacao">
          Cancelar
        </button>
      </div>
      <p v-if="mensagemErro" class="mensagem-erro">{{ mensagemErro }}</p>
    </div>
  </div>
</template>

<script>
import { QIcon } from 'quasar'

export default {
  name: 'CardDashboard',
  components: { QIcon },
  props: {
    conta: {
      type: String,
      required: true
    },
    valor: {
      type: Number,
      required: true
    },
  },

  data() {
    return {
      showValue: false,
      valorInterno: this.valor,
      mostrarInput: null, // '+' ou '-'
      novoValor: null,
      novaCategoria: '',
      novoTitulo: '',
      categoriasUsuario: JSON.parse(localStorage.getItem('categorias') || '[]'),
      visivel: true,
      tipoAcao: "entrada", // ou "saida", altere conforme a ação do usuário
      categoria: {
        nome: "",
        valor: "",
        tipo: "entrada",
        cor: "#000000",
        icone: "bi-cart",
      },
      categorias: JSON.parse(localStorage.getItem('categorias') || '[]'), 
    }
  },

  computed: {
    categoriasFiltradas() {
      if (this.mostrarInput === '+') {
        return this.categoriasUsuario.filter(cat => cat.tipo === 'entrada');
      } else if (this.mostrarInput === '-') {
        return this.categoriasUsuario.filter(cat => cat.tipo === 'saida');
      }
      return [];
    }
  },

  mounted() {
    this.carregarCategorias();
    window.addEventListener('storage', this.carregarCategorias);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.carregarCategorias);
  },
  methods: {
    carregarCategorias() {
      const cats = localStorage.getItem('categorias');
      this.categoriasUsuario = cats ? JSON.parse(cats) : [];
    },
    toggleValue() {
      this.showValue = !this.showValue;
    },
    confirmarOperacao() {
      this.mensagemErro = '';
      if (!isNaN(this.novoValor) && this.novoValor !== null && this.novaCategoria && this.novoTitulo) {
        const tipo = this.mostrarInput;
        if (tipo === '+') {
          this.valorInterno += this.novoValor;
          this.$emit('update-valor', this.valorInterno);
          this.$emit('nova-operacao', {
            conta: this.conta,
            valor: this.novoValor,
            categoria: this.novaCategoria,
            tipo: 'entrada',
            data: new Date().toISOString(),
            titulo: this.novoTitulo
          });
          this.novoValor = null;
          this.novaCategoria = '';
          this.novoTitulo = '';
          this.mostrarInput = null;
        } else if (tipo === '-') {
          if (this.valorInterno - this.novoValor < 0) {
            this.mensagemErro = 'Operação não permitida: saldo não pode ficar negativo.';
            return;
          }
          this.valorInterno -= this.novoValor;
          this.$emit('update-valor', this.valorInterno);
          this.$emit('nova-operacao', {
            conta: this.conta,
            valor: this.novoValor,
            categoria: this.novaCategoria,
            tipo: 'saida',
            data: new Date().toISOString(),
            titulo: this.novoTitulo
          });
          this.novoValor = null;
          this.novaCategoria = '';
          this.novoTitulo = '';
          this.mostrarInput = null;
        }
      } else {
        this.mensagemErro = 'Preencha todos os campos corretamente.';
      }
    },
    cancelarOperacao() {
      this.novoValor = null;
      this.novaCategoria = '';
      this.novoTitulo = '';
      this.mostrarInput = null;
      this.mensagemErro = '';
    },
    abrirFormulario(tipo) {
      this.tipoAcao = tipo; // tipo deve ser 'entrada' ou 'saida'
      this.visivel = true;
    }
  },
  watch: {
    valor(newVal) {
      this.valorInterno = newVal;
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  background-color: $secondary;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;        
  min-width: 0;       
  max-width: 100%;    
  border-radius: $radius;
  padding: 18px 10px;
  box-shadow: $shadow;
  transition: background 0.3s, color 0.3s;
  color: $text-dark;
  margin: 0;         
  height: 100%;       
}

body.body--light .container {
  background-color: $background-light;
  color: $text-light;
}

.infos-conta {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#conta {
  color: $primary;
  font-size: 20px;
  font-weight: bold;
}

#valor {
  color: $text-dark;
  font-size: 18px;
  text-align: center;
}

body.body--light #valor {
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

#button3 {
  background-color: $accent;
  color: $text-dark;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  margin: 10px;
  transition: background 0.2s, color 0.2s;
}
#button3:hover {
  color: $accent;
  background-color: #FFF;
}

#button-cancelar {
  background-color: $error;
  color: $text-dark;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
  margin: 10px;
  transition: background 0.2s, color 0.2s;
}
#button-cancelar:hover {
  background-color: #fff;
  color: $error;
  border: 1px solid $error;
}

.square-btn {
  background-color: $primary;
  color: $text-dark;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  font-size: 20px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;
}
.square-btn:hover {
  background-color: $accent;
}

.red-btn {
  background-color: $error;
}
.red-btn:hover {
  background-color: #ff6b81;
}

.input-container {
  background: $secondary;
  border-radius: 10px;
  box-shadow: $shadow;
  padding: 18px 20px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 220px;
  border: 1.5px solid $primary;
  color: $text-dark;
}

body.body--light .input-container {
  background: $background-light;
  color: $text-light;
}

.input-valor {
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1.5px solid $primary;
  margin-bottom: 12px;
  background: $secondary;
  color: $text-dark;
}

body.body--light .input-valor {
  background: $background-light;
  color: $text-light;
}

.form-btns {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 8px;
  align-items: center;
  justify-content: center;
}
.mensagem-erro {
  color: $error;
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.linha-botoes {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
}

@media (max-width: 1200px) {
  .container {
    max-width: 48vw;
    min-width: 220px;
  }
}
@media (max-width: 900px) {
  .container {
    max-width: 98vw;
    min-width: 180px;
    margin: 10px 0;
    padding: 10px 2vw;
  }
  .input-container {
    min-width: unset;
    width: 100%;
    padding: 12px 4px;
  }
}
</style>
