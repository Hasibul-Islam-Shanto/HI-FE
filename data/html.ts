import { Topic } from '@/types/question';

export const html: Topic = {
  slug: 'html',
  title: 'HTML',
  description: 'Structure, semantics & browser basics.',
  color: '#6366f1',
  questions: [
    {
      id: 'html-01',
      question: 'What is semantic HTML and why is it needed?',
      level: 'junior',
      answer: 'Semantic tags (header, nav, main, article, section, footer) convey meaning from their names and describe the role of content. Benefit: better SEO, understandable structure for screen readers (accessibility), easier code reading. A generic div carries no meaning at all.',
    },
    {
      id: 'html-02',
      question: "What's the difference between block and inline elements?",
      level: 'junior',
      answer: 'Block elements (div, p, h1-h6, section, ul) start on a new line and take up full available width. Inline elements (span, a, strong, em) flow within text and only take up as much width as their content.',
    },
    {
      id: 'html-03',
      question: 'What is the difference between id and class?',
      level: 'junior',
      answer: 'id must be unique on a page (used for one element). class can be applied to multiple elements. id has higher specificity in CSS. Use id for unique elements (e.g., anchors, JS targeting), class for reusable styles.',
    },
    {
      id: 'html-04',
      question: 'What are data-* attributes used for?',
      level: 'junior',
      answer: 'They store custom data on HTML elements accessible via JavaScript (element.dataset.myValue). Useful for embedding metadata without abusing class or id — e.g., data-id="42" data-role="admin".',
    },
    {
      id: 'html-05',
      question: "What's the difference between defer and async script attributes?",
      level: 'middle',
      answer: 'Both load the script without blocking HTML parsing. defer: executes after HTML is fully parsed, in order. async: executes as soon as it downloads, possibly out of order. Use defer for scripts that depend on DOM or each other; async for independent scripts (e.g., analytics).',
    },
    {
      id: 'html-06',
      question: "What's the difference between localStorage, sessionStorage and cookies?",
      level: 'middle',
      answer: 'localStorage: persistent storage per origin, survives page reload and browser restart (~5MB). sessionStorage: cleared when the tab/window closes. Cookies: sent to the server with every request, can be set with expiry, HttpOnly, Secure flags (~4KB). Use localStorage for client state, cookies for auth tokens (HttpOnly).',
    },
    {
      id: 'html-07',
      question: 'How is label linked to input in a form and why?',
      level: 'middle',
      answer: 'Via the for attribute matching the input\'s id: a label with for="email" paired with an input id="email". Or by wrapping the input inside the label element directly. Clicking the label focuses the input — critical for accessibility (screen readers, larger click targets).',
    },
    {
      id: 'html-08',
      question: 'What does the meta viewport tag do?',
      level: 'junior',
      answer: 'A meta viewport tag with content width=device-width, initial-scale=1 tells mobile browsers to set the viewport width equal to the device width and not to zoom out by default. Without it, mobile browsers render the page as a ~980px desktop view and scale it down.',
    },
    {
      id: 'html-09',
      question: 'Why is the alt attribute necessary?',
      level: 'junior',
      answer: 'alt provides a text alternative for images: shown when the image fails to load, read by screen readers for accessibility, and indexed by search engines (SEO). An empty alt tells screen readers to skip decorative images.',
    },
    {
      id: 'html-10',
      question: 'What do srcset and picture provide for responsive images?',
      level: 'middle',
      answer: 'srcset lets the browser pick the most appropriate image size based on screen resolution/width, listing multiple image candidates with widths and a sizes attribute describing layout breakpoints. The picture element allows art direction — showing completely different images at different breakpoints using source elements with media conditions.',
    },
    {
      id: 'html-11',
      question: 'What does DOCTYPE do?',
      level: 'junior',
      answer: 'The doctype declaration tells the browser to render the page in standards mode (vs. quirks mode, which emulates old IE behavior). Without it, some browsers apply inconsistent CSS and layout rules.',
    },
    {
      id: 'html-12',
      question: 'What are ARIA attributes and when are they needed?',
      level: 'middle',
      answer: "ARIA (Accessible Rich Internet Applications) attributes (role, aria-label, aria-hidden, aria-expanded, etc.) supplement or override HTML semantics for screen readers. Use them when native HTML elements aren't sufficient — e.g., custom dropdowns, modals, tab panels. Prefer native HTML semantics first.",
    },
    {
      id: 'html-13',
      question: 'What is the difference between section and article?',
      level: 'middle',
      answer: "article is self-contained and independently distributable (blog post, news article, comment). section is a thematic grouping of related content, typically with a heading, that doesn't make sense standalone. Use article inside section or vice versa depending on context.",
    },
    {
      id: 'html-14',
      question: 'How does a browser render a page (briefly)?',
      level: 'middle',
      answer: 'Parse HTML to build the DOM. Parse CSS to build the CSSOM. Combine them into a Render Tree. Layout calculates positions and sizes. Paint draws pixels. Composite handles GPU layering. JavaScript can block or modify this pipeline at various stages.',
    },
    {
      id: 'html-15',
      question: 'When do you need Shadow DOM and Web Components?',
      level: 'senior',
      answer: "Web Components (Custom Elements + Shadow DOM + HTML Templates) let you create reusable encapsulated elements native to the browser. Shadow DOM provides style and DOM encapsulation — styles inside don't leak out and vice versa. Useful for design systems, embeddable widgets, or framework-agnostic components.",
    },
    {
      id: 'html-16',
      question: 'What is Content Security Policy (CSP) and how does it work?',
      level: 'senior',
      answer: 'CSP is an HTTP response header that tells the browser which sources are allowed for scripts, styles, images, etc. It mitigates XSS attacks by blocking inline scripts and unauthorized domains. A typical policy restricts default sources to self and allows scripts only from self and a specific trusted CDN.',
    },
    {
      id: 'html-17',
      question: "What's the difference between prefetch, preload and preconnect?",
      level: 'senior',
      answer: 'preload: loads a critical resource for the current page ASAP (e.g., fonts, hero image). prefetch: low-priority load of resources needed for the next navigation. preconnect: establishes a connection (DNS + TCP + TLS) to an origin early, without fetching anything yet — useful for third-party domains.',
    },
    {
      id: 'html-18',
      question: 'What does the iframe sandbox attribute provide?',
      level: 'senior',
      answer: 'sandbox restricts what an iframe can do: by default it disables scripts, forms, popups, same-origin access. You selectively re-enable capabilities by listing allowed features such as allow-scripts or allow-same-origin. Essential for securely embedding untrusted content.',
    },
  ],
};
