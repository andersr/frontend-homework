import React from "react";
import styled from "styled-components";
import { TableHeader } from "./Tables/TableHeader";

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface Props {
  headers: string[];
  children?: React.ReactNode;
}

export function DataTable({ headers, children }: Props) {
  return (
    <Container>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <TableHeader key={`${header}-${index.toString()}`}>
              {header}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Container>
  );
}
