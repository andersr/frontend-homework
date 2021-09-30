import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppColors } from "../styles";
import { btnStyles } from "./Button";

export const LinkButton = styled(Link)`
  ${btnStyles}
  text-decoration: none;
  padding-left: 7px;

  &:hover {
    border-color: ${AppColors.SECONDARY};
  }
`;
