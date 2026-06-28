import { Topic } from '@/types/question';

export const nextjs: Topic = {
  slug: 'nextjs',
  title: 'Next.js',
  description: 'Rendering strategies, routing & server components.',
  color: '#fb7185',
  questions: [
    {
      id: 'nextjs-01',
      question: 'What is Next.js and what does it add on top of React?',
      level: 'junior',
      answer: 'Next.js is a React framework providing file-based routing, server-side rendering, static site generation, API routes, image and font optimization, and code splitting out of the box. React is a UI library; Next.js is a full production framework built on top of it.',
    },
    {
      id: 'nextjs-02',
      question: "What's the difference between SSR, SSG, CSR and ISR?",
      level: 'middle',
      answer: 'CSR means the browser fetches JavaScript and renders entirely client-side — slowest initial load, with no SEO benefit. SSR means the server renders HTML on every request, giving fresh data and good SEO at the cost of a slower time-to-first-byte. SSG means HTML is pre-generated entirely at build time — fastest, great for static content. ISR combines SSG with periodic revalidation, regenerating pages in the background after a set interval, combining speed with freshness.',
    },
    {
      id: 'nextjs-03',
      question: "What's the difference between App Router and Pages Router?",
      level: 'middle',
      answer: 'The legacy Pages Router uses a pages directory with data-fetching functions like getServerSideProps, and renders client components by default. The App Router, introduced in Next.js 13, uses an app directory with React Server Components by default, plus layouts, nested routing, streaming, and Server Actions. The App Router is the recommended approach for new projects, though it introduces a different mental model.',
    },
    {
      id: 'nextjs-04',
      question: "What's the difference between Server Components and Client Components?",
      level: 'middle',
      answer: 'Server Components, the default in the App Router, render on the server, can access databases or the filesystem directly, send zero JavaScript to the client, and cannot use hooks or browser APIs. Client Components, marked with a directive at the top of the file, run in the browser, support hooks, events, and browser APIs, but do send JavaScript to the client. The typical pattern is keeping data fetching in Server Components and interactivity in Client Components.',
    },
    {
      id: 'nextjs-05',
      question: 'How does file-based routing work?',
      level: 'junior',
      answer: 'In the App Router, every folder inside the app directory is a route segment. A page file makes that route accessible, and a layout file wraps its child routes. A loading file automatically shows a Suspense fallback, and an error file acts as an Error Boundary. Dynamic segments use bracket syntax in the folder name, and parenthesized route groups let you organize routes without affecting the resulting URL.',
    },
    {
      id: 'nextjs-06',
      question: 'How is a dynamic route created?',
      level: 'middle',
      answer: "Create a folder with a bracketed name representing the dynamic segment, and access that value through the page's params prop. A triple-dot prefix inside the brackets creates a catch-all route matching any depth, and double brackets make that catch-all optional. A dedicated function lets you pre-generate specific dynamic paths at build time for static generation.",
    },
    {
      id: 'nextjs-07',
      question: 'What is a Route Handler (API)?',
      level: 'middle',
      answer: "In the App Router, API routes are implemented as Route Handlers inside a route file, exporting named functions for each HTTP method like GET or POST. They replace the older API routes convention from the Pages Router, and use the standard web Request and Response objects rather than Node's traditional request/response objects.",
    },
    {
      id: 'nextjs-08',
      question: 'What does the next/image component provide?',
      level: 'junior',
      answer: 'It provides automatic image optimization: lazy loading by default, serving modern formats like WebP or AVIF, resizing to fit the viewport, and preventing layout shift when width, height, or a fill mode is specified. Images can be served from external origins once explicitly allowed in configuration. This significantly improves Core Web Vitals like LCP and CLS compared to a plain img tag.',
    },
    {
      id: 'nextjs-09',
      question: 'How is metadata/SEO set in App Router?',
      level: 'middle',
      answer: 'You export a metadata object, or an async function that generates metadata dynamically, from a page or layout file — covering things like title and description. Layouts can define title templates that wrap titles defined further down the tree, and the dynamic metadata function receives route params for per-page customization. This replaces the older head-management approach from the Pages Router.',
    },
    {
      id: 'nextjs-10',
      question: 'What is hydration?',
      level: 'middle',
      answer: 'Hydration is the process where React takes server-rendered HTML and attaches event listeners and state to it, making it interactive on the client. Without hydration, server-rendered pages would remain static. A mismatch between the server-rendered HTML and what the client would render causes warnings and bugs. Client Components go through hydration; Server Components don\'t, since they produce static HTML with no client-side JavaScript at all.',
    },
    {
      id: 'nextjs-11',
      question: 'How does next/link differ from a plain <a> tag?',
      level: 'junior',
      answer: "The framework's link component prefetches linked pages in the background once they become visible in the viewport, enabling near-instant navigation, and performs client-side routing without a full page reload. Use it for all internal navigation. A plain anchor tag causes a full HTTP request and page reload, which is appropriate for external links or file downloads.",
    },
    {
      id: 'nextjs-12',
      question: 'How does data fetching and caching work in App Router?',
      level: 'middle',
      answer: 'Server Components use the native fetch function extended with Next.js-specific caching options — a cache-everything mode behaves like static generation, a no-store mode behaves like server-side rendering on every request, and a revalidate option behaves like incremental static regeneration. Fetch calls are automatically deduplicated within a single request, and a separate caching helper can wrap non-fetch data sources like a database query or ORM call.',
    },
    {
      id: 'nextjs-13',
      question: 'What is Partial Prerendering (PPR)?',
      level: 'senior',
      answer: 'Partial Prerendering, an experimental feature from Next.js 14 onward, combines static and dynamic rendering within a single page: the static shell, like layout and navigation, is pre-rendered at build time, while dynamic parts stream in as they resolve, wrapped in Suspense boundaries. This gives a near-instant static shell alongside fresh dynamic content, without having to choose one rendering strategy for an entire page.',
    },
    {
      id: 'nextjs-14',
      question: 'Server Actions and security?',
      level: 'senior',
      answer: "Server Actions are async functions marked with a directive that run on the server and can be called directly from client components — forms or event handlers — without writing a separate API route. Under the hood, they effectively create POST endpoints. Because of this, you should always validate and sanitize their input, treat them like public API endpoints, include authentication checks, and remember that they're automatically exposed over the network.",
    },
    {
      id: 'nextjs-15',
      question: 'Middleware and Edge runtime — when to use?',
      level: 'senior',
      answer: "Middleware, defined in a file at the project root, runs before every matched request on the Edge runtime, which is based on a lightweight JavaScript engine without Node-specific APIs. It's commonly used for authentication redirects, A/B testing, geolocation-based routing, and manipulating request or response headers. The Edge runtime is globally distributed with extremely fast cold starts, but isn't suitable for heavy computation or Node-specific APIs.",
    },
    {
      id: 'nextjs-16',
      question: 'next/cache: unstable_cache, revalidateTag, revalidatePath?',
      level: 'senior',
      answer: "A caching helper wraps any async function, like a database query or external API call, with Next.js's caching system and an associated set of tags. Invalidating a tag clears every cache entry associated with it on demand — for example after a CMS webhook fires. A separate function invalidates all cached entries tied to a specific route path instead. Both are typically called from Server Actions or Route Handlers.",
    },
    {
      id: 'nextjs-17',
      question: 'Streaming SSR and loading.tsx/error.tsx?',
      level: 'senior',
      answer: 'Streaming SSR sends HTML to the browser progressively using React Suspense — the page shell renders immediately, and content streams in as each piece resolves. A loading file is automatically wrapped in a Suspense boundary and shown as a fallback while a page or layout is loading. An error file acts as an Error Boundary scoped to its route segment. Together these enable much better perceived performance, avoiding an all-or-nothing blocking render.',
    },
  ],
};
