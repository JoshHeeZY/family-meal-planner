"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--cream)] print:hidden"
    >
      {label}
    </button>
  );
}
