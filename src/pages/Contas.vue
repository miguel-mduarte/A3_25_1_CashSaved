<template>
  <div>
    <TheHeader />
    <h2>Gerenciamento de Contas</h2>
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

<style>
h2 {
    font-weight: bold;
    color: #008469;
    font-size: 30px;
    text-align: center;
}
.pe {
  bottom: 0;
  width: 100%;
}
</style>