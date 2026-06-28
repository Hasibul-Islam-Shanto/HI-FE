import { Topic } from '@/types/question';

export const vue: Topic = {
  slug: 'vue',
  title: 'Vue',
  description: 'Reactivity, Composition API & directives.',
  color: '#10b981',
  questions: [
    {
      id: 'vue-01',
      question: 'What is Vue and what is the basis of its reactivity?',
      level: 'junior',
      answer: 'Vue is a progressive JavaScript framework for building UIs. In Vue 3, reactivity is based on the ES6 Proxy object — when you access or mutate reactive state, Vue intercepts those operations to track dependencies (who reads the data) and trigger updates (re-rendering whatever depends on it). Vue 2 used a different, more limited mechanism for the same purpose.',
    },
    {
      id: 'vue-02',
      question: "What's the difference between ref and reactive (Composition API)?",
      level: 'middle',
      answer: "ref wraps any value, primitive or object, in a reactive container accessed through a value property in JavaScript, automatically unwrapped in templates. reactive makes a plain object deeply reactive directly, but it can't be used with primitives. Many developers prefer using ref everywhere for consistency and flexibility.",
    },
    {
      id: 'vue-03',
      question: "What's the difference between computed, methods and watch?",
      level: 'middle',
      answer: 'computed produces a cached derived value that only recomputes when its dependencies change. methods are plain functions that re-run every time they\'re called, with no caching. watch is a side-effect runner that reacts to data changes and runs imperative logic, like an API call or DOM manipulation. Use computed for derived data, watch for async or side-effecty work.',
    },
    {
      id: 'vue-04',
      question: "What's the difference between v-if and v-show?",
      level: 'junior',
      answer: 'v-if conditionally renders the element, actually adding and removing it from the DOM. v-show always renders the element but toggles its display style. Use v-if when a condition changes rarely, and v-show when toggling frequently, since it avoids the cost of re-creating the element each time.',
    },
    {
      id: 'vue-05',
      question: 'What are v-for and :key for?',
      level: 'junior',
      answer: "v-for renders a list by iterating over an array or object directly in the template. The key binding gives each rendered item a stable identity so Vue can efficiently diff and patch the DOM — similar to React's key prop. Always use a unique, stable ID rather than the array index if the list can change order or size.",
    },
    {
      id: 'vue-06',
      question: 'How does communication via props and emit work?',
      level: 'middle',
      answer: 'Props let a parent pass data down to a child, declared explicitly inside the child component. emit lets a child send events back up to a parent, declared similarly and invoked with an event name and optional payload. The parent listens for that event on the child element. This is the standard unidirectional data flow pattern in Vue.',
    },
    {
      id: 'vue-07',
      question: 'What are Vue lifecycle hooks?',
      level: 'middle',
      answer: 'In the Composition API, hooks exist for before and after mounting, before and after updates, and before and after unmounting. The mounted hook is the rough equivalent of an effect with an empty dependency array in React, and the unmounted hook handles cleanup like timers or subscriptions. The setup function itself runs before any lifecycle hook fires.',
    },
    {
      id: 'vue-08',
      question: 'How does v-model work?',
      level: 'middle',
      answer: 'v-model is syntactic sugar that combines a bound value prop with an update event handler. On a custom component, this expands to passing a model value prop down and listening for an update event back up — equivalent in effect to manually wiring both halves yourself. In Vue 3, components can support multiple named v-model bindings simultaneously.',
    },
    {
      id: 'vue-09',
      question: 'What are slots for?',
      level: 'middle',
      answer: "Slots let a parent component inject content into a child's template — the child defines a placeholder, and the parent fills it with whatever markup it wants. A default slot is the simplest case; named slots allow multiple distinct injection points; and scoped slots let the child pass data back to the parent's slot content. Essential for building flexible, reusable layout components.",
    },
    {
      id: 'vue-10',
      question: "What's the difference between Options API and Composition API?",
      level: 'middle',
      answer: 'The Options API organizes a component\'s code by option type — data, computed, methods, lifecycle hooks — inside a single object, which is familiar and works well for simple components. The Composition API organizes code by feature or concern instead, which scales better for complex components, makes logic reuse easier through composable functions, and integrates more cleanly with TypeScript. Both remain fully supported, with Composition API recommended for new Vue 3 code.',
    },
    {
      id: 'vue-11',
      question: 'What is Pinia / store for?',
      level: 'middle',
      answer: "Pinia is Vue's official state management library, the successor to Vuex. Use it when multiple components need to share and synchronize state that doesn't fit neatly into a simple parent-child component hierarchy. Stores are defined with state, getters (similar to computed properties), and actions, and Pinia is lightweight, fully typed, and integrates with devtools.",
    },
    {
      id: 'vue-12',
      question: 'Reactivity: Proxy vs defineProperty (Vue 2 vs 3)?',
      level: 'senior',
      answer: "Vue 2's reactivity mechanism could not detect new property additions, deletions, or array index changes without an explicit workaround. Vue 3's Proxy-based approach intercepts essentially all operations on an object natively, with no such limitations — it works seamlessly with arrays, maps, sets, and nested objects out of the box, and it's also faster and simpler overall.",
    },
    {
      id: 'vue-13',
      question: 'effectScope and composable lifecycle?',
      level: 'senior',
      answer: 'effectScope creates a scope that groups together reactive effects like watchers and computed values. Stopping that scope disposes of every effect inside it at once, which is ideal for plugins or composables that manage many effects internally. A related hook lets you register cleanup logic that runs when the scope is stopped, helping avoid memory leaks in complex composables.',
    },
    {
      id: 'vue-14',
      question: 'Teleport, Suspense and async setup?',
      level: 'senior',
      answer: "Teleport renders a component's DOM output outside its normal place in the parent hierarchy — commonly used for modals or tooltips that need to render directly under the body. Suspense waits for an async setup function or async component to resolve, showing a fallback in the meantime, similar in spirit to React's Suspense. The two are often combined for async modal-style components: teleporting the markup to the body while a Suspense boundary handles the loading state.",
    },
    {
      id: 'vue-15',
      question: 'When to choose Provide/inject vs Pinia?',
      level: 'senior',
      answer: 'Provide and inject pass data or services down through a component subtree without prop drilling, scoped only to that subtree — useful for design systems or plugin-like dependencies. Pinia is meant for genuinely global, cross-tree application state that\'s persisted, visible in devtools, and modified through defined actions. Use provide/inject for localized concerns, and Pinia for things like authentication, a shopping cart, or user preferences that are needed app-wide.',
    },
    {
      id: 'vue-16',
      question: 'Vue performance: v-memo, shallowRef, markRaw?',
      level: 'senior',
      answer: 'A v-memo directive with a list of dependencies skips re-rendering a subtree if none of those dependencies have changed, similar in spirit to React.memo for templates. shallowRef makes only the top-level value assignment reactive, not deep mutations within the object, which is cheaper for large objects. markRaw marks an object so Vue never wraps it in reactivity at all — useful for third-party class instances like chart or 3D library objects, avoiding unnecessary proxy overhead.',
    },
  ],
};
