import styled from "styled-components";
import { AppColors } from '../styles';

export const ClickableTableRow = styled.tr`
  cursor: pointer;

  td {
    border-top: 1px solid ${AppColors.ACCENT};
    padding: 15px 5px;
  }
  &:hover td {
    background-color: ${AppColors.ACCENT_SECONDARY};
  }
`;
