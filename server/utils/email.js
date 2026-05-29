import { Resend } from 'resend';

let resendClient;

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export function buildPasswordSetupUrl(token) {
  return `${process.env.FRONTEND_URL}/definir-senha?token=${token}`;
}

function buildPasswordSetupEmailContent(name, token) {
  const setupUrl = buildPasswordSetupUrl(token);
  const subject = 'Defina sua senha - Consulte seu Processo';

  const text = [
    `Olá, ${name}!`,
    '',
    'Você foi cadastrado no sistema Consulte seu Processo.',
    'Acesse o link abaixo para definir sua senha:',
    setupUrl,
    '',
    'Este link expira em 7 dias.',
  ].join('\n');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <h2 style="color: #111827;">Olá, ${name}!</h2>
      <p>Você foi cadastrado no sistema Consulte seu Processo.</p>
      <p>Clique no botão abaixo para definir sua senha e acessar sua conta:</p>
      <p style="margin: 24px 0;">
        <a href="${setupUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
          Definir Senha
        </a>
      </p>
      <p style="font-size: 14px; color: #6b7280;">Ou copie e cole este link no seu navegador:</p>
      <p style="font-size: 14px; word-break: break-all;">
        <a href="${setupUrl}" style="color: #3b82f6;">${setupUrl}</a>
      </p>
      <p style="font-size: 14px; color: #6b7280;">Este link expira em 7 dias.</p>
    </div>
  `;

  return { subject, text, html };
}

export async function verifyEmailConnection() {
  const { data, error } = await getResendClient().domains.list();

  if (error) {
    if (error.message?.includes('restricted to only send emails')) {
      console.log('Resend configurado (API key com permissão apenas de envio)');
      return;
    }
    throw new Error(error.message);
  }

  const domainCount = data?.data?.length ?? 0;
  console.log(`Resend conectado (${domainCount} domínio(s) verificado(s))`);
}

export async function sendPasswordSetupEmail(email, name, token) {
  const { subject, text, html } = buildPasswordSetupEmailContent(name, token);

  const payload = {
    from: process.env.EMAIL_FROM,
    to: [email],
    subject,
    text,
    html,
    tags: [{ name: 'category', value: 'password-setup' }],
  };

  if (process.env.EMAIL_REPLY_TO) {
    payload.replyTo = process.env.EMAIL_REPLY_TO;
  }

  const { data, error } = await getResendClient().emails.send(payload);

  if (error) {
    throw new Error(error.message);
  }

  console.log(`E-mail de definição de senha enviado via Resend para ${email} (id: ${data.id})`);
  return data;
}
