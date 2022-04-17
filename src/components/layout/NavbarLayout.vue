<template>
  <b-navbar type="dark" variant="info" fixed="top" class="gs-main-header">
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
        <b-dropdown-item href="#" @click="handleLogout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "NavbarLayout",
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout').then(
          () => {
            this.$router.push('/');
          }
      )
    }
  }
}
</script>

<style scoped lang="scss">
  .gs-main-header {
    min-height: 80px;
    background-color: $mainOrange !important;
  }
</style>