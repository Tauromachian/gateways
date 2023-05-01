<template>
  <v-app-bar id="core-toolbar" app flat :order="1">
    <v-app-bar-nav-icon @click="toggleDrawer" />

    <v-spacer />

    <v-menu left bottom offset-x offset-y>
      <v-list dense>
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <v-list-item-title>{{ notification }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          id="view-all-notifications"
          align="center"
          :to="{ name: 'notifications' }"
        >
          <v-list-item-title> View all </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="mr-2" />
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "pinia";

export default {
  name: "Toolbar",

  methods: {
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
  },
};
</script>
