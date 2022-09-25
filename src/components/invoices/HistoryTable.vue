<template>
  <table class="table">
    <thead>
      <tr>
        <th>Número</th>
        <th>Fecha/Hora</th>
        <th>Emisor</th>
        <th>Comprador</th>
        <th>Subtotal</th>
        <th>IVA</th>
        <th>Total</th>
        <th>Items</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.number">
        <td><router-link :to="`/invoice/${invoice.id}`">{{invoice.number}}</router-link></td>
        <td>{{invoice.created_at}}</td>
        <td>{{invoice.transmitter_name}}
          <br />
          <strong>Nit</strong>: {{invoice.transmitter_nit}}
        </td>
        <td>{{invoice.receiver_name}}
          <br />
          <strong>Nit</strong>: {{invoice.receiver_nit}}
        </td>
        <td>
          <Formatters :number="invoice.subtotal" />
        </td>
        <td>{{invoice.tax}}%</td>
        <td>
          <Formatters :number="invoice.total" />
        </td>
        <td>{{invoice?.items.length}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import Formatters from '@/components/Formatters.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HistoryTable',
  props: ['invoices'],
  components: {
    Formatters
  }
});
</script>