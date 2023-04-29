<template>
  <v-navigation-drawer v-model="internalDrawer" app :order="0">
    <div class="d-flex px-16 py-2">
      <img src="/logo2.svg" />
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
        <v-list-item-title>{{ $t(link.text) }} </v-list-item-title>
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
