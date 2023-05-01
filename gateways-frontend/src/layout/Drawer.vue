<template>
  <v-navigation-drawer v-model="internalDrawer" app :order="0">
    <div class="d-flex justify-center align-center py-2">
      <img
        height="80"
        width="80"
        src="@/assets/gateway-logo-removebg-preview.png"
      />
      <h1 class="mr-9">Gateways</h1>
    </div>

    <v-divider />

    <v-list nav color="primary">
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        class="mt-3"
        :to="link.to"
      >
        <template #prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ link.text }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app";

export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState(useAppStore, ["drawer"]),
    internalDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.setDrawer(value);
      },
    },
  },

  methods: {
    ...mapActions(useAppStore, ["setDrawer"]),
  },
};
</script>
