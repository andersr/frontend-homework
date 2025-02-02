import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import Modal from "react-modal";
import { InputContainer } from "./InputContainer";
import { InputLabel } from "./InputLabel";
import { InputField } from "./InputField";
import { WarningText } from "./WarningText";
import { sendMail } from "../utils";
import { IconButton } from "./IconButton";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { CenteredRow } from "./CenteredRow";
import { SectionSpacer } from "./SectionSpacer";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Heading = styled.h2`
  margin: 0;
`;
interface Props {
  invoiceNumber: string;
  modalIsOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleEmailResult: (result: string) => void;
}
const missingEmailConfig =
  !process.env.REACT_APP_EMAIL_SERVICE ||
  !process.env.REACT_APP_EMAIL_TEMPLATE ||
  !process.env.REACT_APP_EMAIL_USERNAME;

export function SendEmailForm({
  modalIsOpen,
  setIsOpen,
  invoiceNumber,
  handleEmailResult,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (missingEmailConfig) {
      setErrorMessage("Cannot send email. Please check your config.");
    }
  }, []);

  const handleSendEmail = async () => {
    if (errorMessage) {
      setErrorMessage(undefined);
    }

    if (!toEmail) {
      setErrorMessage("Please enter a recipient email address.");
      return;
    }
    setLoading(true);

    const result: any = await sendMail({
      fromName: senderName,
      toEmail,
      invoiceLink: `http://localhost:3000/invoices/${invoiceNumber}`,
    });

    setLoading(false);

    if (result.status === 200) {
      setIsOpen(false);
      handleEmailResult(`Email successfully sent to '${toEmail}'`);
    } else {
      setErrorMessage(result.text);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Example Modal"
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick
    >
      <CenteredRow>
        <Heading>Email Invoice</Heading>
        <IconButton
          altText="Close"
          icon={faTimes}
          onClick={() => setIsOpen(false)}
        />
      </CenteredRow>
      <SectionSpacer />
      {errorMessage && (
        <>
          <WarningText>{errorMessage}</WarningText>
          <SectionSpacer />
        </>
      )}
      <InputContainer>
        <InputLabel htmlFor="senderName">Your Name</InputLabel>
        <InputField
          id={"senderName"}
          onChange={(e) => setSenderName(e.target.value)}
          value={senderName}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel htmlFor="toEmail">Recipient Email</InputLabel>
        <InputField
          id={"toEmail"}
          type="email"
          onChange={(e) => setToEmail(e.target.value)}
          value={toEmail}
        />
      </InputContainer>
      <Button onClick={handleSendEmail} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </Button>
    </Modal>
  );
}
