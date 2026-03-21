'use server';

import { appendBlogSubscriptionViaAppsScript } from '@/lib/google-apps-script';

export type BlogSubscriptionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function subscribeToBlogUpdates(
  _previousState: BlogSubscriptionState,
  formData: FormData
): Promise<BlogSubscriptionState> {
  const email = getString(formData, 'email');

  if (!email) {
    return {
      status: 'error',
      message: 'Please enter your email address.',
    };
  }

  try {
    await appendBlogSubscriptionViaAppsScript({ email });

    return {
      status: 'success',
      message: 'You are subscribed for future blog updates.',
    };
  } catch (error) {
    console.error(error);

    return {
      status: 'error',
      message: 'Unable to save your subscription right now. Please try again later.',
    };
  }
}
