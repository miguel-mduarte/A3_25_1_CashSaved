<template>
  <div class="contas-page">
    <TheHeader />
    <h2 class="contas-title">Gerenciamento de Contas</h2>
    <TheAconts />
    <TheFooter class="pe"/>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import TheAconts from '../components/TheAconts.vue'

export default {
  name: 'ContasPage',
  components: {
    TheHeader,
    TheFooter,
    TheAconts
  }
}
</script>

<style lang="scss" scoped>

.contas-page {
  background: $secondary;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
}
body.body--light .contas-page {
  background: $background-light;
}

.contas-title {
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