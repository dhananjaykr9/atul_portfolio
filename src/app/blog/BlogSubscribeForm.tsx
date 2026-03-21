'use client';

import { useActionState } from 'react';
import { subscribeToBlogUpdates, type BlogSubscriptionState } from '@/app/blog/actions';

export default function BlogSubscribeForm() {
  const initialState: BlogSubscriptionState = {
    status: 'idle',
    message: '',
  };

  const [state, formAction, pending] = useActionState(
    subscribeToBlogUpdates,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email for new essays"
          className="min-w-0 flex-1 rounded-2xl border border-white/14 bg-white/10 px-5 py-4 text-sm text-ivory placeholder:text-ivory/45 focus:border-deep-gold/55 focus:outline-none focus:ring-2 focus:ring-deep-gold/20"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-2xl bg-deep-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.24em] text-oxford-blue transition hover:bg-[#d3b16c] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? 'Saving...' : 'Subscribe'}
        </button>
      </div>

      {state.status !== 'idle' && (
        <p
          className={`rounded-2xl px-4 py-3 text-sm ${
            state.status === 'success'
              ? 'border border-emerald-300/30 bg-emerald-500/10 text-emerald-100'
              : 'border border-rose-300/30 bg-rose-500/10 text-rose-100'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
