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
        @click="isRowSelected && (dialogDelete = true)"
        icon="mdi-delete-outline"
      >
      </v-btn>

      <dialog-delete-confirmation
        class="mx-1"
        v-if="!disable?.delete"
        v-model="dialogDelete"
        :isAllowedToOpen="isRowSelected"
        @click:delete-button="onDeleteButtonClicked"
        @delete="deleteRow"
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

  computed: {
    visibleColumnsComputed: {
      get() {
        return this.visibleColumns;
      },
      set(val) {
        this.$emit("update:visibleColumns", val);
      },
    },
  },

  methods: {
    onDeleteButtonClicked() {
      this.$emit("click:delete-button");
    },
    onUpdateButtonClicked() {
      this.$emit("click:update-button");
    },
    deleteRow() {
      this.$emit("click:delete");
    },
  },
};
</script>
