<template>
  <main class="gs-login-wrapper">
    <b-container fluid="sm" class="d-flex align-items-center justify-content-sm-center min-vh-100">
      <b-row class="justify-content-sm-center p-5 p-sm-0">
        <b-col>
          <b-form @submit="handleLogin" v-if="show" class="gs-login-form">
            <b-form-group
                class="mb-3 gs-login-email-input"
            >
              <b-form-input
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  name="user_email_login"
                  v-validate="'required|email'" data-vv-as="email">
              </b-form-input>
              <b-alert
                  style="font-size: 11px"
                  class="mt-2 font-weight-bold mb-0 py-1 px-2"
                  fade
                  :show="errors.has('user_email_login')"
                  variant="warning">
                <b-icon icon="info-circle" class="" variant="dark"></b-icon>
                {{ errors.first('user_email_login') }}
              </b-alert>
            </b-form-group>
            <b-form-group class="gs-login-password-input mb-3">
              <b-form-input
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  name="user_password_login"
                  v-validate="'required'"
                  data-vv-as="password"
              ></b-form-input>
              <b-alert
                  style="font-size: 11px"
                  class="mt-2 font-weight-bold mb-0 py-1 px-2"
                  fade
                  :show="errors.has('user_password_login')"
                  variant="warning">
                <b-icon icon="info-circle" class="" variant="dark"></b-icon>
                {{ errors.first('user_password_login') }}
              </b-alert>
            </b-form-group>
            <b-form-group v-slot="{ ariaDescribedby }" class="mb-3">
              <b-form-checkbox
                  v-model="form.checked"
                  :aria-describedby="ariaDescribedby"
              >
                Remember me
              </b-form-checkbox>
            </b-form-group>
            <div class="text-right gs-login-btn-wrapper">
              <b-button type="submit" variant="info">Login</b-button>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true,
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/users');
    }
  },
  methods: {
    handleLogin(event) {
      event.preventDefault()
      this.$validator.validate().then(isValid => {
        if (isValid) {
          // do stuff if valid.
          this.$store.dispatch('auth/login', this.form).then(
              () => {
                this.$router.push('/users');
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
          );
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .gs-login-wrapper {
    background-image: url(@/assets/img/sunset-bg.jpeg);
    background-size: cover;
    .gs-login-form::v-deep {
      min-width: 300px;

      .custom-control-label {
        color: #ffffff;
        font-size: 16px;
      }
      .custom-control-input:checked ~ .custom-control-label::before {
        color: #fff;
        background-color: $mainOrange;
        border-color: #ffffff;
      }
    }
  }
</style>