import styled from "styled-components";

export const ClickableTableRow = styled.tr`
  cursor: pointer;

  td {
    border-top: 1px solid #ccc;
    padding: 15px 5px;
  }
  &:hover td {
    background-color: #60afff;
  }
`;
