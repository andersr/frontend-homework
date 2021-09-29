import styled, { css } from "styled-components";
import { AppColors } from "../styles";

export const btnStyles = css<{ small?: boolean }>`
  border: 2px solid ${AppColors.PRIMARY};
  background-color: ${AppColors.PRIMARY};
  color: white;
  border-radius: 5px;
  padding: ${({ small }) => (small ? "3px 7px" : "5px 10px")};
  font-size: ${({ small }) => (small ? "14px" : "18px")};
`;

export const Button = styled.button<{ small?: boolean }>`
  ${btnStyles}
  cursor: pointer;
`;
