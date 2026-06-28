'use client';

import { useRef } from 'react';
import { useProgressStore } from '@/store/useProgressStore';

export function ProgressTools() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const known = useProgressStore((s) => s.known);
  const importProgress = useProgressStore((s) => s.importProgress);

  const handleExport = () => {
    const data = JSON.stringify({ known, version: 1 }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'frontend-interview-progress.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as {
          known?: Record<string, string[]>;
        };
        if (parsed.known && typeof parsed.known === 'object') {
          importProgress(parsed.known);
        }
      } catch {
        window.alert('Could not import progress. Please use a valid export file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        Export progress
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        Import progress
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleImport}
        className="sr-only"
        aria-label="Import progress file"
      />
    </div>
  );
}
