const MULTI_PART_TLDS = [
  'com.br', 'net.br', 'org.br', 'gov.br', 'edu.br',
  'co.uk', 'com.au', 'com.ar', 'com.mx',
];

function getRegistrableDomain(hostname) {
  for (const tld of MULTI_PART_TLDS) {
    if (hostname === tld || hostname.endsWith(`.${tld}`)) {
      const prefix = hostname.slice(0, -(tld.length + 1));
      const label = prefix.split('.').pop();
      return label ? `${label}.${tld}` : tld;
    }
  }

  const parts = hostname.split('.');
  if (parts.length >= 2) {
    return parts.slice(-2).join('.');
  }

  return hostname;
}

export function getCookieDomain() {
  if (process.env.COOKIE_DOMAIN) {
    return process.env.COOKIE_DOMAIN;
  }

  if (process.env.NODE_ENV !== 'production' || !process.env.FRONTEND_URL) {
    return undefined;
  }

  try {
    const hostname = new URL(process.env.FRONTEND_URL).hostname;

    if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return undefined;
    }

    const registrableDomain = getRegistrableDomain(hostname);
    return `.${registrableDomain}`;
  } catch {
    return undefined;
  }
}

export function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    domain: getCookieDomain(),
    path: '/',
  };
}
