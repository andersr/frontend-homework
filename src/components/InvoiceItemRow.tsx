import React from "react";
import { InvoiceItem, KeyValuePair } from "../models";
import { formatPrice } from "../utils";
import { InputField } from "./InputField";
import { TableCell } from "./TableCell";

interface Props {
  item: InvoiceItem;
  handleChange: (kv: KeyValuePair) => void;
}

export function InvoiceItemRow({ handleChange, item }: Props) {
  return (
    <>
      <TableCell key={`${item.id}-description`}>
        <InputField
          value={item.description}
          onChange={(e) => {
            handleChange({
              key: "description",
              value: e.target.value,
            });
          }}
          placeholder="Add description"
        />
      </TableCell>
      <TableCell>
        <InputField
          value={item.quantity}
          type="number"
          onChange={(e) =>
            handleChange({ key: "quantity", value: e.target.value })
          }
          placeholder="Add qty/hours worked"
        />
      </TableCell>
      <TableCell>
        <InputField
          value={item.unitPrice}
          type="number"
          onChange={(e) =>
            handleChange({ key: "unitPrice", value: e.target.value })
          }
          placeholder="Add charge per unit/hour"
        />
      </TableCell>
      <TableCell>{formatPrice(item.subTotal)}</TableCell>
    </>
  );
}
