import styled, { css } from "styled-components";
import { AppColors } from "../styles";

export const inputStyles = css<{ width?: string }>`
  border-radius: 3px;
  padding: 7px;
  border: 1px solid ${AppColors.ACCENT};
  font-size: 16px;
  min-width: ${({ width }) => (width ? width : "200px")};
`;

export const InputField = styled.input<{ width?: string }>`
  ${inputStyles}
`;
