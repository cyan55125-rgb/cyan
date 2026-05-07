import type { VocabularyItem } from '@/types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function calculateNextReview(
  masteryLevel: number,
  reviewCount: number,
  correct: boolean
): number {
  if (!correct) {
    return Date.now() + ONE_DAY_MS;
  }

  const baseInterval = reviewCount === 0 ? 1 : Math.pow(2, reviewCount);
  const adjustedInterval = baseInterval / Math.max(masteryLevel, 1);
  const intervalDays = Math.max(1, Math.round(adjustedInterval));

  return Date.now() + intervalDays * ONE_DAY_MS;
}

export function getReviewQueue(vocabList: VocabularyItem[]): VocabularyItem[] {
  const now = Date.now();

  return vocabList
    .filter((item) => new Date(item.nextReviewAt).getTime() <= now)
    .sort((a, b) => {
      const overdueA = now - new Date(a.nextReviewAt).getTime();
      const overdueB = now - new Date(b.nextReviewAt).getTime();
      const priorityA = overdueA / (a.reviewCount + 1);
      const priorityB = overdueB / (b.reviewCount + 1);
      return priorityB - priorityA;
    });
}
