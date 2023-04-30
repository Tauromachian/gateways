<template>
  <app-form ref="form" title="Gateway Form">
    <v-text-field
      v-model="form.name"
      label="Name"
      :rules="[rules.required()]"
    />
    <v-text-field
      v-model="form.serialNumber"
      label="Serial number"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.ipv4"
      label="IP"
      :rules="[rules.required(), rules.ip()]"
    />
  </app-form>
</template>

<script>
import { required, number, ip } from "@/utils/rules";

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
      services: [],
      rules: { required, number, ip },
    };
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
    async validate() {
      return await this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
