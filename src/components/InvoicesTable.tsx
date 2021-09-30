import React, { useContext } from "react";
import { DataTable } from ".";
import { InvoicesContext } from "../providers";
import { useHistory } from "react-router-dom";
import { formatDate, formatPrice, isPastDue } from "../utils";
import { TableCell } from "./TableCell";
import { WarningText } from "./WarningText";
import { ClickableTableRow } from "./ClickableTableRow";
import { NoItemsMessage } from "./NoItemsMessage";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 10px;
`;

export function InvoicesTable() {
  const { invoices } = useContext(InvoicesContext);
  const history = useHistory();

  const goToInvoice = (id: string) => {
    history.push(`/invoices/${id}`);
  };

  return (
    <Container>
      {invoices.length === 0 ? (
        <NoItemsMessage>No Invoices added.</NoItemsMessage>
      ) : (
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
                    {isPastDue(dueDate) ? (
                      <WarningText>Past Due</WarningText>
                    ) : (
                      "Pending"
                    )}
                  </TableCell>
                </ClickableTableRow>
              );
            }
          )}
        </DataTable>
      )}
    </Container>
  );
}
