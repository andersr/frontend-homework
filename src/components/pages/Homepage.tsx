import React from "react";
import { AppRoutes } from "../../models";
import { InvoicesTable } from "../InvoicesTable";
import { LinkButton } from "../LinkButton";
import { Page } from "../Page";

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
