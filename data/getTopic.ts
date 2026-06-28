import type { Topic } from '@/types/question';

const topicLoaders: Record<string, () => Promise<Topic>> = {
  html: () => import('./html').then((m) => m.html),
  css: () => import('./css').then((m) => m.css),
  javascript: () => import('./javascript').then((m) => m.javascript),
  typescript: () => import('./typescript').then((m) => m.typescript),
  react: () => import('./react').then((m) => m.react),
  'react-native': () => import('./react-native').then((m) => m.reactNative),
  vue: () => import('./vue').then((m) => m.vue),
  nextjs: () => import('./nextjs').then((m) => m.nextjs),
  coding: () => import('./coding').then((m) => m.coding),
};

export const topicSlugs = Object.keys(topicLoaders);

export async function getTopic(slug: string): Promise<Topic | null> {
  const loader = topicLoaders[slug];
  if (!loader) return null;
  return loader();
}

export function isValidTopicSlug(slug: string): slug is keyof typeof topicLoaders {
  return slug in topicLoaders;
}
