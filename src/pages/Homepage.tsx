import React from "react";
import { AppRoutes } from "../models";
import { InvoicesTable, LinkButton, Page } from "../components";

export function Homepage() {
  return (
    <Page
      pageTitle={"My Invoices"}
      actionButton={
        <LinkButton to={AppRoutes.NEW_INVOICE}>New Invoice</LinkButton>
      }
    >
      <InvoicesTable />
    </Page>
  );
}
