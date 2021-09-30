import React, { useContext } from "react";
import { DataTable } from ".";
import { InvoicesContext } from "../providers";
import { useHistory } from "react-router-dom";
import { formatDate, formatPrice } from "../utils";
import { TableCell } from "./Tables/TableCell";
import { WarningText } from "./WarningText";
import { ClickableTableRow } from './ClickableTableRow';
const now = new Date();

export function InvoicesTable() {
  const { invoices } = useContext(InvoicesContext);
  const history = useHistory();

  const goToInvoice = (id: string) => {
    history.push(`/invoices/${id}`);
  };

  return (
    <div>
      <DataTable
        headers={[
          "Invoice #",
          "Billing To",
          "Due Date",
          "Amount Due",
          "Status",
        ]}
      >
        {invoices.map(
          ({ invoiceNumber, customerInfo, grandTotal, dueDate }) => {
            const pastDueTime = new Date(dueDate).getTime();
            const pastDue = pastDueTime < now.getTime();
            return (
              <ClickableTableRow
                key={invoiceNumber}
                onClick={() => goToInvoice(invoiceNumber)}
              >
                <TableCell>{invoiceNumber}</TableCell>
                <TableCell>{customerInfo.companyName}</TableCell>
                <TableCell>{formatDate(dueDate)}</TableCell>
                <TableCell>{formatPrice(Number(grandTotal))}</TableCell>
                <TableCell>
                  {pastDue ? <WarningText>Past Due</WarningText> : "Pending"}
                </TableCell>
              </ClickableTableRow>
            );
          }
        )}
      </DataTable>
    </div>
  );
}
