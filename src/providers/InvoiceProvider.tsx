import React, { useCallback, useEffect, useState } from "react";
import { PENDING_INVOICE, LATE_INVOICE } from "../mockData";
import { ActiveInvoice, InvoiceProps } from "../models";

export const InvoicesContext = React.createContext<{
  invoices: ActiveInvoice[];
  handleAddInvoice: (invoice: InvoiceProps) => void;
}>({
  invoices: [],
  handleAddInvoice: () => undefined,
});

export const InvoiceProvider: React.FC = ({ children }) => {
  const [invoices, setInvoices] = useState<ActiveInvoice[]>([]);

  const handleAddInvoice = useCallback(
    (invoice: InvoiceProps) => {
      setInvoices([
        ...invoices,
        {
          invoiceNumber: (invoices.length + 1).toString(),
          ...invoice,
        },
      ]);
    },
    [invoices]
  );

  useEffect(() => {
    if(process.env.REACT_APP_SEED_INVOICES){
      setInvoices([
        {
          invoiceNumber: "1",
          ...PENDING_INVOICE,
        },
        {
          invoiceNumber: "2",
          ...LATE_INVOICE,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InvoicesContext.Provider
      value={{
        invoices,
        handleAddInvoice,
      }}
    >
      {children}
    </InvoicesContext.Provider>
  );
};
