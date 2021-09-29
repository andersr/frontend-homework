import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AppColors } from "../styles";

interface Props {
  onClick: () => void;
  icon: IconProp;
  altText: string;
}

const Button = styled.button`
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 17px;
  color: ${AppColors.PRIMARY};
  padding: 0;
`;

export const IconButton: React.FC<Props> = ({ icon, onClick, altText }) => (
  <Button onClick={onClick}>
    <FontAwesomeIcon size="lg" title={altText} icon={icon} />
  </Button>
);
