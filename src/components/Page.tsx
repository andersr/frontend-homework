import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import styled from "styled-components";
import { CenteredRow } from "./CenteredRow";

interface Props {
  pageTitle: string;
  actionButton?: JSX.Element;
  children: React.ReactNode;
  largeTitle?: boolean;
}

const Container = styled.div`
  background-color: white;
`;

const PageHeading = styled.h2<{ largeTitle?: boolean }>`
  margin: 0;
  display: inline-block;
  ${(props) => (props.largeTitle ? "font-size: 50px;" : "")}
`;

const PageContent = styled.div``;

export function Page({ actionButton, pageTitle, largeTitle, children }: Props) {
  document.title = `${pageTitle} - Invoicer`;
  return (
    <Container>
      <CenteredRow horizontallyCentered={largeTitle}>
        <PageHeading largeTitle={largeTitle}>{pageTitle}</PageHeading>
        {actionButton}
      </CenteredRow>
      <PageContent>{children}</PageContent>
    </Container>
  );
}
