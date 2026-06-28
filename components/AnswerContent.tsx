import {
  splitAnswerMarkup,
  splitExplanation,
  tokenizeCode,
  type CodeToken,
  type TextSegment,
} from '@/lib/answerHighlight';

interface AnswerContentProps {
  answer: string;
  isCodingTopic: boolean;
}

function segmentClassName(type: TextSegment['type']): string {
  switch (type) {
    case 'inline-code':
      return 'answer-inline-code';
    case 'html-tag':
      return 'answer-html-tag';
    case 'keyword':
      return 'answer-keyword';
    case 'string-literal':
      return 'answer-string';
    case 'css-property':
      return 'answer-css';
    default:
      return '';
  }
}

function HighlightedText({ text }: { text: string }) {
  const segments = splitAnswerMarkup(text);

  return (
    <p className="text-sm leading-relaxed text-text-secondary">
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.value}</span>;
        }

        const className = segmentClassName(segment.type);
        const Tag = segment.type === 'html-tag' ? 'code' : 'mark';

        return (
          <Tag key={index} className={className}>
            {segment.value}
          </Tag>
        );
      })}
    </p>
  );
}

function codeTokenClassName(type: CodeToken['type']): string {
  switch (type) {
    case 'comment':
      return 'code-token-comment';
    case 'string':
      return 'code-token-string';
    case 'keyword':
      return 'code-token-keyword';
    case 'function':
      return 'code-token-function';
    case 'number':
      return 'code-token-number';
    default:
      return 'code-token-plain';
  }
}

function HighlightedCodeBlock({ code }: { code: string }) {
  const lines = code.split('\n');

  return (
    <pre
      aria-label="Code example"
      className="answer-code-block overflow-x-auto rounded-lg border border-code-border p-4 text-sm leading-relaxed"
    >
      <code className="font-mono">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block whitespace-pre">
            {tokenizeCode(line).map((token, tokenIndex) => (
              <span key={tokenIndex} className={codeTokenClassName(token.type)}>
                {token.value}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function AnswerContent({ answer, isCodingTopic }: AnswerContentProps) {
  if (isCodingTopic) {
    const separatorIndex = answer.indexOf('\n\n');
    if (separatorIndex !== -1) {
      const explanation = answer.slice(0, separatorIndex);
      const code = answer.slice(separatorIndex + 2);

      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-text-secondary">
            {splitExplanation(explanation).map((segment, index) => {
              if (segment.type === 'text') {
                return <span key={index}>{segment.value}</span>;
              }

              const className = segmentClassName(segment.type);
              const Tag = segment.type === 'html-tag' ? 'code' : 'mark';

              return (
                <Tag key={index} className={className}>
                  {segment.value}
                </Tag>
              );
            })}
          </p>
          <HighlightedCodeBlock code={code} />
        </div>
      );
    }
  }

  return <HighlightedText text={answer} />;
}
