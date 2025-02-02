import emailjs from "emailjs-com";

export interface MailParams {
  fromName: string;
  toEmail: string;
  invoiceLink: string;
  message?: string;
}

export const sendMail = async ({
  fromName,
  toEmail,
  invoiceLink,
  message,
}: MailParams) => {
  let result;

  try {
    result = await emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE as string,
      process.env.REACT_APP_EMAIL_TEMPLATE as string,
      {
        from_name: fromName,
        message,
        invoice_link: invoiceLink,
        to_email: toEmail,
      },
      process.env.REACT_APP_EMAIL_USERNAME as string
    );
  } catch (error) {
    result = error;
  } finally {
    return result;
  }
};
