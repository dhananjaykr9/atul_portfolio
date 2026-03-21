'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function SaveButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-oxford-blue px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ivory transition hover:bg-deep-gold hover:text-oxford-blue disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

export function ResearchRecordEditor({
  title,
  meta,
  editLabel,
  updateAction,
  children,
  deleteSlot,
}: {
  title: string;
  meta: string;
  editLabel: string;
  updateAction: (formData: FormData) => Promise<void>;
  children: ReactNode;
  deleteSlot?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setPending(true);

    try {
      await updateAction(formData);
      setOpen(false);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="rounded-2xl bg-ivory px-4 py-4"
    >
      <summary className="cursor-pointer list-none">
        <p className="font-bold text-oxford-blue">{title}</p>
        <p className="mt-1 text-sm text-oxford-blue/60">{meta}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-deep-gold">{editLabel}</p>
      </summary>
      <form action={handleSubmit} className="mt-4 space-y-3 text-sm">
        {children}
        <div className="flex items-center justify-between gap-3">
          <SaveButton pending={pending} />
        </div>
      </form>
      {deleteSlot ? <div className="mt-3">{deleteSlot}</div> : null}
    </details>
  );
}
