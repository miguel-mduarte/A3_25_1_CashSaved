<template>
  <header class="header">
    <div class="logo-container">
      <RouterLink to="/"><img src="../assets/Logo.png" alt="Logo de nossa aplicação" class="logo"></RouterLink>
      <RouterLink to="/" style="text-decoration: none;"><h2 class="title">Cash $aved</h2></RouterLink>
    </div>

    <nav class="navigation">
      <ul class="nav-list">
        <li><RouterLink to="/"><i class="bi bi-house-door"></i>Dashboard</RouterLink></li>
        <li><RouterLink to="/Contas"><i class="bi bi-wallet2"></i>Contas</RouterLink></li>
        <li><RouterLink to="/Categorias"><i class="bi bi-tags"></i>Categorias</RouterLink></li>
        <li><RouterLink to="/emConstrucao"><i class="bi bi-flag"></i>Metas</RouterLink></li>
        <li><RouterLink to="/emConstrucao"><i class="bi bi-graph-up"></i>Projeções</RouterLink></li>
        <li><RouterLink to="/emConstrucao"><i class="bi bi-receipt"></i>Visão anual</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'app/node_modules/vue-router/dist/vue-router';

export default {
    name: 'TheHeader',
    components: { RouterLink }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0 132 105)
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 70px;
  margin-right: 10px;
}

.title {
  font-size: 30px;
  margin: 0;
  font-weight: bold;
  color: #fff;
}

.logo-container:hover {
  text-decoration: underline;
  color: #fff;
}

.navigation {
  display: flex;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-list li a {
  text-decoration: none;
  color: #fff;
  transition: 0.5s;
}

.nav-list li a:hover {
  color: #ccc;
  text-decoration: underline;
}

i {
  color: #fff;
  padding: 9px;
}

@media (max-width: 600px) {

  header {
    display: flex;
    flex-direction: column;
  }

  .nav-list {
    flex-direction: column;
  }

}
</style>
