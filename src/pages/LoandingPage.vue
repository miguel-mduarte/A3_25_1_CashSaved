<template>
  <div class="loanding-page">
    <TheHeader />
    <div class="divEmConstrucao">
      <img src="../assets/emConstrucao.jpg" alt="">
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  name: 'LoandingPage',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>

.loanding-page {
  background: $secondary;
  min-height: 100vh;
  transition: background 0.3s;
}
body.body--light .loanding-page {
  background: $background-light;
}

.divEmConstrucao {
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  max-width: 90vw;
  max-height: 60vh;
  border-radius: $radius;
  box-shadow: $shadow;
}
</style>