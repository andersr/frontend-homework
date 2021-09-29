import React, { useContext } from "react";
import { DataTable } from ".";
import { InvoicesContext } from "../providers";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { formatDate, formatPrice, sendMail } from "../utils";
import { TableCell } from "./Tables/TableCell";
import { WarningText } from "./WarningText";
import { IconButton } from "./IconButton";
import { IconLink } from "./IconLink";
import { TextSpacer } from "./TextSpacer";
const now = new Date();

export function InvoicesTable() {
  const { invoices } = useContext(InvoicesContext);
  const history = useHistory();

  const goToInvoice = (id: string) => {
    history.push(`/invoices/${id}`);
  };

  const handleSendEmail = (invoiceNumber: string) => {
    const toEmail = prompt("Please enter recipient email address");

    if (!toEmail) {
      return;
    }

    sendMail({
      fromName: "Invoicer",
      toEmail,
      toName: "nada",
      invoiceLink: `http://localhost:3000/invoices/${invoiceNumber}`,
    });
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
          "Options",
        ]}
      >
        {invoices.map(
          ({ invoiceNumber, customerInfo, grandTotal, dueDate }) => {
            const pastDueTime = new Date(dueDate).getTime();
            const pastDue = pastDueTime < now.getTime();
            return (
              <tr
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
                <TableCell>
                  <IconLink
                    to={`/invoices/${invoiceNumber}`}
                    icon={faEye}
                    altText={"View Invoice"}
                  />
                  <TextSpacer />
                  <IconButton
                    onClick={() => alert("Edit Invoice")}
                    icon={faEdit}
                    altText="Edit Invoice"
                  />
                  <TextSpacer />
                  <IconButton
                    onClick={() => handleSendEmail(invoiceNumber)}
                    icon={faEnvelope}
                    altText="Email Invoice"
                  />
                  <TextSpacer />
                  <IconButton
                    onClick={() => alert("Delete Invoice")}
                    icon={faTrashAlt}
                    altText="Edit Invoice"
                  />
                </TableCell>
              </tr>
            );
          }
        )}
      </DataTable>
    </div>
  );
}
