<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>Delete?</v-card-title>
      <v-card-text> The selected element will be deleted </v-card-text>

      <v-card-subtitle v-if="confirmationText">
        <div>To delete introduce the following text:</div>
        <div>
          <span
            class="font-italic text-red-darken-4 bg-grey-lighten-2 px-2 rounded"
          >
            {{ confirmationText }}
          </span>
        </div>
      </v-card-subtitle>

      <v-card-text v-if="confirmationText">
        <v-text-field
          v-model="state.enteredConfirmationText"
          :rules="state.confirmationRules"
        />
      </v-card-text>

      <v-card-text>
        <v-spacer />

        <form-actions
          enable-cancel
          @click:submit="acceptClicked"
          @click:cancel="dialogComputed = false"
          submit-button-text="Delete"
          submit-button-color="error"
        ></form-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, reactive } from "vue";

import FormActions from "./FormActions.vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, String],
    required: true,
  },
  confirmationText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "click:accept"]);

const state = reactive({
  enteredConfirmationText: "",
  confirmationRules: [
    (v) => v === props.confirmationText || "Not the correct confirmation text",
  ],
});

const dialogComputed = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const acceptClicked = () => {
  if (props.confirmationText !== state.enteredConfirmationText) {
    return;
  }

  emit("click:accept");
};
</script>
