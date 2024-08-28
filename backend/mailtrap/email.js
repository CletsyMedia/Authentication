import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtap.config.js";

export const sendVerificationEmail = async (email, userName, verificationToken) => {
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: "Account Verification",
      html: VERIFICATION_EMAIL_TEMPLATE
        .replace("{{userName}}", userName)
        .replace("{{verificationToken}}", verificationToken)
        .replace("{{year}}", new Date().getFullYear()),
      category: "Email Verification"
    });
    console.log("Email sent successfully", res);
  } catch (error) {
    console.error(`Error sending verification email: ${error.response ? error.response.data : error.message}`);
    throw new Error(`Error sending verification email: ${error.response ? error.response.data : error.message}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "df6ba0de-4b71-40f1-9b74-a1ebf45b600f",
      template_variables: {
        "company_info_name": "MERN Auth",
        "name": name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email:`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL, userName) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset",
      html: PASSWORD_RESET_REQUEST_TEMPLATE
      .replace("{{resetURL}}", resetURL)
      .replace("{{userName}}", userName)
      .replace("{{year}}", new Date().getFullYear()),
      category: "Password Reset"
      });
      
  }catch (error) {
    console.error(`Error sending password reset email:`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
  
}

export const sendResetSuccessEmail = async (email)=>{
  const recipient = [{email}];
  try {
    const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject: "Password Reset Successfully",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password reset"
  });
    console.log("Password reset success email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email`, error)
  }
}