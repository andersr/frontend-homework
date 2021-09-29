import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewInvoice from "./NewInvoice";
import { TEST_CREATE_BUTTON, TEST_ERROR_MESSAGE } from ".";

test("displays an error message if form is submitted with no invoice items", () => {
  render(<NewInvoice />);
  const createButton = screen.getByTestId(TEST_CREATE_BUTTON);
  fireEvent.click(createButton);
  const errorMessage = screen.getByTestId(TEST_ERROR_MESSAGE);
  expect(errorMessage).toBeInTheDocument();
});
