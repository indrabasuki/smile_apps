<template>
  <main-layout>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64" color="amber" />
    </v-overlay>
    <base-header>
      <template v-slot:icon> mdi-view-dashboard </template>
      <template v-slot:name> Dashboard </template>
    </base-header>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
export default {
  name: "Home",

  data: () => ({
    isLoading: false,
  }),

  components: {
    MainLayout,
  },
};
</script>
