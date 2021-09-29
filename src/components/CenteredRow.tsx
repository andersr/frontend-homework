import styled from "styled-components";

export const CenteredRow = styled.header<{ horizontallyCentered?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ horizontallyCentered }) =>
    horizontallyCentered ? "center" : "space-between"};
  align-items: center;
`;
