<template>
  <v-container fluid>
    <v-card class="mt-4">
      <v-card-text>
        <app-toolbar
          @click:edit="openFormForEdit"
          @click:delete-button="checkRowSelected('delete')"
          @click:delete="removeGateway"
          :is-row-selected="isRowSelected"
        >
        </app-toolbar>

        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="headers"
          :items="gateways"
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
      <gateway-form
        ref="form"
        v-model="form"
        :loading="loading"
        @submit="submitGateway"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import {
  getGateways,
  addGateway,
  updateGateway,
  deleteGateway,
} from "@/services/gateway";

import GatewayForm from "@/components/GatewayForm.vue";
import AppToolbar from "@/components/AppToolbar.vue";
import BtnAdd from "@/components/BtnAdd.vue";

import { genericNotifications } from "@/utils/genericNotifications";

export default {
  name: "Gateway",
  middleware: "auth",
  components: {
    AppToolbar,
    GatewayForm,
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
      gateways: [],

      form: {
        name: "",
        serialNumber: "",
        ipv4: "",
      },
    };
  },

  computed: {
    headers() {
      return [
        {
          text: `name`,
          value: "name",
          checkboxSelection: true,
        },
        {
          text: `serialNumber`,
          value: "serialNumber",
        },
        {
          text: `IP`,
          value: "ipv4",
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
        this.gateways = await getGateways();
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

    submitGateway() {
      this.isFormUpdating ? this.updateGateway() : this.insertGateway();
    },

    async insertGateway() {
      this.loading = true;

      try {
        await addGateway(this.form);
        this.loadData();
        this.formDialog = false;
        this.addNotification(genericNotifications.successfulInsert);
      } catch (err) {
        this.addNotification(genericNotifications.errorInsert);
      }

      this.loading = false;
    },

    async updateGateway() {
      this.loading = true;
      try {
        await updateGateway(this.selectedRows[0]._id, this.form);
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

    async removeGateway() {
      try {
        await deleteGateway(this.selectedRows[0]._id);
        this.loadData();
        this.addNotification(genericNotifications.successfulDelete);
      } catch (error) {
        this.addNotification(genericNotifications.errorDelete);
      }
    },
  },
};
</script>
