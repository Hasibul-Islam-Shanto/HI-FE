'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-text-primary">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-text-secondary">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-aurora-indigo px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
