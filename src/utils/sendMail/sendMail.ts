import emailjs from "emailjs-com";

export interface MailParams {
  fromName: string;
  toName: string;
  toEmail: string;
  invoiceLink: string;
  message?: string;
}

export const sendMail = async ({
  fromName,
  toName,
  toEmail,
  invoiceLink,
  message,
}: MailParams) => {
  try {
    await emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE as string,
      process.env.REACT_APP_EMAIL_TEMPLATE as string,
      {
        from_name: fromName,
        to_name: toName,
        message,
        invoice_link: invoiceLink,
        to_email: toEmail,
      },
      process.env.REACT_APP_EMAIL_USERNAME as string
    );
  } catch (error) {
    console.error("send email error: ", error);
  }
};
