import React, { useContext, useState } from "react";
import { Page } from "../Page";
import { Link, useParams } from "react-router-dom";
import { InvoicesContext } from "../../providers";
import { DataTable } from "..";
import { INVOICE_TABLE_HEADERS } from "../../shared";
import { formatDate, formatPrice, sendMail } from "../../utils";
import styled from "styled-components";
import { SELLER_COMPANY_INFO } from "../../mockData";
import { TableCell } from "../Tables/TableCell";
import { CenteredRow } from "../CenteredRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { AppRoutes } from "../../models";
import { Button } from "../Button";
import Modal from 'react-modal';
import { InputContainer } from '../InputContainer';
import { InputLabel } from '../InputLabel';
import { InputField } from '../InputField';
import { WarningText } from '../WarningText';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  invoiceNumber: string;
  modalIsOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleEmailResult: (result: string) => void;
}

export function SendEmailForm({ modalIsOpen, setIsOpen, invoiceNumber, handleEmailResult }: Props) {
  const [loading, setLoading] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSendEmail = async () => {
    if (errorMessage) {
      setErrorMessage(undefined)
    }

    if (!toEmail) {
      setErrorMessage('Please enter a recipient email address.')
      return;
    }
    setLoading(true);
    const result: any = await sendMail({
      fromName: senderName,
      toEmail,
      toName: "nada",
      invoiceLink: `http://localhost:3000/invoices/${invoiceNumber}`,
    });
    setLoading(false);
    if (result.status === 200) {
      setIsOpen(false);
      handleEmailResult(`Email successfully sent to '${toEmail}'`)
    } else {
      setErrorMessage(result.text)
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
    <h2>Email Invoice</h2>
    <button onClick={() => setIsOpen(false)}>close</button>
    {errorMessage && <WarningText>{errorMessage}</WarningText>}
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
                  onChange={(e) => setToEmail(e.target.value)}
                  value={toEmail}
                />
              </InputContainer>
              <Button onClick={handleSendEmail} disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </Button>
  </Modal>
  );
}
