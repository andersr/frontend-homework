import React from "react";
import { InvoicesTable } from "../InvoicesTable";
import { LinkButton } from "../LinkButton";
import { Page } from "../Page";

export function Homepage() {
  return (
    <Page
      pageTitle={"My Invoices"}
      actionButton={<LinkButton to="/invoices/new">New Invoice</LinkButton>}
    >
      <InvoicesTable />
    </Page>
  );
}
