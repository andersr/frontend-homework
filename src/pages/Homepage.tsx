import React from "react";
import { AppRoutes } from "../models";
import { InvoicesTable } from "../components/InvoicesTable";
import { LinkButton } from "../components/LinkButton";
import { Page } from "../components/Page";

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
