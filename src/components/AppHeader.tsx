import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppRoutes } from '../models';
import { AppColors, SECTION_PADDING } from "../styles";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${AppColors.PRIMARY};
  color: white;
  padding: ${SECTION_PADDING};

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const PageHeading = styled.h1`
  margin-top: 25px;
  margin-bottom: 20px;
  padding: 0;
  line-height: 0;
  display: inline-block;
  padding-bottom: 5px;
`;

export function AppHeader() {
  return (
    <Container>
      <PageHeading>
        <Link to={AppRoutes.HOME}>Invoicer</Link>
      </PageHeading>
    </Container>
  );
}
