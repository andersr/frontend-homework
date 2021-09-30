import styled from "styled-components";
import { AppColors } from "../styles";

export const TableCell = styled.td<{ alignRight?: boolean; bold?: boolean }>`
  text-align: ${({ alignRight }) => (alignRight ? "right" : "left")};
  ${({ bold }) => bold && "font-weight: bold;"};
  padding: 15px 5px;
  border-bottom: 1px solid ${AppColors.ACCENT};
`;
