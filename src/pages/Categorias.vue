<template>
  <div class="categorias-page">
    <TheHeader />
    <h2 class="categorias-title">Gerenciamento de Categorias</h2>
    <TheForms />
    <TheFooter class="pe"/>
  </div>
</template>
<script>
import TheFooter from '../components/TheFooter.vue'
import TheHeader from '../components/TheHeader.vue'
import TheForms from '../components/TheForms.vue'

export default {
  name: 'CategoriasPage',
  components: {
    TheHeader,
    TheFooter,
    TheForms
  }
}
</script>
<style lang="scss" scoped>

.categorias-page {
  background: $secondary;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}
body.body--light .categorias-page {
  background: $background-light;
}

.categorias-title {
  font-weight: bold;
  color: $primary;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
}

.pe {
  bottom: 0;
  width: 100%;
}
</style>