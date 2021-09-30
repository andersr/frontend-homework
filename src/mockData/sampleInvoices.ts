import { MOCK_BUYER_1 } from "./sampleBuyers";
import { SELLER_COMPANY_INFO } from "./sellerCompanyInfo";
import { InvoiceProps } from "../models";

export const PENDING_INVOICE: InvoiceProps = {
  companyInfo: SELLER_COMPANY_INFO,
  customerInfo: MOCK_BUYER_1,
  items: [
    {
      id: "1",
      description: "Web development",
      quantity: "2",
      unitPrice: "50",
      subTotal: 100,
    },
    {
      id: "2",
      description: "Mowing the lawn",
      quantity: "4",
      unitPrice: "15",
      subTotal: 60,
    },
  ],
  notes: "Payment due within 30 days of due date.",
  grandTotal: "160",
  status: "pending",
  dueDate: "2021-12-12",
  createdDate: "2021-10-12",
};

export const LATE_INVOICE: InvoiceProps = {
  companyInfo: SELLER_COMPANY_INFO,
  customerInfo: MOCK_BUYER_1,
  items: [
    {
      id: "1",
      description: "Web development",
      quantity: "3",
      unitPrice: "50",
      subTotal: 150,
    },
  ],
  notes: "Payment due within 30 days of due date.",
  grandTotal: "150",
  status: "pending",
  dueDate: "2021-09-12",
  createdDate: "2021-10-12",
};
