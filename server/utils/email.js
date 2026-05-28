import dns from 'dns/promises';
import nodemailer from 'nodemailer';

let transporter;

function getTlsOptions() {
  return {
    rejectUnauthorized: process.env.EMAIL_TLS_REJECT_UNAUTHORIZED !== 'false',
    servername: process.env.EMAIL_TLS_SERVERNAME || process.env.EMAIL_HOST,
  };
}

function getTransporter() {
  if (!transporter) {
    const emailPort = Number(process.env.EMAIL_PORT) || 587;
    const secure = process.env.EMAIL_SECURE === 'true' || emailPort === 465;

    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: emailPort,
      secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: getTlsOptions(),
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  return transporter;
}

export function buildPasswordSetupUrl(token) {
  return `${process.env.FRONTEND_URL}/definir-senha?token=${token}`;
}

export async function verifyEmailConnection() {
  const host = process.env.EMAIL_HOST;

  try {
    const addresses = await dns.resolve4(host);
    console.log(`SMTP ${host} resolve para: ${addresses.join(', ')}`);
  } catch (error) {
    console.warn(`Não foi possível resolver ${host}: ${error.message}`);
  }

  await getTransporter().verify();
}

export const sendPasswordSetupEmail = async (email, name, token) => {
  const setupUrl = buildPasswordSetupUrl(token);
  const fromAddress = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const text = [
    `Olá, ${name}!`,
    '',
    'Você foi cadastrado no sistema Consulte seu Processo.',
    'Acesse o link abaixo para definir sua senha:',
    setupUrl,
    '',
    'Este link expira em 7 dias.',
  ].join('\n');

  const mailOptions = {
    from: fromAddress,
    to: email,
    replyTo: process.env.EMAIL_USER,
    subject: 'Defina sua senha - Consulte seu Processo',
    text,
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Você foi cadastrado no sistema Consulte seu Processo.</p>
      <p>Clique no link abaixo para definir sua senha e acessar sua conta:</p>
      <p><a href="${setupUrl}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Definir Senha</a></p>
      <p>Ou copie e cole este link no seu navegador:</p>
      <p><a href="${setupUrl}">${setupUrl}</a></p>
      <p>Este link expira em 7 dias.</p>
    `,
    envelope: {
      from: process.env.EMAIL_USER,
      to: email,
    },
  };

  const info = await getTransporter().sendMail(mailOptions);
  console.log(`E-mail de definição de senha enviado para ${email} (messageId: ${info.messageId}, response: ${info.response || 'ok'})`);
  return info;
};
