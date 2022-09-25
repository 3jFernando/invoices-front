import { Invoice } from "./invoice";
import { ItemInvoice } from "./invoiceItem";

export interface createInvoice {  
  messagesErrors: Array<string>,
  invoice: Invoice,
  itemInvoice: ItemInvoice
}