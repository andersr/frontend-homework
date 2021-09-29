import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppColors } from "../styles";
interface Props {
  to: string;
  icon: IconProp;
  altText: string;
}

const StyledIconLink = styled(Link)`
  color: ${AppColors.PRIMARY};
`;

export const IconLink: React.FC<Props> = ({ to, icon, altText }) => (
  <StyledIconLink to={to}>
    <FontAwesomeIcon size="lg" title={altText} icon={icon} />
  </StyledIconLink>
);
