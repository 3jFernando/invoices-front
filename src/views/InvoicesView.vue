<template>
  <div class="invoices">
    <br />

    <TotalsHeader />

    <br />
    <div class="flex space-between align-center">
      <div class="input-group">
        <select v-model="orderInvoices" @change="onHandleChangeOrder">
          <option value="asc">Las más recientes primero</option>
          <option value="desc">Las más antiguas primero</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="actionsToInvoice()">
        + Nueva factura
      </button>
    </div>
    <br />

    <ManageInvoice 
      :messages="messages"
      :orderBy="orderInvoices"
     />
    <HistoryTable :invoices="invoicesStore.invoices" />

  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/store/invoices'
import { useModalStore } from '@/store/modal'
// import { httpGet } from '@/services/httpService'
import HttpService from '@/services/httpService'
import TotalsHeader from '@/components/invoices/TotalsHeader.vue'
import HistoryTable from '@/components/invoices/HistoryTable.vue'
import ManageInvoice from '@/components/invoices/ManageInvoice.vue'
import { useUserStore } from '@/store/user';

export interface InvoiceHome {
  orderInvoices: string,
  messages: Array<string>
}

export default defineComponent({
  name: 'InvoicesView',
  components: {
    ManageInvoice,
    HistoryTable,
    TotalsHeader
  },
  data(): InvoiceHome {
    return {
      orderInvoices: 'asc',
      messages: [],
    }
  },
  created() {
    this.getInvoices();
  },
  setup() {
    const userStore = useUserStore();
    const invoicesStore = useInvoicesStore();
    const modalStore = useModalStore();
    const httpService = HttpService;

    return {
      userStore,
      invoicesStore,
      modalStore,
      httpService
    }
  },
  methods: {
    getInvoices() {
      this.httpService.httpGet(this.userStore, "invoices", this.callbackGetInvoices);
    },
    callbackGetInvoices(status: string, response: any) {
      if (status === 'success') {
        this.invoicesStore.invoices = response;
        this.onHandleChangeOrder();
      }
    },
    actionsToInvoice() {
      this.messages = [];
      this.modalStore.updateModal({
        name: 'moda-manage-invoices',
        isOpen: true,
        title: '+ Nueva factura',
        btnOkTitle: 'Crear factura'
      })
    },
    onHandleChangeOrder() {
      this.invoicesStore.invoices.sort((a: any, b: any) => {
        return (this.orderInvoices === 'desc') ? a.id - b.id : b.id - a.id
      })
    },
  }
})
</script>

<style scoped>
.invoices {
  font-size: 12px;
}
</style>