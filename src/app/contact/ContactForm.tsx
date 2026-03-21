'use client';

import { useActionState } from 'react';
import {
  initialContactFormState,
  submitContactForm,
} from '@/app/contact/actions';
import Button from '@/components/Button';

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialContactFormState
  );

  return (
    <form action={formAction} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div className="space-y-3">
          <label className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/40">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Rahul Sharma"
            className="w-full rounded-2xl border border-oxford-blue/10 bg-ivory/30 px-5 py-4 font-sans text-oxford-blue placeholder-oxford-blue/20 transition-all focus:border-deep-gold/50 focus:outline-none focus:ring-2 focus:ring-deep-gold/30 sm:px-6"
          />
        </div>
        <div className="space-y-3">
          <label className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/40">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="rahul@example.com"
            className="w-full rounded-2xl border border-oxford-blue/10 bg-ivory/30 px-5 py-4 font-sans text-oxford-blue placeholder-oxford-blue/20 transition-all focus:border-deep-gold/50 focus:outline-none focus:ring-2 focus:ring-deep-gold/30 sm:px-6"
          />
        </div>
      </div>
      <div className="space-y-3">
        <label className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/40">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          required
          placeholder="Academic Inquiry"
          className="w-full rounded-2xl border border-oxford-blue/10 bg-ivory/30 px-5 py-4 font-sans text-oxford-blue placeholder-oxford-blue/20 transition-all focus:border-deep-gold/50 focus:outline-none focus:ring-2 focus:ring-deep-gold/30 sm:px-6"
        />
      </div>
      <div className="space-y-3">
        <label className="ml-2 text-[10px] font-bold uppercase tracking-[0.2em] text-oxford-blue/40">
          Your Message
        </label>
        <textarea
          rows={6}
          name="message"
          required
          placeholder="Detailed message here..."
          className="w-full resize-none rounded-2xl border border-oxford-blue/10 bg-ivory/30 px-5 py-4 font-sans text-oxford-blue placeholder-oxford-blue/20 transition-all focus:border-deep-gold/50 focus:outline-none focus:ring-2 focus:ring-deep-gold/30 sm:px-6"
        ></textarea>
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

      <Button
        variant="primary"
        size="lg"
        className="mt-4 w-full rounded-2xl py-4 shadow-xl shadow-deep-gold/20 transition-transform hover:scale-[1.02] sm:mt-6 sm:py-5 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={pending}
      >
        {pending ? 'Submitting...' : 'Submit Message'}
      </Button>
    </form>
  );
}
