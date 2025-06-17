<template>
  <div class="notfound-page">
    <TheHeader />
    <div class="flex">
      <img src="../assets/Logo.png" alt="Logo" class="logo-404">
      <h1 class="titulo_erro">
        Ops... Página não encontrada <br>
        <span>ERROR 404</span>
      </h1>
      <RouterLink to="/" class="btn_voltar">
        <i class="bi bi-house-door"></i>Voltar
      </RouterLink>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
</script>

<style lang="scss" scoped>
.notfound-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $secondary;
}
body.body--light .notfound-page {
  background: $background-light;
}

.flex {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.logo-404 {
  width: 120px;
  margin-bottom: 18px;
}

span {
  color: $error;
  font-size: 2.5rem;
}

.titulo_erro {
  font-size: 2rem;
  color: $text-dark;
  font-weight: bold;
  text-align: center;
  margin: 18px 0;
}
body.body--light .titulo_erro {
  color: $text-light;
}

.btn_voltar {
  padding: 14px 28px;
  background-color: $primary;
  border-radius: 18px;
  text-align: center;
  margin: 28px auto 0 auto;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  color: $text-dark;
  transition: background 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
}
.btn_voltar:hover {
  background-color: #fff;
  color: $primary;
  i {
    color: $primary;
  }
}
body.body--light .btn_voltar {
  color: $text-light;
}

i {
  transition: 0.3s;
  color: $text-dark;
}
body.body--light .btn_voltar i {
  color: $text-light;
}
</style>
