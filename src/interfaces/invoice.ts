import { ItemInvoice } from "./invoiceItem";

export interface State {
  name: string,
  totalValueInvoices: number,
  invoices: Array<Invoice>
}

export interface Invoice {
  id: number,
  number: string,
  transmitter_name: string,
  transmitter_nit: string,
  receiver_name: string,
  receiver_nit: string,
  subtotal: number,
  tax: number,
  total: number,
  created_at: string,
  updated_at: string,
  items: Array<ItemInvoice>
}

