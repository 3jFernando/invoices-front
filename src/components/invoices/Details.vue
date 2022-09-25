<template>
  <div class="invoice-details">

    <div class="card">
      <h2><strong>Información general</strong></h2>
      <div class="flex align-center wrap">
        <div>
          <div>
            <strong>Número de factura</strong><br />
            <span>{{invoice.number}}</span>
          </div><br />
          <div>
            <strong>Fecha y hora</strong><br />
            <span>{{invoice.created_at}}</span>
          </div>
        </div>
        <div style="margin-left: 30vw">
          <div>
            <strong>Emisor: </strong>
            <span>{{invoice.transmitter_name}}</span><br />
            <span><strong>Nit</strong> {{invoice.transmitter_nit}}</span>
          </div><br />
          <div>
            <strong>Comprador: </strong>
            <span>{{invoice.receiver_name}}</span><br />
            <span><strong>Nit</strong> {{invoice.receiver_nit}}</span>
          </div>
        </div>
      </div>
    </div>

    <br />
    <h2><strong>Items de la factura</strong></h2>
    <table class="table">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Valor unitario</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in invoice.items" :key="item.description">
          <td>{{item.description}}</td>
          <td>
            <Formatters :number="item.total_unit" />
          </td>
          <td>{{item.cant}}</td>
          <td>
            <Formatters :number="item.total" />
          </td>
        </tr>
      </tbody>
    </table>

    <br />
    <br />

    <div class="card">
      <div class="m-b flex align-center space-between">
        <strong>Subtotal: </strong>
        <Formatters :number="invoice.subtotal" />
      </div>

      <div class="m-b flex align-center space-between">
        <strong>IVA %</strong>
        <div>
          <strong>{{invoice.tax}}%</strong> -
          <Formatters :number="((invoice.subtotal * invoice.tax) / 100)" />
        </div>
      </div>

      <div class="flex align-center space-between">
        <strong>Total: </strong>
        <Formatters :number="invoice.total" />
      </div>

    </div>

  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/store/invoices'
import HttpService from '@/services/httpService'
import { useUserStore } from '@/store/user';
import Formatters from '../Formatters.vue';
import { Invoice } from '@/interfaces/invoice';
import { useModalStore } from '@/store/modal';

interface State {
  error: {
    status: boolean,
    message: string
  },
  invoice: Invoice
}

export default defineComponent({
  name: "InvoiceDetails",
  components: { Formatters },
  data(): State {
    return {
      error: {
        status: false,
        message: ""
      },
      invoice: {
        id: 0,
        number: "",
        transmitter_name: "",
        transmitter_nit: "",
        receiver_name: "",
        receiver_nit: "",
        subtotal: 0,
        tax: 0,
        total: 0,
        created_at: "",
        updated_at: "",
        items: []
      }
    };
  },
  mounted() {
    this.getInvoice();
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
    };
  },
  methods: {
    getInvoice() {
      this.httpService.httpGet(this.userStore, `invoices/${this.$route.params.id}`, this.callbackGetInvoice);
    },
    callbackGetInvoice(status: string, response: any) {
      if (status === 'success') {
        this.invoice = response;
        return false;
      }

      if (status === 'item_not_found') {
        this.error = {
          status: true,
          message: response
        };
        return false;
      }
    },
  },
})
</script>