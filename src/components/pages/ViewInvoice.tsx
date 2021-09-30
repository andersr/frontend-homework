import React, { useContext, useEffect, useState } from "react";
import { Page } from "../Page";
import { useParams } from "react-router-dom";
import { InvoicesContext } from "../../providers";
import { DataTable } from "..";
import { INVOICE_TABLE_HEADERS } from "../../shared";
import { formatDate, formatPrice } from "../../utils";
import styled from "styled-components";
import { SELLER_COMPANY_INFO } from "../../mockData";
import { TableCell } from "../TableCell";
import { CenteredRow } from "../CenteredRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppRoutes } from "../../models";
import { Button } from "../Button";
import Modal from "react-modal";
import { SendEmailForm } from "../SendEmailForm";
import { LinkButton } from "../LinkButton";
import { FlashAlert } from "../FlashAlert";
import { NoItemsMessage } from '../NoItemsMessage';
Modal.setAppElement("#root");

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Section = styled.div`
  padding-bottom: 20px;
`;

const SectionHeading = styled.h2`
  margin-bottom: 5px;
`;

const BoldTableCell = styled(TableCell)`
  font-weight: bold;
`;

export function ViewInvoice() {
  const { id } = useParams<{ id: string }>();
  const { invoices } = useContext(InvoicesContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const invoice = invoices.find((inv) => inv.invoiceNumber === id);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (alertMessage) {
      id = setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [alertMessage]);
  
  return (
    <div>
      {alertMessage && <FlashAlert>{alertMessage}</FlashAlert>}
      <CenteredRow>
        <div>
          <LinkButton to={AppRoutes.HOME}>
            <FontAwesomeIcon title="Back to invoice list" icon={faArrowLeft} />{" "}
            All Invoices
          </LinkButton>
        </div>
        <div>
          <Button onClick={() => setIsOpen(true)}>Email Invoice</Button>
        </div>
      </CenteredRow>
      <Page largeTitle pageTitle={"Invoice"}>
        {invoice ? (
          <div>
            <Section>
              <Row>
                <div>
                  <SectionHeading>From:</SectionHeading>
                  <div>{SELLER_COMPANY_INFO.companyName}</div>
                  <div>{SELLER_COMPANY_INFO.street}</div>
                  <div>
                    {SELLER_COMPANY_INFO.city},{" "}
                    {SELLER_COMPANY_INFO.addressUsState}{" "}
                    {SELLER_COMPANY_INFO.zipCode}
                  </div>
                </div>
                <div>
                  <SectionHeading>Bill To:</SectionHeading>
                  <div>{invoice.customerInfo?.companyName}</div>
                  <div>{invoice.customerInfo?.street}</div>
                  <div>
                    {invoice.customerInfo?.city},{" "}
                    {invoice.customerInfo?.usState}{" "}
                    {invoice.customerInfo?.zipCode}
                  </div>
                </div>
              </Row>
            </Section>
            <div>
              <DataTable headers={INVOICE_TABLE_HEADERS}>
                {invoice.items.map((item, i) => {
                  return (
                    <tr key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatPrice(Number(item.unitPrice))}
                      </TableCell>
                      <TableCell>{formatPrice(item.subTotal)}</TableCell>
                    </tr>
                  );
                })}
                <tr>
                  <BoldTableCell colSpan={3}>Total Due:</BoldTableCell>
                  <BoldTableCell>
                    {formatPrice(Number(invoice.grandTotal))}
                  </BoldTableCell>
                </tr>
              </DataTable>
            </div>
            <div>
              <SectionHeading>Due Date:</SectionHeading>
              <div>{formatDate(invoice.dueDate)}</div>
              <SectionHeading>Notes:</SectionHeading>
              <div>{invoice.notes}</div>
            </div>
          </div>
        ) : (
          <NoItemsMessage>Sorry, we couldn't find that invoice.</NoItemsMessage>
        )}
      </Page>
      <SendEmailForm
        invoiceNumber={id}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        handleEmailResult={setAlertMessage}
      />
    </div>
  );
}
