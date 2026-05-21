const REQUIRED = {
  all: ['MONGODB_URI', 'JWT_SECRET'],
  production: ['FRONTEND_URL', 'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'],
};

export function validateEnv() {
  const missing = REQUIRED.all.filter((key) => !process.env[key]);

  if (process.env.NODE_ENV === 'production') {
    missing.push(...REQUIRED.production.filter((key) => !process.env[key]));
  }

  if (missing.length > 0) {
    console.error(`Variáveis de ambiente obrigatórias ausentes: ${missing.join(', ')}`);
    process.exit(1);
  }

  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.error('JWT_SECRET deve ter pelo menos 32 caracteres');
    process.exit(1);
  }
}
