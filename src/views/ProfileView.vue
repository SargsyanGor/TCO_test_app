<template>
  <b-container class="py-5 mt-5">
    <b-row>
      <b-col>
        <div class="d-flex align-items-center mb-4">
          <div style="font-size: 20px">
            <b-icon icon="person-circle" class="border rounded bg-info p-1" variant="light"></b-icon>
          </div>
          <h5 class="mb-0 ml-2">User profile</h5>
        </div>
        <Transition name="fade">
          <b-card class="overflow-hidden" style="max-width: 540px;" v-if="dataLoaded">
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img :src="userData.data.avatar" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col md="6">
                <b-card-body>
                  <div class="d-flex">
                    <div class="flex-grow-0 mr-1 font-weight-bold">Id:</div>
                    <div class="flex-grow-1">{{ userData.data.id }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="flex-grow-0 mr-1 font-weight-bold">First name:</div>
                    <div class="flex-grow-1">{{ userData.data.first_name }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="flex-grow-0 mr-1 font-weight-bold">Last name:</div>
                    <div class="flex-grow-1">{{ userData.data.last_name }}</div>
                  </div>
                  <div class="d-flex">
                    <div class="flex-grow-0 mr-1 font-weight-bold">Email:</div>
                    <div class="flex-grow-1">{{ userData.data.email }}</div>
                  </div>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </Transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ProfileView",
  data() {
    return {
      dataLoaded: false
    }
  },
  created() {
      this.$store.dispatch('profile/getSingleUserData', this.$route.params.id).then(
          () => {
            this.dataLoaded = true
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
  },
  computed: {
    userData() {
      return this.$store.state.profile.userData
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>