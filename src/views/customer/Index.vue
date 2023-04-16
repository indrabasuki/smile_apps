 <template>
  <main-layout>
    <base-header>
      <template #icon> mdi-file</template>
      <template #name> Inventory In </template>
      <template #breadcrumbs>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0">
          <template #divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </template>
      <template #button>
        <v-btn color="primary" class="float-end mb-2" small to="//create"
          >Create New
          <v-icon right>mdi-plus</v-icon>
        </v-btn></template
      >
    </base-header>
    <v-row dense class="mx-1 mt-3">
      <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly" />
      <v-data-table
        :headers="headers"
        :items="datatable"
        :search="search"
        item-key="id"
        sort-by="name"
        class="elevation-1"
        :loading="datatableLoading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:no-data> No data </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="warning" class="mr-2" @click.stop="editItem(item)">
            mdi-pencil-box-outline
          </v-icon>
        </template>

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pencarian"
              outlined
              dense
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-row>
  </main-layout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import { datatableMixin } from "@/mixins/datatable.js";
export default {
  name: "CustomerIndex",

  mixins: [datatableMixin],

  data: () => ({
    headers: [
      { text: "Nama", value: "name" },
      { text: "Email", value: "email" },
      { text: "Nomor HP", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Action", value: "actions", sortable: false, width: 100 },
    ],
  }),

  methods: {
    initialize: async function () {
      this.datatableLoading = true;
      await this.$axios
        .get("/customer", {
          headers: {
            Authorization: this.$store.getters["auth/Token"],
          },
        })
        .then(({ data }) => {
          this.datatable = data.customer;
          this.datatableLoading = false;
        })
        .catch(() => {
          this.datatableLoading = false;
        });
    },
  },
  computed: {
    form_title() {
      return this.editedIndex === -1 ? "Create PPH" : "Edit PPH";
    },
  },
  components: {
    MainLayout,
  },
};
</script>