<template>
  <v-container fluid>
    <v-card class="mt-4">
      <v-card-text>
        <app-toolbar
          @click:edit="openFormForEdit"
          @click:delete-button="checkRowSelected('delete')"
          @click:delete="removePeripheral"
          :is-row-selected="isRowSelected"
        >
        </app-toolbar>

        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="headers"
          :items="peripherals"
          :loading="loading"
          single-select
          show-select
        >
          <template #loading>
            <v-progress-circular
              color="primary"
              :size="60"
              :width="5"
              indeterminate
            ></v-progress-circular>
          </template>
        </easy-data-table>
      </v-card-text>
    </v-card>

    <btn-add @click="openFormForInsert"></btn-add>

    <v-dialog v-model="formDialog" width="400">
      <peripheral-form
        ref="form"
        v-model="form"
        :loading="loading"
        @submit="submitPeripheral"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import {
  getPeripherals,
  addPeripheral,
  updatePeripheral,
  deletePeripheral,
} from "@/services/peripheral";

import PeripheralForm from "@/components/PeripheralForm.vue";
import AppToolbar from "@/components/AppToolbar.vue";
import BtnAdd from "@/components/BtnAdd.vue";

import { genericNotifications } from "@/utils/genericNotifications";

export default {
  name: "Peripheral",
  middleware: "auth",
  components: {
    AppToolbar,
    PeripheralForm,
    BtnAdd,
  },
  data() {
    return {
      formDialog: false,
      loading: false,
      isFormUpdating: false,
      isRowSelected: false,

      selectedRows: [],
      itemsPerPage: 10,
      peripherals: [],

      form: {
        uid: "",
        vendor: "",
        status: "",
        dateCreated: "",
        gatewayId: "",
      },
    };
  },

  computed: {
    headers() {
      return [
        {
          text: `UID`,
          value: "uid",
          checkboxSelection: true,
          //   value: 'TLMT1IAE'
        },
        {
          text: `Vendor`,
          value: "vendor",
          //   value: 'TLMT2IAE'
        },
        {
          text: `Status`,
          value: "status",
          //   value: 'TLMT3IAE'
        },
        {
          text: `Date created`,
          value: "dateCreated",
          //   value: 'TLMT3IAE'
        },
        {
          text: `Gateway ID`,
          value: "gatewayId",
          //   value: 'TLMT3IAE'
        },
      ];
    },
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData() {
      this.loading = true;
      try {
        this.peripherals = await getPeripherals();
      } catch (error) {
        this.addNotification({
          type: "error",
          message: error.message,
        });
      }
      this.loading = false;
    },

    openFormForInsert() {
      if (this.isFormUpdating) {
        this.$refs.form.reset();
        this.isFormUpdating = false;
      }
      this.formDialog = true;
    },

    openFormForEdit() {
      if (!this.checkRowSelected("update")) return;

      this.fillForm();
      this.isFormUpdating = true;
      this.formDialog = true;
    },

    checkRowSelected(type) {
      if (this.selectedRows.length !== 0) {
        this.isRowSelected = true;
        return true;
      }

      this.addNotification(
        type === "delete"
          ? genericNotifications.selectRowBeforeDelete
          : genericNotifications.selectRowBeforeUpdate
      );

      return false;
    },

    submitPeripheral() {
      this.isFormUpdating ? this.updatePeripheral() : this.insertPeripheral();
    },

    async insertPeripheral() {
      this.loading = true;

      try {
        await addPeripheral(this.form);
        this.loadData();
        this.formDialog = false;
        this.addNotification(genericNotifications.successfulInsert);
      } catch (err) {
        this.addNotification(genericNotifications.errorInsert);
      }

      this.loading = false;
    },

    async updatePeripheral() {
      this.loading = true;
      try {
        await updatePeripheral(this.selectedRows[0]._id, this.form);
        this.loadData();
        this.formDialog = false;
        this.addNotification(genericNotifications.successfulUpdate);
      } catch (err) {
        this.addNotification(genericNotifications.errorUpdate);
      }

      this.loading = false;
    },

    fillForm() {
      this.form = { ...this.selectedRows[0] };
    },

    async removePeripheral() {
      try {
        await deletePeripheral(this.selectedRows[0]._id);
        this.loadData();
        this.addNotification(genericNotifications.successfulDelete);
      } catch (error) {
        this.addNotification(genericNotifications.errorDelete);
      }
    },
  },
};
</script>
