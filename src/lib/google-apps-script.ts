import 'server-only';

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

export async function appendContactMessageViaAppsScript(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const endpoint = getRequiredEnv('GOOGLE_APPS_SCRIPT_WEB_APP_URL');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      submittedAt: new Date().toISOString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to append via Google Apps Script: ${text}`);
  }
}
