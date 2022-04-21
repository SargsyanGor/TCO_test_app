<template>
    <!-- Main table element -->
    <section>
      <div class="d-flex justify-content-end">
        <b-button v-b-modal.createUserModal size="sm" variant="light" class="mb-4">Create user</b-button>
      </div>

      <b-table
          :items="usersData.data"
          :fields="fields"
          :current-page="usersData.page"
          stacked="md"
          outlined
          striped
      >
        <template #cell(index)="row">
          {{ row.index }}
        </template>

        <template #cell(avatar)="row">
          <router-link :to="{ name: 'profile', params: { id: row.item.id }}">
            <b-img width="60" height="60px" rounded="circle" :src="row.value" alt="Responsive image"></b-img>
          </router-link>
        </template>

        <template #cell(fullName)="row">
          <router-link :to="{ name: 'profile', params: { id: row.item.id }}" class="text-info">{{ row.item.first_name + " " + row.item.last_name }}</router-link>
        </template>

        <template #cell(actions)="row">
          <b-button size="sm" @click="showEditModal(row.item, $event.target)" class="mr-1 btn-info">
            Edit
          </b-button>
          <b-button size="sm" @click="showDeleteModal(row.item.id)" class="btn-danger">
            Delete
          </b-button>
        </template>
      </b-table>

      <!-- User Interface controls -->
      <b-row class="justify-content-end">
        <b-col sm="7" md="6" class="my-1">
          <b-pagination
              v-model="currentPage"
              :total-rows="usersData.total"
              :per-page="usersData.per_page"
              align="fill"
              size="sm"
              class="my-0 mt-2"
              variant="info"
              @change="handlePageChange"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Edit modal -->
      <b-modal centered id="editUserModal" title="Edit user" ref="editUserModalRef">
        <div class="py-2">
          <b-form-group
              label="User's name"
              label-for="editModalUserName"
          >
            <b-form-input id="editModalUserName" v-model="editModal.userName"></b-form-input>
          </b-form-group>

          <b-form-group
              label="User's job"
              label-for="editModalUserJob"
          >
            <b-form-input id="editModalUserJob" v-model="editModal.userJob"></b-form-input>
          </b-form-group>
        </div>
        <template #modal-footer>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="info" @click="updateUserInfo()" :disabled="updateUserAllowed">
            Edit
          </b-button>
        </template>
      </b-modal>
      <!-- Delete modal -->
      <b-modal centered id="deleteUserModal" title="Delete user" ref="deleteUserModalRef">
        <div class="py-3">
          <p class="text-center">Are you sure? <br> <strong>This action can't be undone</strong></p>
        </div>
        <template #modal-footer>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="info" @click="$bvModal.hide('deleteUserModal')">
            Cancel
          </b-button>
          <b-button size="sm" variant="danger" @click="deleteUser()">
            Yes, delete
          </b-button>
        </template>
      </b-modal>
      <!-- Create user modal -->
      <b-modal centered id="createUserModal" title="Create user" ref="createUserModalRef">
        <div class="py-3">
          <b-form-group
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedbackForUserName"
              :state="nameState"
          >
            <b-form-input v-model="newUserData.newUserName" :state="nameState" placeholder="Enter user's name" trim></b-form-input>
          </b-form-group>

          <b-form-group
              valid-feedback="Thank you!"
              :invalid-feedback="invalidFeedbackForUserJob"
              :state="jobState"
          >
            <b-form-input v-model="newUserData.newUserJob" :state="jobState" placeholder="Enter user's job" trim></b-form-input>
          </b-form-group>
        </div>

        <template #modal-footer>
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="info" @click="createNewUser()" :disabled="saveNewUserAllowed">
            Save
          </b-button>
        </template>
      </b-modal>
    </section>
</template>

<script>
export default {
  name: "UsersDatatable",
  data() {
    return {
      fields: [
        { key: 'index', label: 'Index', sortable: false, class: 'align-middle text-center font-weight-bold' },
        { key: 'avatar', label: 'Avatar', sortable: false },
        {
          key: 'fullName',
          label: 'Full name',
          sortable: false,
          class: 'align-middle'
        },
        { key: 'email', label: 'Email', class: 'align-middle' },
        { key: 'actions', label: 'Actions', class: 'align-middle' }
      ],
      currentPage: 1,
      editModal: {
        userId: "",
        userName: "",
        userJob: ""
      },
      newUserData: {
        newUserName: '',
        newUserJob: ''
      },
      userToBeDeleted: "",
    }
  },
  computed: {
    usersData() {
      return this.$store.state.users.usersData;
    },
    nameState() {
      return this.newUserData.newUserName.length > 2
    },
    jobState() {
      return this.newUserData.newUserJob.length > 2
    },
    invalidFeedbackForUserName() {
      if (this.newUserData.newUserName.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    invalidFeedbackForUserJob() {
      if (this.newUserData.newUserJob.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    saveNewUserAllowed() {
      return !this.newUserData.newUserName.length || !this.newUserData.newUserJob.length
    },
    updateUserAllowed() {
      return !this.editModal.userName.length && !this.editModal.userJob.length
    },
  },
  methods: {
    showEditModal(user, button) {
      this.editModal.userId = user.id
      this.editModal.userName = user.first_name;
      this.$root.$emit('bv::show::modal', "editUserModal", button)
    },
    showDeleteModal(userId) {
      this.userToBeDeleted = userId;
      this.$root.$emit('bv::show::modal', "deleteUserModal")
    },
    handlePageChange(value) {
      this.$store.dispatch('users/getUsersData', value).then(
          () => {},
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
    createNewUser() {
      this.$store.dispatch('users/createUser', this.newUserData).then(
          () => {
            this.$bvToast.toast(`Created successfully!`, {
              title: 'Done!',
              autoHideDelay: 3000,
              appendToast: false,
              variant: 'success',
              toaster: 'b-toaster-top-left'
            })
            this.$refs["createUserModalRef"].hide();

            this.newUserData.newUserName = "";
            this.newUserData.newUserJob = "";
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
    updateUserInfo() {
      this.$store.dispatch('users/updateUserData', this.editModal.userId).then(
          () => {
            this.editModal.userId = "";
            this.editModal.userName = "";
            this.editModal.userJob = "";

            this.$bvToast.toast(`Updated successfully!`, {
              title: 'Done!',
              autoHideDelay: 3000,
              appendToast: false,
              variant: 'success',
              toaster: 'b-toaster-top-left'
            })
            this.$refs["editUserModalRef"].hide();
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
    deleteUser() {
      this.$store.dispatch('users/deleteUser', this.userToBeDeleted).then(
          () => {
            this.userToBeDeleted = ""

            this.$bvToast.toast(`Deleted successfully!`, {
              title: 'Done!',
              autoHideDelay: 3000,
              appendToast: false,
              variant: 'success',
              toaster: 'b-toaster-top-left'
            })
            this.$refs["deleteUserModalRef"].hide();
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
    }
  }
}
</script>