<template>
  <div id="gs-app">
    <NavbarLayout v-if="loggedIn"/>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');
#gs-app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .page-item.active .page-link {
    background-color: $mainCyan !important;
    border-color: $mainCyan !important;
  }
}
</style>
<script>
import NavbarLayout from "@/components/layout/NavbarLayout";
export default {
  components: { NavbarLayout },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
}
</script>