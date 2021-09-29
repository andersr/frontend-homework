import { BusinessAdress } from "./BusinessAddress";
import { InvoiceItem } from "./InvoiceItem";

type InvoiceStatus = "new" | "pending" | "paid" | "late";

export interface InvoiceProps {
  companyInfo: BusinessAdress;
  customerInfo: BusinessAdress;
  items: InvoiceItem[];
  notes: string;
  grandTotal: string;
  status: InvoiceStatus;
  dueDate: string;
  createdDate: string;
}

export interface ActiveInvoice extends InvoiceProps {
  invoiceNumber: string;
}
