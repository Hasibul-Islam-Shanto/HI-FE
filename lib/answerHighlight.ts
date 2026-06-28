const HTML_TAGS = new Set([
  'a', 'article', 'aside', 'audio', 'button', 'canvas', 'code', 'div', 'em',
  'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'iframe',
  'img', 'input', 'label', 'li', 'link', 'main', 'meta', 'nav', 'ol', 'p',
  'pre', 'script', 'section', 'select', 'span', 'strong', 'style', 'table',
  'tbody', 'td', 'textarea', 'th', 'thead', 'tr', 'ul', 'video',
]);

const CODE_KEYWORDS = new Set([
  'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'default', 'delete', 'do', 'else', 'export', 'extends', 'false', 'finally',
  'for', 'from', 'function', 'if', 'import', 'in', 'instanceof', 'let', 'new',
  'null', 'of', 'return', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
  'undefined', 'var', 'void', 'while', 'yield',
]);

export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'inline-code'; value: string }
  | { type: 'html-tag'; value: string }
  | { type: 'keyword'; value: string }
  | { type: 'string-literal'; value: string }
  | { type: 'css-property'; value: string };

export type CodeToken =
  | { type: 'plain'; value: string }
  | { type: 'comment'; value: string }
  | { type: 'string'; value: string }
  | { type: 'keyword'; value: string }
  | { type: 'function'; value: string }
  | { type: 'number'; value: string };

const MARKUP_PATTERN =
  /(`[^`]+`|<[a-zA-Z][a-zA-Z0-9-]*>|<\/[a-zA-Z][a-zA-Z0-9-]*>)/g;

const PROSE_HIGHLIGHT_PATTERN =
  /('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b[a-z]+(?:-[a-z0-9]+)+(?:\s*:\s*[a-z0-9#.%(),\s-]+)?\b|\b[a-z][a-z0-9]*[A-Z][a-zA-Z0-9]+\b|\b[A-Z][a-z]+(?:[A-Z][a-z]+)+\b|\b(?:header|nav|main|article|section|footer|div|span|useState|useEffect|useMemo|useCallback|useRef|useContext|Promise|React|TypeScript|JavaScript|localStorage|sessionStorage|JSON|DOM|SSR|CSR|SSG|ISR|SEO|API|HTTP|HTTPS|CSS|HTML)\b)/g;

const CODE_TOKEN_PATTERN =
  /(\/\/[^\n]*|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b)/g;

function classifyProseMatch(match: string): TextSegment['type'] {
  if (
    (match.startsWith("'") && match.endsWith("'")) ||
    (match.startsWith('"') && match.endsWith('"'))
  ) {
    return 'string-literal';
  }

  if (match.includes(':') && match.includes('-')) {
    return 'css-property';
  }

  if (HTML_TAGS.has(match.toLowerCase())) {
    return 'html-tag';
  }

  return 'keyword';
}

export function splitAnswerMarkup(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(MARKUP_PATTERN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push(...highlightProse(text.slice(lastIndex, index)));
    }

    const token = match[0];
    if (token.startsWith('`')) {
      segments.push({ type: 'inline-code', value: token.slice(1, -1) });
    } else {
      segments.push({ type: 'html-tag', value: token });
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    segments.push(...highlightProse(text.slice(lastIndex)));
  }

  return segments.length > 0 ? segments : highlightProse(text);
}

function highlightProse(text: string): TextSegment[] {
  if (!text) return [];

  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(PROSE_HIGHLIGHT_PATTERN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, index) });
    }

    segments.push({ type: classifyProseMatch(match[0]), value: match[0] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', value: text }];
}

function classifyCodeToken(value: string, nextChar: string | undefined): CodeToken {
  if (value.startsWith('//')) {
    return { type: 'comment', value };
  }

  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return { type: 'string', value };
  }

  if (/^\d/.test(value)) {
    return { type: 'number', value };
  }

  if (CODE_KEYWORDS.has(value)) {
    return { type: 'keyword', value };
  }

  if (nextChar === '(') {
    return { type: 'function', value };
  }

  return { type: 'plain', value };
}

export function tokenizeCode(code: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let lastIndex = 0;

  for (const match of code.matchAll(CODE_TOKEN_PATTERN)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, index) });
    }

    const value = match[0];
    const nextChar = code[index + value.length];
    tokens.push(classifyCodeToken(value, nextChar));
    lastIndex = index + value.length;
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) });
  }

  return tokens.length > 0 ? tokens : [{ type: 'plain', value: code }];
}

export function splitExplanation(text: string): TextSegment[] {
  return highlightProse(text);
}
