<template>
  <app-form ref="form" title="Peripheral Form">
    <v-text-field v-model="form.uid" label="UID" :rules="[rules.required()]" />
    <v-text-field
      v-model="form.vendor"
      label="Vendor"
      :rules="[rules.required()]"
    />
    <v-checkbox label="Is status online?" v-model="form.status"></v-checkbox>
    <v-autocomplete
      label="Autocomplete"
      :items="gateways"
      item-value="_id"
      item-title="name"
      v-model="form.gatewayId"
      :loading="loadingGateways"
    ></v-autocomplete>
  </app-form>
</template>

<script>
import { mapActions } from "pinia";

import { required, number, ip } from "@/utils/rules";

import { useNotificationsStore } from "@/stores/notifications";

import { getGateways } from "@/services/gateway";

import AppForm from "./AppForm.vue";

export default {
  name: "ReadForm",
  components: {
    AppForm,
  },
  props: {
    update: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      gateways: [],
      loadingGateways: false,
      rules: { required, number, ip },
    };
  },

  created() {
    this.loadData();
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },

  methods: {
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData() {
      this.loadingGateways = true;
      try {
        this.gateways = await getGateways();
      } catch (error) {
        this.addNotification({
          type: "error",
          message: error.message,
        });
      }
      this.loadingGateways = false;
    },

    async validate() {
      return await this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
