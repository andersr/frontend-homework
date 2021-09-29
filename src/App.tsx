import React from "react";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { InvoiceProvider } from "./providers";
import { AppHeader } from "./components";
import { Routes } from "./components/Routes";

const AppContainer = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  height: 100vh;
`;

const MainContent = styled.main`
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
