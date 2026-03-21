'use client';

import { useActionState, useState } from 'react';
import {
  sendBlogBroadcastAction,
  type BlogBroadcastState,
} from '@/app/admin/actions';

export function AdminBlogBroadcastForm() {
  const initialState: BlogBroadcastState = {
    status: 'idle',
    message: '',
  };

  const [recipientMode, setRecipientMode] = useState<'all' | 'manual'>('all');
  const [state, formAction, pending] = useActionState(
    sendBlogBroadcastAction,
    initialState
  );

  return (
    <form action={formAction} className="rounded-[32px] border border-oxford-blue/8 bg-white p-6 shadow-[0_15px_60px_rgba(21,34,54,0.07)]">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-deep-gold">Subscriber Broadcast</p>
      <h2 className="mt-2 text-2xl font-serif font-bold text-oxford-blue">Send a blog update email</h2>
      <p className="mt-2 text-sm leading-7 text-oxford-blue/62">
        Use the format below to mail all subscribers at once, or switch to a manual list when you want to send to selected people only.
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <input
          name="subject"
          required
          placeholder="Email subject"
          className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3"
        />
        <input
          name="headline"
          required
          placeholder="Headline shown inside the email"
          className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3"
        />
        <textarea
          name="message"
          required
          rows={7}
          placeholder="Write the main blog update message here..."
          className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="ctaLabel"
            placeholder="Button label e.g. Read the latest essay"
            className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3"
          />
          <input
            name="ctaUrl"
            placeholder="Button link e.g. https://your-site/blog"
            className="w-full rounded-2xl border border-oxford-blue/12 px-4 py-3"
          />
        </div>

        <div className="rounded-[24px] border border-oxford-blue/8 bg-ivory px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-deep-gold">Recipients</p>
          <div className="mt-3 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-oxford-blue">
              <input
                type="radio"
                name="recipientMode"
                value="all"
                checked={recipientMode === 'all'}
                onChange={() => setRecipientMode('all')}
              />
              Send to all subscribers
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-oxford-blue">
              <input
                type="radio"
                name="recipientMode"
                value="manual"
                checked={recipientMode === 'manual'}
                onChange={() => setRecipientMode('manual')}
              />
              Send to selected emails
            </label>
          </div>

          <textarea
            name="recipients"
            rows={4}
            placeholder="one@example.com, two@example.com or one per line"
            disabled={recipientMode !== 'manual'}
            className="mt-4 w-full rounded-2xl border border-oxford-blue/12 bg-white px-4 py-3 disabled:cursor-not-allowed disabled:bg-zinc-100"
          />
          <p className="mt-2 text-xs leading-6 text-oxford-blue/55">
            For multiple people, choose the manual option and add emails separated by commas or new lines.
          </p>
        </div>

        {state.status !== 'idle' && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm ${
              state.status === 'success'
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-rose-200 bg-rose-50 text-rose-700'
            }`}
          >
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-ivory hover:bg-deep-gold hover:text-oxford-blue disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? 'Sending Broadcast...' : 'Send Email Broadcast'}
        </button>
      </div>
    </form>
  );
}
