<template>
  <div>
    <v-app-bar app elevation="0" color="#fff">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu
        :close-on-content-click="true"
        origin="center center"
        transition="scale-transition"
        :offset-y="true"
        bottom
        left
        ml-1
      >
        <template v-slot:activator="{ on }">
          <v-avatar size="30" class="on_cursor mx-3">
            <img
              src="@/assets/user_default.png"
              lazy-src="@/assets/user_default.png"
              v-on="on"
            />
          </v-avatar>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="@/assets/user_default.png"
                lazy-src="@/assets/user_default.png"
              />
            </v-list-item-avatar>
          </v-list-item>

          <v-divider />
          <v-list-item @click.prevent="logout">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-power</v-icon>
            </v-list-item-icon>
            <v-list-item-title>LOGOUT</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer width="240" dark color="darkblue" app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center">
            SMILE APPS
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item-group color="#898F99" v-model="group">
        <v-list-item-title class="ml-4 my-2" style="font-size: 14px"
          >MENU</v-list-item-title
        >
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-tune-vertical</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px"
              >Dashboard</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>
    <v-main class="mx-1 mr-4 mb-4">
      <slot />
    </v-main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MainLayout",
  data: () => ({
    drawer: true,
    group: null,
    loginTime: 0,
  }),

  methods: {
    logout() {
      this.loginTime = 0;
      this.$store.dispatch("auth/logout");
      localStorage.removeItem("smile-application");
      this.$router.push("/");
    },

    toggleThemeDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },

  computed: {
    ...mapGetters("auth", {
      AUTHENTICATED: "Authenticated",
      USER: "User",
    }),
    APP_NAME() {
      return process.env.VUE_APP_NAME;
    },
  },
  watch: {
    loginTime: {
      handler(value) {
        if (value >= 0) {
          setTimeout(() => {
            this.loginTime =
              this.AUTHENTICATED == true ? this.loginTime + 1 : -1;
          }, 1000);
        } else {
          this.$store.dispatch("auth/logout");
          this.$router.replace("/login");
        }
      },
      immediate: true,
    },
    group() {
      this.drawer = true;
    },
  },
};
</script>

<style scoped>
.profile {
  position: fixed !important;
  bottom: 0 !important;
  width: 100%;
}

.role {
  font-size: 12px;
}
</style>