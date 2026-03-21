'use server';

import { appendContactMessageViaAppsScript } from '@/lib/google-apps-script';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = getString(formData, 'name');
  const email = getString(formData, 'email');
  const subject = getString(formData, 'subject');
  const message = getString(formData, 'message');

  if (!name || !email || !subject || !message) {
    return {
      status: 'error',
      message: 'Please fill in all fields before submitting.',
    };
  }

  try {
    await appendContactMessageViaAppsScript({
      name,
      email,
      subject,
      message,
    });

    return {
      status: 'success',
      message: 'Your message has been recorded successfully.',
    };
  } catch (error) {
    console.error(error);

    return {
      status: 'error',
      message: 'Unable to send your message right now. Please try again later.',
    };
  }
}
