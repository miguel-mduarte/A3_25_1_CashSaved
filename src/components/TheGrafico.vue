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

<style lang="scss" scoped>

.container-grafico {
  display: flex;
  flex-direction: row;
  background-color: $secondary;
  border-radius: 15px;
  padding: 32px 32px 24px 32px;
  color: $text-dark;
  align-items: center;
  gap: 32px;
  transition: background 0.3s, color 0.3s;
  flex-wrap: wrap;
}
body.body--light .container-grafico {
  background-color: $background-light;
  color: $text-light;
}

.pie-chart {
  width: 200px;
  max-width: 40vw;
  aspect-ratio: 1 / 1;
  height: auto;
  border-radius: 50%;
  box-shadow: $shadow;
  border: 4px solid $primary;
  background-color: $secondary;
  transition: background 0.3s, border 0.3s;
  flex-shrink: 0;
  margin: 0 auto;
}
body.body--light .pie-chart {
  background-color: $background-light;
  border-color: $primary;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 220px;
  min-width: 140px;
  flex-grow: 1;
  background: $secondary;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: $shadow;
  transition: background 0.3s, color 0.3s;
  font-size: 16px;
  align-items: flex-start;
}
body.body--light .legend {
  background: $background-light;
  color: $text-light;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: inherit;
  font-weight: 500;
  color: $text-dark;
  word-wrap: break-word;
}
body.body--light .legend-item {
  color: $text-light;
}

.color-box {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid $primary;
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}

@media (max-width: 1100px) {
  .container-grafico {
    padding: 18px 10px 14px 10px;
    gap: 18px;
  }
  .pie-chart {
    width: 150px;
    max-width: 60vw;
  }
  .legend {
    max-width: 180px;
    font-size: 15px;
    padding: 12px 10px;
  }
}

@media (max-width: 900px) {
  .container-grafico {
    flex-direction: column;
    align-items: center;
    width: 98vw;
    padding: 12px 4vw 10px 4vw;
    gap: 18px;
  }
  .pie-chart {
    width: 200px;       
    max-width: 90vw;
    min-width: 160px;
    margin-bottom: 12px;
  }
  .legend {
    max-width: 98vw;
    min-width: unset;
    width: 100%;
    align-items: center;
    font-size: 14px;
    padding: 10px 4vw;
  }
}

@media (max-width: 600px) {
  .container-grafico {
    padding: 8px 2vw 8px 2vw;
    gap: 12px;
  }
  .pie-chart {
    width: 180px;
    max-width: 96vw;
    min-width: 140px;
    margin-bottom: 8px;
  }
  .legend {
    font-size: 13px;
    padding: 8px 2vw;
    gap: 10px;
  }
}
</style>
