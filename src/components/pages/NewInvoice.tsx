import "react-datepicker/dist/react-datepicker.css";
import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { DataTable } from "..";
import { InvoiceItemRow } from "../InvoiceItemRow";
import { BusinessAdress, InvoiceItem, KeyValuePair } from "../../models";
import { INVOICE_TABLE_HEADERS } from "../../shared";
import * as uuid from "uuid";
import { InvoicesContext } from "../../providers";
import date from "date-and-time";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { InputField } from "../InputField";
import { InputLabel } from "../InputLabel";
import { Page } from "../Page";
import { Button } from "../Button";
import { InputTextArea } from "../InputTextArea";
import { TableCell } from "../TableCell";
import { WarningText } from "../WarningText";
import { SELLER_COMPANY_INFO } from "../../mockData";
import { InputContainer } from "../InputContainer";
import { formatPrice } from "../../utils";
import { SectionSpacer } from "../SectionSpacer";

export const TEST_CREATE_BUTTON = "testCreateButton";
export const TEST_ERROR_MESSAGE = "testErrorMessage";
export const MISSING_COMPANY_INFO_ERROR_MSG = "Please enter company info.";
export const NO_ITEMS_ERROR_MSG = "Please add one or more invoice items.";

const Container = styled.div``;

const CUSTOMER_DEFAULT_VALUES: BusinessAdress = {
  companyName: "",
  street: "",
  city: "",
  zipCode: "",
  usState: "",
};

const INVOICE_ITEM_DEFAULT_VALUES = {
  description: "",
  quantity: "",
  unitPrice: "",
  subTotal: 0,
};

const CUSTOMER_FIELDS = Object.keys(CUSTOMER_DEFAULT_VALUES);

const FIELD_LABELS: { [index: string]: string } = {
  companyName: "Company Name",
  street: "Street Address",
  city: "City",
  zipCode: "Zip Code",
  usState: "State",
};

function NewInvoice() {
  const now = new Date();
  const history = useHistory();
  const { handleAddInvoice } = useContext(InvoicesContext);
  const [customerValues, setCustomerValues] = useState<BusinessAdress>(
    CUSTOMER_DEFAULT_VALUES
  );
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState(date.addDays(now, 30));
  const [errorMessage, setErrorMessage] = useState("");

  const addInvoiceItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: uuid.v4(),
        ...INVOICE_ITEM_DEFAULT_VALUES,
      },
    ]);
  };

  const handleInvoiceItemChange = useCallback(
    (kv: KeyValuePair, index: number) => {
      const shouldUpdateTotals =
        kv.key === "quantity" || kv.key === "unitPrice";
      const updated = [...invoiceItems];

      updated[index][kv.key] = kv.value;

      if (shouldUpdateTotals) {
        updated[index].subTotal =
          Number(updated[index].quantity) * Number(updated[index].unitPrice);
      }

      setInvoiceItems([...updated]);

      if (shouldUpdateTotals) {
        const subTotals = invoiceItems.map((item) => item.subTotal);
        setGrandTotal(subTotals.reduce((a, b) => a + b, 0));
      }
    },
    [invoiceItems]
  );

  const handleCreateInvoice = (e: any) => {
    e.preventDefault();

    if (Object.values(customerValues).some((val) => val.trim() === "")) {
      setErrorMessage(MISSING_COMPANY_INFO_ERROR_MSG);
      return;
    }

    if (invoiceItems.length === 0) {
      setErrorMessage(NO_ITEMS_ERROR_MSG);
      return;
    }

    handleAddInvoice({
      companyInfo: SELLER_COMPANY_INFO,
      customerInfo: customerValues,
      items: invoiceItems,
      notes,
      status: "pending",
      grandTotal: grandTotal.toString(),
      createdDate: date.format(now, "YYYY-MM-DD"),
      dueDate: date.format(dueDate, "YYYY-MM-DD"),
    });

    history.push("/");
  };

  return (
    <Page pageTitle="New Invoice">
      <SectionSpacer />
      <Container>
        {errorMessage && (
          <>
            <WarningText data-testid={TEST_ERROR_MESSAGE}>
              {errorMessage}
            </WarningText>
            <SectionSpacer />
          </>
        )}
        <form onSubmit={handleCreateInvoice}>
          {CUSTOMER_FIELDS.map((field) => (
            <React.Fragment key={field}>
              <InputContainer>
                <InputLabel htmlFor={field}>{FIELD_LABELS[field]}</InputLabel>
                <InputField
                  data-testid={`companyInfo${field}`}
                  id={field}
                  onChange={(e) =>
                    setCustomerValues((state) => ({
                      ...state,
                      [field]: e.target.value,
                    }))
                  }
                  value={customerValues[field]}
                />
              </InputContainer>
            </React.Fragment>
          ))}
          <SectionSpacer />
          <DataTable headers={INVOICE_TABLE_HEADERS}>
            {invoiceItems.map((item, j) => {
              return (
                <tr key={item.id}>
                  <InvoiceItemRow
                    item={item}
                    handleChange={(kv) => handleInvoiceItemChange(kv, j)}
                  />
                </tr>
              );
            })}
            <tr>
              <TableCell colSpan={2}>
                <Button small type="button" onClick={addInvoiceItem}>
                  Add Invoice Item
                </Button>
              </TableCell>
              <TableCell alignRight bold>
                Grand total:
              </TableCell>
              <TableCell bold>{formatPrice(grandTotal)}</TableCell>
            </tr>
          </DataTable>
          <SectionSpacer />
          <InputContainer>
            <InputLabel htmlFor={"invoiceNotes"}>Notes</InputLabel>
            <InputTextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </InputContainer>
          <SectionSpacer />
          <InputContainer>
            <InputLabel htmlFor={"dueDate"}>Due Date</InputLabel>
            <span className="datePicker">
              <DatePicker
                wrapperClassName="datePicker"
                id="dueDate"
                selected={dueDate}
                onChange={(date) => setDueDate(date as any)}
              />
            </span>
          </InputContainer>
          <SectionSpacer />
          <Button type="submit" data-testid={TEST_CREATE_BUTTON}>
            Create Invoice
          </Button>
        </form>
      </Container>
    </Page>
  );
}

export default NewInvoice;
