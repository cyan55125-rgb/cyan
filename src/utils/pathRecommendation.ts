import type { Course, ProficiencyLevel } from '@/types';

interface RecommendationWeights {
  levelMatch: number;
  weakAreaBoost: number;
  continuity: number;
  interest: number;
}

function calculateLevelScore(
  courseLevel: ProficiencyLevel,
  userLevel: ProficiencyLevel
): number {
  const levels: ProficiencyLevel[] = ['beginner', 'intermediate', 'advanced'];
  const courseIdx = levels.indexOf(courseLevel);
  const userIdx = levels.indexOf(userLevel);
  const distance = Math.abs(courseIdx - userIdx);
  return Math.max(0, 1 - distance * 0.4);
}

function calculateWeakAreaScore(
  course: Course,
  weakAreas: string[]
): number {
  if (weakAreas.length === 0) return 0.5;
  const matchCount = weakAreas.filter((area) =>
    course.title.toLowerCase().includes(area.toLowerCase()) ||
    course.description.toLowerCase().includes(area.toLowerCase())
  ).length;
  return Math.min(1, matchCount / weakAreas.length);
}

function calculateContinuityScore(
  _course: Course,
  completedCourses: string[]
): number {
  if (completedCourses.length === 0) return 0.3;
  return 0.5;
}

function calculateInterestScore(
  course: Course,
  interests: string[]
): number {
  if (interests.length === 0) return 0.5;
  const matchCount = interests.filter((interest) =>
    course.title.toLowerCase().includes(interest.toLowerCase()) ||
    course.description.toLowerCase().includes(interest.toLowerCase())
  ).length;
  return Math.min(1, matchCount / Math.max(interests.length, 1));
}

export function recommendPath(
  userLevel: ProficiencyLevel,
  weakAreas: string[],
  interests: string[],
  allCourses: Course[],
  completedCourseIds: string[] = []
): string[] {
  const weights: RecommendationWeights = {
    levelMatch: 0.4,
    weakAreaBoost: 0.3,
    continuity: 0.2,
    interest: 0.1,
  };

  const scored = allCourses
    .filter((course) => !completedCourseIds.includes(course.id))
    .map((course) => {
      const levelScore = calculateLevelScore(course.level, userLevel);
      const weakAreaScore = calculateWeakAreaScore(course, weakAreas);
      const continuityScore = calculateContinuityScore(course, completedCourseIds);
      const interestScore = calculateInterestScore(course, interests);

      const totalScore =
        levelScore * weights.levelMatch +
        weakAreaScore * weights.weakAreaBoost +
        continuityScore * weights.continuity +
        interestScore * weights.interest;

      return { course, totalScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return scored.map((s) => s.course.id);
}
