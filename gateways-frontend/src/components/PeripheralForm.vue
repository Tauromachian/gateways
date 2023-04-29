<template>
  <app-form
    ref="form"
    @submit="() => $emit('submit')"
    :title="$t('read.form_name')"
  >
    <v-text-field v-model="form.uid" label="UID" :rules="[rules.required()]" />
    <v-text-field
      v-model="form.vendor"
      label="Vendor"
      :rules="[rules.required()]"
    />
    <v-checkbox label="Is status online?" v-model="form.status"></v-checkbox>
    <v-autocomplete label="Autocomplete" :items="[]"></v-autocomplete>
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
    async loadData() {},

    async validate() {
      return await this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
