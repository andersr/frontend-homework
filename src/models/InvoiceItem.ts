export interface InvoiceItem {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  subTotal: number;
  [index: string]: string | number;
}
