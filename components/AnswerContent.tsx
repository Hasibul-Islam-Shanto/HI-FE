'use client';

interface AnswerContentProps {
  answer: string;
  isCodingTopic: boolean;
}

export function AnswerContent({ answer, isCodingTopic }: AnswerContentProps) {
  if (isCodingTopic) {
    const separatorIndex = answer.indexOf('\n\n');
    if (separatorIndex !== -1) {
      const explanation = answer.slice(0, separatorIndex);
      const code = answer.slice(separatorIndex + 2);
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-text-secondary">{explanation}</p>
          <pre className="overflow-x-auto rounded-lg bg-code-bg border border-border p-4 text-sm leading-relaxed">
            <code className="font-mono text-text-primary">{code}</code>
          </pre>
        </div>
      );
    }
  }

  const parts = answer.split(/(`[^`]+`|<[a-zA-Z][a-zA-Z0-9-]*>|<\/[a-zA-Z][a-zA-Z0-9-]*>)/g);

  return (
    <p className="text-sm leading-relaxed text-text-secondary">
      {parts.map((part, i) => {
        if (
          (part.startsWith('`') && part.endsWith('`')) ||
          (part.startsWith('<') && part.endsWith('>'))
        ) {
          const display = part.startsWith('`') ? part.slice(1, -1) : part;
          return (
            <code
              key={i}
              className="rounded bg-surface-hover px-1.5 py-0.5 font-mono text-xs text-text-primary"
            >
              {display}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
