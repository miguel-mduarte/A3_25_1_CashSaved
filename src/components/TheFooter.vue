<template>
  <footer class="footer">
    <div class="text-footer">
      <p>&copy; 2025 Cash Saved. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>

.footer {
  background-color: $header-dark;
  padding: 20px;
  margin-top: 40px;
  width: 100%;
  transition: background 0.3s;
}
body.body--light .footer {
  background-color: $header-light;
}

.text-footer, p {
  color: $text-dark;
  text-align: center;
  margin: 0;
}
body.body--light .text-footer {
  color: $text-dark;
}
</style>
