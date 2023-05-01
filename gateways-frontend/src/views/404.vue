<template>
  <v-container max-width="700px" class="relative">
    <img src="@/assets/page-not-found.svg" alt="not-found" />
    <div class="d-flex flex-column justify-center align-center mt-4 back-home">
      <p>You are little lost here mate you may want to:</p>
      <v-btn
        :to="{ name: 'gateway' }"
        elevation="0"
        text
        class="mt-2"
        color="primary"
        prepend-icon="mdi-home"
      >
        Go back home
      </v-btn>
    </div>
  </v-container>
</template>

<script setup></script>

<style></style>
