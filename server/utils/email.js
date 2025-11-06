import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordSetupEmail = async (email, name, token) => {
  const setupUrl = `${process.env.FRONTEND_URL}/definir-senha?token=${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Defina sua senha - Consulte seu Processo',
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Você foi cadastrado no sistema Consulte seu Processo.</p>
      <p>Clique no link abaixo para definir sua senha e acessar sua conta:</p>
      <p><a href="${setupUrl}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Definir Senha</a></p>
      <p>Ou copie e cole este link no seu navegador:</p>
      <p>${setupUrl}</p>
      <p>Este link expira em 7 dias.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

