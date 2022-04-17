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
        <b-card class="overflow-hidden" style="max-width: 540px;">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <div class="d-flex">
                  <div class="flex-grow-0 mr-1 font-weight-bold">Id:</div>
                  <div class="flex-grow-1">1</div>
                </div>
                <div class="d-flex">
                  <div class="flex-grow-0 mr-1 font-weight-bold">First name:</div>
                  <div class="flex-grow-1">Jack</div>
                </div>
                <div class="d-flex">
                  <div class="flex-grow-0 mr-1 font-weight-bold">Last name:</div>
                  <div class="flex-grow-1">Daniels</div>
                </div>
                <div class="d-flex">
                  <div class="flex-grow-0 mr-1 font-weight-bold">Email:</div>
                  <div class="flex-grow-1">ggg@gmail.com</div>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ProfileView",
}
</script>

<style scoped>

</style>