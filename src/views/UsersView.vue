<template>
  <b-container class="py-5 mt-5">
    <b-row>
      <b-col>
        <Transition name="fade" mode="out-in">
          <div v-if="loadingData" class="d-flex justify-content-center flex-sm-column align-items-center mt-4 p-4">
            <b-icon icon="clock" animation="spin" font-scale="2" shift-v="8"></b-icon>
            <b-alert class="w-100 mt-5 text-center" show variant="info">Please wait...Loading users data</b-alert>
          </div>
          <section v-else>
            <div class="d-flex align-items-center mb-4">
              <div style="font-size: 20px">
                <b-icon icon="people" class="border rounded bg-info p-1" variant="light"></b-icon>
              </div>
              <h5 class="mb-0 ml-2">Users list</h5>
            </div>
            <UsersDatatable/>
          </section>
        </Transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UsersDatatable from "@/components/users/UsersDatatable";
export default {
  name: "UsersView",
  data() {
    return {
      loadingData: true,
    }
  },
  components: { UsersDatatable },
  created() {
    setTimeout(() => {
      this.$store.dispatch('users/getUsersData').then(
          () => {
            this.loadingData = false
          },
          error => {
            let errorInfo = error.response.data.error.toUpperCase();
            this.$bvToast.toast(`${errorInfo}`, {
              title: 'Notice!',
              autoHideDelay: 5000,
              appendToast: false,
              variant: 'danger',
              toaster: 'b-toaster-top-left'
            })
          }
      )

    }, 5000);

    // Set the initial number of items
    // this.totalRows = this.usersData.length
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>