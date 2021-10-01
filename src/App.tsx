import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { InvoiceProvider } from "./providers";
import { AppHeader } from "./components";
import { Routes } from './pages/Routes';

const AppContainer = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <InvoiceProvider>
      <Router>
        <AppContainer>
          <AppHeader />
          <MainContent>
            <Routes />
          </MainContent>
        </AppContainer>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
