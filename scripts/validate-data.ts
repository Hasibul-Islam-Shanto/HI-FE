import { topics } from '../data/index';
import type { Level, Topic } from '../types/question';

const VALID_LEVELS: Level[] = ['junior', 'middle', 'senior'];
const CODING_SLUG = 'coding';

const errors: string[] = [];

function error(message: string) {
  errors.push(message);
}

function validateTopic(topic: Topic) {
  if (!topic.slug.trim()) {
    error('Topic is missing a slug');
    return;
  }

  if (!topic.title.trim()) {
    error(`Topic "${topic.slug}" is missing a title`);
  }

  if (!topic.description.trim()) {
    error(`Topic "${topic.slug}" is missing a description`);
  }

  if (!topic.color.trim()) {
    error(`Topic "${topic.slug}" is missing a color`);
  }

  if (topic.questions.length === 0) {
    error(`Topic "${topic.slug}" has no questions`);
  }

  const seenIds = new Set<string>();

  topic.questions.forEach((question, index) => {
    const label = `${topic.slug} question #${index + 1} (${question.id || 'no id'})`;

    if (!question.id.trim()) {
      error(`${label}: missing id`);
      return;
    }

    if (seenIds.has(question.id)) {
      error(`${label}: duplicate id "${question.id}" within topic`);
    }
    seenIds.add(question.id);

    if (!question.id.startsWith(`${topic.slug}-`)) {
      error(`${label}: id "${question.id}" should start with "${topic.slug}-"`);
    }

    if (!question.question.trim()) {
      error(`${label}: missing question text`);
    }

    if (!VALID_LEVELS.includes(question.level)) {
      error(`${label}: invalid level "${question.level}"`);
    }

    if (!question.answer.trim()) {
      error(`${label}: missing answer`);
    }

    if (topic.slug === CODING_SLUG && !question.answer.includes('\n\n')) {
      error(
        `${label}: coding answers must contain a "\\n\\n" separator between explanation and code`
      );
    }
  });
}

const globalIds = new Set<string>();
const slugs = new Set<string>();

topics.forEach((topic) => {
  if (slugs.has(topic.slug)) {
    error(`Duplicate topic slug "${topic.slug}"`);
  }
  slugs.add(topic.slug);

  topic.questions.forEach((question) => {
    if (globalIds.has(question.id)) {
      error(`Duplicate global question id "${question.id}"`);
    }
    globalIds.add(question.id);
  });

  validateTopic(topic);
});

const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

if (errors.length > 0) {
  console.error(`Data validation failed with ${errors.length} error(s):\n`);
  errors.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(`Data validation passed: ${topics.length} topics, ${totalQuestions} questions.`);
