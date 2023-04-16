<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-overlay>
    <v-card class="auth-card pa-8 pt-7" max-width="350">
      <v-card-title class="justify-center">
        <v-img
          src="@/assets/pranata.png"
          contain
          max-width="40%"
          max-height="40%"
          class="mx-auto"
          lazy-src="@/assets/pranata.png"
        ></v-img>
        <br />
      </v-card-title>
      <p class="text-center">SMILE APPS</p>
      <v-card-text class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Silahkan Login</h5>
      </v-card-text>

      <v-form
        ref="form_login"
        @keyup.native.enter="loginAction"
        lazy-validation
      >
        <v-card-text>
          <v-text-field label="Usrename"></v-text-field>

          <v-spacer></v-spacer>
          <v-text-field label="Password"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            height="40px"
            color="#1A237E"
            class="white--text"
            @click="loginAction"
            :loading="btnLoading"
            :disabled="btnLoading"
            block
          >
            LOGIN
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-alert
            border="right"
            type="error"
            :value="form_error"
            icon="mdi-close-octagon-outline"
            >Invalid credentials</v-alert
          >
        </v-card-text>
      </v-form>
    </v-card>

    <v-img
      class="auth-footer-mask d-none d-md-block"
      src="@/assets/auth/mask-light.png"
      lazy-src="@/assets/auth/mask-light.png"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    isLoading: false,
    btnLoading: false,
    form_valid: true,
    form_error: false,
    form_login: {
      username: "",
      password: "",
    },
    rule_username: [
      (value) => !!value || "Please fill in the Username field !!!",
    ],
    rule_password: [
      (value) => !!value || "Please fill in the Password field !!!",
    ],
  }),
  created() {
    if (this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    loginAction: async function () {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.auth-wrapper {
  min-block-size: calc(var(--vh, 1vh) * 100);
}
.auth-footer-mask {
  position: absolute;
  inset-block-end: 0;
  min-inline-size: 100%;
}
.auth-card {
  z-index: 1 !important;
}
.auth-footer-start-tree,
.auth-footer-end-tree {
  position: absolute;
  z-index: 1;
}
.auth-footer-start-tree {
  inset-block-end: 0;
  inset-inline-start: 0;
}
.auth-footer-end-tree {
  inset-block-end: 0;
  inset-inline-end: 0;
}
.auth-illustration {
  z-index: 1;
}
.auth-logo {
  position: absolute;
  z-index: 1;
  inset-block-start: 2rem;
  inset-inline-start: 2.3rem;
}
.auth-bg {
  background-color: rgb(var(--v-theme-surface));
}
</style>