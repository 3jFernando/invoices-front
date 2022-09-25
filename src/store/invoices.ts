import { defineStore } from 'pinia';
import { State, Invoice } from '@/interfaces/invoice'

export const useInvoicesStore = defineStore('invoices', {
  state: (): State => {
    return {
      name: "Facturas",
      totalValueInvoices: 0,
      invoices: []
    }
  },
  getters: {
    getIvoiceTotal: (state) => {
      let totalValueICurrent = 0;
      state.invoices.map((invoice: Invoice) => totalValueICurrent += invoice.total);

      return state.totalValueInvoices = totalValueICurrent;
    }
  }
});

