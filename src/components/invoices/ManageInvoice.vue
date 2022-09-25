<template>
  <ModalManageInvoice :btnOkAction="saveInvoice">

    <h1>Información general</h1>

    <div class="input-group">
      <br />
      <strong>Fecha y hora</strong> Se toman del sistema al guardar la Factura
    </div>

    <br />
    <div class="forms">
      <div class="input-group">
        <label for="">Número de factura</label><br />
        <input v-model="invoice.number" placeholder="Número de factura" />
      </div>
      <div class="input-group">
        <label for="">Nombre del emisor</label><br />
        <input v-model="invoice.transmitter_name" placeholder="Nombre del emisor" />
      </div>
      <div class="input-group">
        <label for="">Nit del emisor</label><br />
        <input v-model="invoice.transmitter_nit" placeholder="Nit del emisor" />
      </div>
      <div class="input-group">
        <label for="">Nombre del comprador</label><br />
        <input v-model="invoice.receiver_name" placeholder="Nombre del comprador" />
      </div>
      <div class="input-group">
        <label for="">Nit del comprador</label><br />
        <input v-model="invoice.receiver_nit" placeholder="Nit del comprador" />
      </div>
    </div>

    <div>
      <h1>Items de la factura</h1>

      <div class="forms card">
        <div class="input-group">
          <label for="">Descripción (*)</label><br />
          <input type="text" v-model="itemInvoice.description" placeholder="Descripción" />
        </div>
        <div class="input-group">
          <label for="">Valor Unitario (*)</label><br />
          <input type="number" step="0.00" min="1" v-model="itemInvoice.total_unit" placeholder="Valor Unitario" />
        </div>
        <div class="input-group">
          <label for="">Cantidad (*)</label><br />
          <input type="number" step="0.00" min="1" v-model="itemInvoice.cant" placeholder="Cantidad" />
        </div>
        <div class="input-group">
          <label for="">Total</label><br />
          <input type="number" step="0.00" min="1" :value="getTotalItemInvoice" disabled placeholder="Total" />
        </div>
      </div>
      <br />
      <div>
        <button class="btn btn-secundary" @click="addItemToInvoice()">
          + Agregar Item
        </button>
      </div>

      <br />
      <table class="table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Val.Unit</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoice.items" :key="item.description">
            <td>{{item.description}}</td>
            <td>{{item.total_unit}}</td>
            <td>{{item.cant}}</td>
            <td>{{item.total}}</td>
            <td>
              <button class="btn btn-secundary" @click="removeItemToInvoice(item)">
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      
      <h1>Totales de la factura</h1>

      <div class="card">
        <div class="flex align-center space-between">
          <strong>Subtotal: </strong>
          <Formatters :number="getSubtotalInvoice" />
        </div>
        <div class="flex align-center space-between">
          <strong>IVA %: </strong>
          <div class="input-group flex align-center">
            <input type="number" step="0.00" style="width: 40px; margin-right: 10px; text-align: center" min="1"
              v-model="invoice.tax" placeholder="IVA" />
            <Formatters :number="getTax" />
          </div>
        </div>
        <div class="flex align-center space-between">
          <strong>Total: </strong>
          <Formatters :number="getTotalInvoice" />
        </div>
      </div>
    </div>
    <br />

    <br />
    <ul v-show="messagesErrors.length > 0">
      <li v-for="message in messagesErrors" :key="message">
        {{message}}
      </li>
    </ul>

    <br />
    <br />

  </ModalManageInvoice>
</template>

<script lang="ts">

import { ItemInvoice } from '@/interfaces/invoiceItem';
import HttpService from '@/services/httpService'
import { defineComponent } from 'vue';
import Modal from '@/components/Modal.vue';
import Formatters from '../Formatters.vue';
import { useInvoicesStore } from '@/store/invoices';
import { useModalStore } from '@/store/modal';
import { createInvoice } from '@/interfaces/createInvoice'
import { useUserStore } from '@/store/user';

export default defineComponent({
  name: "ManageInvoice",
  props: ['messages', 'orderBy'],
  components: {
    ModalManageInvoice: Modal,
    Formatters
  },
  data(): createInvoice {
    return {
      messagesErrors: this.messages,
      itemInvoice: this.initialItemInvoiceData(),
      invoice: this.initialInvoiceData()
    };
  },
  setup() {
    const userStore = useUserStore();
    const invoicesStore = useInvoicesStore();
    const modalStore = useModalStore();
    const httpService = HttpService;

    return {
      invoicesStore,
      modalStore,
      userStore,
      httpService
    }
  },
  computed: {
    getSubtotalInvoice: (state: any) => {
      let subtotal = 0;
      state.invoice.items.map((item: ItemInvoice) => {
        const value = item.total_unit * item.cant;
        subtotal += value;
      });
      state.invoice.subtotal = subtotal;
      return subtotal;
    },
    getTotalInvoice: (state: any) => {
      let valueTax = (state.invoice.subtotal * state.invoice.tax) / 100;
      let total = (state.invoice.subtotal + valueTax);

      state.invoice.total = total;
      return total;
    },
    getTax: (state: any) => {
      let tax = (state.invoice.subtotal * state.invoice.tax) / 100;
      return tax;
    },
    getTotalItemInvoice: (state: any): number => {
      state.itemInvoice.total = (state.itemInvoice.cant * state.itemInvoice.total_unit).toFixed(2);
      return state.itemInvoice.total;
    }
  },
  methods: {
    initialItemInvoiceData() {
      return {
        id: 0,
        description: "",
        cant: 1,
        total_unit: 0,
        total: 0
      };
    },
    initialInvoiceData() {
      return {
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
      };
    },
    saveInvoice() {
      this.messagesErrors = [];
      if (this.invoice.items.length <= 0) {
        this.messagesErrors.push("Debes agregar por lo menos un Item");
        return false;
      }
      this.httpService.httpPost(this.userStore, "invoices", this.invoice, this.callbackStore);
    },
    callbackStore(status: string, response: any) {
      if (status === "error_validation")
        this.messagesErrors = response;
      if (status === "success") {

        const invoices = (this.orderBy === 'asc') ?
          [response, ...this.invoicesStore.invoices] :
          [...this.invoicesStore.invoices, response];

        // (this.orderBy === 'asc')
        this.invoicesStore.$patch({
          ...this.invoicesStore,
          invoices: invoices
        });

        this.invoice = this.initialInvoiceData();
        this.modalStore.updateModal({
          name: "",
          isOpen: false
        });
      }
    },
    removeItemToInvoice(item: ItemInvoice) {
      this.invoice.items = this.invoice.items.filter((currentItem: ItemInvoice) => currentItem.description !== item.description);
    },
    addItemToInvoice() {
      if (this.itemInvoice.description == "" ||
        this.itemInvoice.cant <= 0 ||
        this.itemInvoice.total_unit <= 0 ||
        this.itemInvoice.total <= 0) {
        alert("Los campos del Item de la factura son obligatorios");
        return false;
      }
      this.invoice.items.push(this.itemInvoice);
      this.itemInvoice = this.initialItemInvoiceData();
    },
  }
});
</script>