<template>
  <div class="container-grafico">
    <div class="pie-chart" :style="{ background: pieChartGradient }"></div>
    <div class="legend">
      <div
        class="legend-item"
        v-for="(cat, idx) in categoriasFiltradas"
        :key="cat.nome + cat.tipo + cat.cor + cat.icone"
      >
        <div class="color-box" :style="{ backgroundColor: cat.cor }"></div>
        <i :class="cat.icone" :style="{ color: cat.cor, fontSize: '1.2rem' }"></i>
        <span>
          {{ cat.nome }}<br>
          <small>
            {{ percentuais[idx] }}% — R$ {{ totaisPorCategoria[idx].toFixed(2) }}
          </small>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheGrafico',
  props: {
    categorias: {
      type: Array,
      required: true
    },
    extrato: {
      type: Array,
      required: true
    },
    tipo: {
      type: String,
      required: true // 'entrada' ou 'saida'
    }
  },
  computed: {
    categoriasFiltradas() {
      return this.categorias.filter(cat => cat.tipo === this.tipo);
    },
    totaisPorCategoria() {
      return this.categoriasFiltradas.map(cat =>
        this.extrato
          .filter(item => item.categoria === cat.nome && item.tipo === this.tipo)
          .reduce((total, item) => total + parseFloat(item.valor), 0)
      );
    },
    totalGeral() {
      return this.totaisPorCategoria.reduce((a, b) => a + b, 0) || 1;
    },
    percentuais() {
      return this.totaisPorCategoria.map(total =>
        ((total / this.totalGeral) * 100).toFixed(0)
      );
    },
    pieChartGradient() {
      let start = 0;
      const stops = this.percentuais.map((perc, idx) => {
        const end = start + Number(perc);
        const color = this.categoriasFiltradas[idx].cor;
        const stop = `${color} ${start}% ${end}%`;
        start = end;
        return stop;
      });
      return stops.length
        ? `conic-gradient(${stops.join(', ')})`
        : '#ccc';
    }
  }
};
</script>

<style scoped>
.container-grafico {
  display: flex;
  flex-direction: row;
  background-color: #2c3034;
  border-radius: 15px;
  padding: 32px 32px 24px 32px;
  color: #fff;
  align-items: center;
  gap: 32px;
}

.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.18);
  border: 4px solid #00b894;
  background-color: #2c3034;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 220px;
  flex-grow: 1;
  background: #2c3034;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  word-wrap: break-word;
}

.color-box {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #00b894;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

@media (max-width: 600px) {
  .container-grafico {
    flex-direction: column;
    align-items: center;
    width: 98vw;
    padding: 12px 4px 10px 4px;
    gap: 18px;
  }

  .pie-chart {
    margin-right: 0;
    margin-bottom: 18px;
  }

  .legend {
    max-width: 100%;
    align-items: center;
    padding: 12px 8px;
  }
}
</style>
