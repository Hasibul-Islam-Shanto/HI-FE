import { Topic } from '@/types/question';

export const coding: Topic = {
  slug: 'coding',
  title: 'Coding',
  description: 'Practical questions: writing functions, algorithms & mini-tasks.',
  color: '#0dc5aa',
  questions: [
    {
      id: 'coding-01',
      question: 'Closure: write a counter function',
      level: 'middle',
      answer: `A counter is created with a private count variable closed over by the returned object's methods, so increment and decrement can mutate it while staying inaccessible from outside.

function makeCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}`,
    },
    {
      id: 'coding-02',
      question: 'Write a debounce function',
      level: 'middle',
      answer: `Each call clears the previous timer and starts a new one, so the wrapped function only fires once the calls stop for the given delay.

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
    },
    {
      id: 'coding-03',
      question: 'Write a throttle function',
      level: 'middle',
      answer: `A timestamp tracks the last call; new calls within the limit window are ignored, ensuring the function runs at most once per interval.

function throttle(fn, limit) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= limit) {
      last = now;
      return fn.apply(this, args);
    }
  };
}`,
    },
    {
      id: 'coding-04',
      question: 'Write a flatten function for nested arrays',
      level: 'middle',
      answer: `The function recursively concatenates nested arrays into the accumulator until everything is one level deep.

function flatten(arr) {
  return arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)),
    []
  );
}
// Native alternative: arr.flat(Infinity)`,
    },
    {
      id: 'coding-05',
      question: 'Implement Array.prototype.map by hand',
      level: 'middle',
      answer: `The custom implementation loops over every index, calling the callback with the element, its index, and the original array, pushing each result into a new array.

Array.prototype.myMap = function (cb) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }
  return result;
};`,
    },
    {
      id: 'coding-06',
      question: 'Write a curry function',
      level: 'middle',
      answer: `Arguments accumulate across calls until enough have been supplied to match the original function's arity, at which point it finally executes.

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return function (...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}`,
    },
    {
      id: 'coding-07',
      question: 'Write a memoize (caching) function',
      level: 'middle',
      answer: `Arguments are serialized into a cache key; if that key has been seen before, the cached result is returned instead of recomputing.

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
    },
    {
      id: 'coding-08',
      question: 'Write a Promise-based sleep function',
      level: 'junior',
      answer: `The function returns a Promise that resolves after a setTimeout delay, letting async code pause execution with await.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Usage: await sleep(1000)`,
    },
    {
      id: 'coding-09',
      question: 'Find indices of two numbers whose sum equals a target (Two Sum)',
      level: 'middle',
      answer: `A hash map stores each visited number's index; for every new number, check if its complement was already seen.

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// O(n) time with a hash map`,
    },
    {
      id: 'coding-10',
      question: 'Write a palindrome checker function',
      level: 'junior',
      answer: `The string is lowercased and stripped of non-alphanumeric characters, then compared against its own reverse.

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}`,
    },
    {
      id: 'coding-11',
      question: 'Implement Function.bind by hand (myBind)',
      level: 'middle',
      answer: `The returned function calls the original with a fixed context and any preset arguments concatenated with new ones supplied at call time.

Function.prototype.myBind = function (context, ...preset) {
  const fn = this;
  return function (...args) {
    return fn.apply(context, [...preset, ...args]);
  };
};`,
    },
    {
      id: 'coding-12',
      question: 'Write compose and pipe functions',
      level: 'middle',
      answer: `compose applies functions right-to-left and pipe applies left-to-right, both built by reducing over the function list with the running value as the accumulator.

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);`,
    },
    {
      id: 'coding-13',
      question: 'Write a simple EventEmitter class',
      level: 'middle',
      answer: `Listeners are stored per event name in an object; emitting an event calls every registered listener for that name with the given arguments.

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] ||= []).push(listener);
    return this;
  }
  off(event, listener) {
    this.events[event] = (this.events[event] || []).filter((l) => l !== listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach((l) => l(...args));
  }
}`,
    },
    {
      id: 'coding-14',
      question: 'Find a duplicate element in an array',
      level: 'junior',
      answer: `A Set tracks every value seen so far; the first value that's already in the set is the duplicate.

function findDuplicate(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return item;
    seen.add(item);
  }
  return null;
}`,
    },
    {
      id: 'coding-15',
      question: 'Write a deep clone function (without JSON)',
      level: 'middle',
      answer: `The function recurses into arrays and objects, cloning each nested value individually, while returning primitives unchanged.

function deepClone(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => [k, deepClone(v)])
  );
}
// For production use, prefer structuredClone()`,
    },
    {
      id: 'coding-16',
      question: 'Write an anagram checker function',
      level: 'junior',
      answer: `Both strings are normalized, sorted character by character, and compared for equality.

function isAnagram(a, b) {
  const sort = (s) => s.toLowerCase().replace(/\\s/g, '').split('').sort().join('');
  return sort(a) === sort(b);
}`,
    },
    {
      id: 'coding-17',
      question: 'Write a fetch retry function',
      level: 'middle',
      answer: `The function retries the fetch call on failure up to a limit, waiting an exponentially increasing delay between attempts.

async function fetchWithRetry(url, options, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(delay * 2 ** i); // exponential backoff
    }
  }
}`,
    },
    {
      id: 'coding-18',
      question: 'Write a capitalize function (first letter of each word)',
      level: 'junior',
      answer: `A regex matches the first character at every word boundary and replaces it with its uppercase form.

const capitalize = (str) => str.replace(/\\b\\w/g, (c) => c.toUpperCase());`,
    },
    {
      id: 'coding-19',
      question: 'Implement LRU Cache',
      level: 'senior',
      answer: `A Map's insertion order is used to track recency: reading or writing a key moves it to the end, and exceeding capacity evicts the oldest (first) entry.

class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, val) {
    this.map.delete(key);
    this.map.set(key, val);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
  }
}`,
    },
    {
      id: 'coding-20',
      question: 'Promise.all vs Promise.allSettled vs Promise.race?',
      level: 'senior',
      answer: `All three accept an array of promises but behave differently on rejection and resolution.

// Promise.all: resolves when ALL resolve, rejects immediately on first rejection
// Promise.allSettled: waits for ALL to settle, returns {status, value/reason} per item
// Promise.race: settles as soon as the FIRST promise settles, either way`,
    },
    {
      id: 'coding-21',
      question: 'Implement a task queue (async)',
      level: 'senior',
      answer: `Tasks are pushed into an array and a single running loop processes them one at a time, awaiting each before starting the next.

class TaskQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }
  add(task) {
    this.queue.push(task);
    if (!this.running) this.run();
  }
  async run() {
    this.running = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.running = false;
  }
}`,
    },
    {
      id: 'coding-22',
      question: 'Implement binary search',
      level: 'senior',
      answer: `The search range halves on each iteration by comparing the middle element against the target, narrowing toward the answer in logarithmic time.

function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    },
    {
      id: 'coding-23',
      question: 'Implement DOM event delegation',
      level: 'senior',
      answer: `A single listener on the parent checks whether the event's target matches a selector using closest(), then invokes the handler only if so.

function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function (e) {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}`,
    },
    {
      id: 'coding-24',
      question: 'Write a simple Observable / RxJS-style stream',
      level: 'senior',
      answer: `A minimal push-based stream wraps a subscribe function, supports mapping over emitted values by composing a new Observable, and offers a static helper to emit a fixed set of values synchronously.

class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  subscribe(observer) {
    return this._subscribe(observer);
  }
  map(fn) {
    return new Observable((obs) =>
      this.subscribe({
        next: (v) => obs.next(fn(v)),
        error: (e) => obs.error(e),
        complete: () => obs.complete(),
      })
    );
  }
  static of(...values) {
    return new Observable((obs) => {
      values.forEach((v) => obs.next(v));
      obs.complete();
    });
  }
}`,
    },
  ],
};
