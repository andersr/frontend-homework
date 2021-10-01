import React from "react";

import { Switch, Route } from "react-router-dom";
import NewInvoice from "./NewInvoice";
import { Homepage } from "./Homepage";
import { ViewInvoice } from "./ViewInvoice";
import { AppRoutes } from "../models";

export function Routes() {
  return (
    <Switch>
      <Route exact path={AppRoutes.HOME}>
        <Homepage />
      </Route>
      <Route exact path={AppRoutes.NEW_INVOICE}>
        <NewInvoice />
      </Route>
      <Route path={AppRoutes.VIEW_INVOICE}>
        <ViewInvoice />
      </Route>
    </Switch>
  );
}
