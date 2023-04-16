<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" color="primary" />
    </v-overlay>
    <v-card class="auth-card pa-8 pt-7" max-width="350">
      <v-card-title class="justify-center">
        <v-img
          src="@/assets/smile_apps.png"
          contain
          max-width="40%"
          max-height="40%"
          class="mx-auto"
          lazy-src="@/assets/smile_apps.png"
        ></v-img>
        <br />
      </v-card-title>
      <p class="text-center">SMILE APPS</p>

      <v-form
        ref="form_login"
        @keyup.native.enter="loginAction"
        lazy-validation
      >
        <v-card-text>
          <v-text-field
            label="Username"
            placeholder="Masukan Username"
            outlined
            v-model="form_login.username"
            :rules="rule_username"
          ></v-text-field>

          <v-spacer></v-spacer>
          <v-text-field
            type="password"
            label="Password"
            placeholder="Masukan Password"
            outlined
            v-model="form_login.password"
            :rules="rule_password"
          ></v-text-field>
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
    rule_username: [(value) => !!value || "Kolom username wjib diisi !!!"],
    rule_password: [(value) => !!value || "Kolom password wajib diisi!!!"],
  }),
  created() {
    if (this.$store.getters["auth/Authenticated"]) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    loginAction: async function () {
      if (this.$refs.form_login.validate()) {
        this.isLoading = true;
        this.btnLoading = true;
        await this.$axios
          .post("/login", {
            username: this.form_login.username,
            password: this.form_login.password,
          })
          .then(({ data }) => {
            this.$axios
              .get("/me", {
                headers: {
                  Authorization: "Bearer " + data.token,
                },
              })
              .then((response) => {
                var data_user = {
                  token: data,
                  user: response.data,
                };
                this.$store.dispatch("auth/afterLoginSuccess", data_user);
                this.btnLoading = false;
                this.form_error = false;
                this.isLoading = false;
                this.$router.push({ name: "home" });
              });
          })
          .catch(() => {
            this.form_error = true;
            this.btnLoading = false;
          });
      }
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