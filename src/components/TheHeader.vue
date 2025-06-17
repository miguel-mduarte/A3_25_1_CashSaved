<template>
  <header class="header">
    <div class="logo-container">
      <RouterLink to="/"><img src="../assets/Logo.png" alt="Logo de nossa aplicação" class="logo"></RouterLink>
      <RouterLink to="/" style="text-decoration: none;">
        <h2 class="title title-full">Cash $aved</h2>
        <h2 class="title title-short">C$</h2>
      </RouterLink>
    </div>
    <div class="header-actions">
      <nav class="navigation">
        <button class="burger-btn" @click="menuAberto = !menuAberto" aria-label="Abrir menu" v-show="isMobile">
          <i class="bi bi-list"></i>
        </button>
        <ul
          class="nav-list"
          :class="{ aberto: menuAberto || !isMobile }"
        >
          <li><RouterLink to="/"><i class="bi bi-house-door"></i>Dashboard</RouterLink></li>
          <li><RouterLink to="/Contas"><i class="bi bi-wallet2"></i>Contas</RouterLink></li>
          <li><RouterLink to="/Categorias"><i class="bi bi-tags"></i>Categorias</RouterLink></li>
          <li><RouterLink to="/emConstrucao"><i class="bi bi-flag"></i>Metas</RouterLink></li>
          <li><RouterLink to="/emConstrucao"><i class="bi bi-graph-up"></i>Projeções</RouterLink></li>
          <li><RouterLink to="/emConstrucao"><i class="bi bi-receipt"></i>Visão anual</RouterLink></li>
        </ul>
      </nav>
      <button class="btn-modo" @click="toggleDarkMode">
        <i :class="isDark ? 'bi bi-moon' : 'bi bi-brightness-high'"></i>
        <span class="modo-text">{{ !isMobile ? (isDark ? 'Escuro' : 'Claro') : '' }}</span>
      </button>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { Dark } from 'quasar'

export default {
  name: 'TheHeader',
  components: { RouterLink },
  data() {
    return {
      menuAberto: false,
      isDark: Dark.isActive,
      isMobile: window.innerWidth <= 1010
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark
      Dark.set(this.isDark)
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 1010
      if (!this.isMobile) this.menuAberto = false
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $header-dark;
  transition: background 0.3s;
  padding: 0 24px;
}

body.body--light .header {
  background-color: $header-light;
}

.header,
.header * {
  color: $text-dark !important;
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
  color: $text-dark;
  transition: font-size 0.3s;
}

.title-short {
  display: none;
}

.title-full {
  display: block;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navigation {
  display: flex;
  align-items: center;
  position: relative;
}

.burger-btn {
  display: none;
  background: transparent;
  border: none;
  color: $primary;
  font-size: 42px;
  cursor: pointer;
  padding: 0 8px;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
}

.nav-list li a {
  text-decoration: none;
  color: $text-dark;
  transition: color 0.3s;
}

.nav-list li a:hover {
  color: $hover;
  text-decoration: underline;
}

i {
  color: $text-dark;
  padding: 9px;
}

.btn-modo {
  background: transparent;
  border: none;
  color: $text-dark;
  font-size: 22px;
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}
.btn-modo:hover {
  color: $primary;
}

.modo-text {
  margin-left: 6px;
  font-size: 16px;
}

@media (max-width: 1010px) {
  .nav-list {
    flex-direction: column;
    display: none;
    position: absolute;
    top: 40px;
    right: 0;
    min-width: 210px;
    border-radius: $radius;
    box-shadow: $shadow;
    z-index: 10;
    gap: 0;
    background: $secondary;
  }
  body.body--light .nav-list.aberto {
    background: $background-light;
  }
  .nav-list.aberto {
    display: flex;
  }
  .nav-list li {
    border-bottom: 1px solid $primary;
    padding: 12px 18px;
  }
  .nav-list li:last-child {
    border-bottom: none;
  }
  .burger-btn {
    display: block;
    font-size: 42px;
    color: $primary;
  }
  .modo-text {
    display: none;
  }
  
  body.body--light .nav-list.aberto li a,
  body.body--light .nav-list.aberto li i {
    color: $text-light !important;
  }
}
@media (max-width: 1100px) {
  .title-full {
    display: none;
  }
  .title-short {
    display: block;
    font-size: 32px;
  }
}
</style>
