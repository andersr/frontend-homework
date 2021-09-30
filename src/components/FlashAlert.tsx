import styled from "styled-components";
import { AppColors } from "../styles";

export const FlashAlert = styled.div`
  position: absolute;
  z-index: 1;
  text-align: center;
  padding: 10px;
  top: 75px;
  width: 300px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid ${AppColors.PRIMARY};
  background-color: white;
  border-radius: 5px;
`;
