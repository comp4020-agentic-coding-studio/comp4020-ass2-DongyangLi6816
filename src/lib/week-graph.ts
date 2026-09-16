import { getPublishedCollection } from "astro-course-university/content";

/** The two collections that run once a week, in step with each other. */
export type WeeklyCollection = "lectures" | "sessions";

export interface WeekRef {
  week: number;
  title: string;
  /** Entry id within its own collection, e.g. `week-09` or `09-the-reorg`. */
  id: string;
}

export interface AssessmentRef {
  title: string;
  id: string;
  weight: number;
}

export interface WeekContext {
  week: number;
  total: number;
  previous?: WeekRef;
  next?: WeekRef;
  /** Earlier weeks this one depends on, in the same collection as the page. */
  buildsOn: WeekRef[];
  /** Assessments that draw on this week. */
  feeds: AssessmentRef[];
}

async function weeksOf(collection: WeeklyCollection): Promise<WeekRef[]> {
  const entries = await getPublishedCollection(collection);
  return entries
    .map((entry) => ({ week: entry.data.week, title: entry.data.title, id: entry.id }))
    .sort((a, b) => a.week - b.week);
}

/**
 * `buildsOn` is declared once per week, on the stand-up, because that is where
 * the trick lands. The lecture of the same week shares it: the week is the unit
 * the course is ordered by, and the two pages are its two halves.
 */
async function buildsOnWeeks(week: number): Promise<number[]> {
  const sessions = await getPublishedCollection("sessions");
  // `buildsOn` rides through the loose schema untyped, so narrow it here.
  const declared = sessions.find((session) => session.data.week === week)?.data.buildsOn;
  if (!Array.isArray(declared)) return [];
  return declared.filter((value): value is number => Number.isInteger(value)).sort((a, b) => a - b);
}

/**
 * Assessments name the stand-ups they draw on; this reads that edge backwards,
 * so a week can say what it feeds. `spec/course.test.ts` asserts every week
 * feeds at least one assessment, so an empty list here is a failing build.
 */
async function assessmentsFedBy(week: number): Promise<AssessmentRef[]> {
  const sessions = await getPublishedCollection("sessions");
  const session = sessions.find((entry) => entry.data.week === week);
  if (!session) return [];
  const ref = `sessions/${session.id}`;
  const assessments = await getPublishedCollection("assessments");
  return assessments
    .filter((assessment) => assessment.data.related.includes(ref))
    .sort((a, b) => a.data.week - b.data.week)
    .map((assessment) => ({
      title: assessment.data.title,
      id: assessment.id,
      weight: assessment.data.weight,
    }));
}

/** Everything a week's page needs to say where it sits in the course. */
export async function getWeekContext(
  week: number,
  collection: WeeklyCollection,
): Promise<WeekContext> {
  const weeks = await weeksOf(collection);
  const byWeek = new Map(weeks.map((entry) => [entry.week, entry]));
  const index = weeks.findIndex((entry) => entry.week === week);
  const earlier = await buildsOnWeeks(week);

  return {
    week,
    total: weeks.length,
    previous: index > 0 ? weeks[index - 1] : undefined,
    next: index >= 0 && index < weeks.length - 1 ? weeks[index + 1] : undefined,
    buildsOn: earlier
      .map((earlierWeek) => byWeek.get(earlierWeek))
      .filter((entry): entry is WeekRef => entry !== undefined),
    feeds: await assessmentsFedBy(week),
  };
}
