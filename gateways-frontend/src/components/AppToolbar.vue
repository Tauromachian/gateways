<template>
  <v-row>
    <v-col cols="auto">
      <slot name="actions-prepend" />

      <v-btn
        class="ml-1"
        v-if="!disable?.edit"
        color="primary"
        @click="onUpdateButtonClicked"
        icon="mdi-pencil"
      >
      </v-btn>

      <v-btn
        class="ml-1"
        v-if="!disable?.delete"
        color="primary"
        @click="onDeleteButtonClicked"
        icon="mdi-delete-outline"
      >
      </v-btn>

      <dialog-delete-confirmation
        class="mx-1"
        v-if="!disable?.delete"
        v-model="dialogDelete"
        @click:accept="onDelete"
      />

      <slot name="actions-append" />
    </v-col>
  </v-row>
</template>

<script>
import DialogDeleteConfirmation from "./DialogDeleteConfirmation.vue";

export default {
  components: {
    DialogDeleteConfirmation,
  },
  props: {
    isRowSelected: { type: Boolean, default: false },
    deleteDialogButton: { type: Boolean, default: false },
    disable: {
      type: Object,
      default: () => ({
        edit: false,
        delete: false,
        hideColumns: false,
        details: false,
      }),
    },
  },
  data() {
    return {
      columnSelectListDialog: false,
      dialogDelete: false,
      formDialog: false,
      pageAmounts: [10, 50, 100],
    };
  },

  methods: {
    onUpdateButtonClicked() {
      this.$emit("click:edit");
    },
    onDeleteButtonClicked() {
      this.isRowSelected && (this.dialogDelete = true);
      this.$emit("click:delete-button");
    },
    onDelete() {
      this.$emit("click:delete");
    },
  },
};
</script>
