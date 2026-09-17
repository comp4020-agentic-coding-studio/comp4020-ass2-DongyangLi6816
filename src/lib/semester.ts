import { getPublishedCollection } from "astro-course-university/content";

/**
 * The four blocks of three weeks, and the two-week break between blocks B and
 * C. This is the only structural fact about the semester that is not in the
 * content: weeks carry their own number, but nothing in frontmatter says where
 * one block ends. Declared once here so the home page and the track cannot
 * disagree about it.
 */
export interface SemesterBlock {
  name: string;
  /** What changes in this block, in one line. */
  gloss: string;
  /** Inclusive week range. */
  from: number;
  to: number;
  /** A break follows this block. */
  breakAfter?: boolean;
}

export const semesterBlocks: SemesterBlock[] = [
  { name: "The room", gloss: "how the rating is actually decided, and by whom", from: 1, to: 3 },
  {
    name: "Inputs you control",
    gloss: "the self-review, the traces, the credit",
    from: 4,
    to: 6,
    breakAfter: true,
  },
  {
    name: "Inputs you do not",
    gloss: "the packet, the presence, the reorg",
    from: 7,
    to: 9,
  },
  {
    name: "The system fails",
    gloss: "the layoff list, the rat race, and the design",
    from: 10,
    to: 12,
  },
];

export interface SemesterDue {
  title: string;
  id: string;
  weight: number;
  /** Marked at every stand-up rather than falling due once. */
  weekly?: boolean;
}

export interface SemesterWeek {
  week: number;
  title: string;
  /** Lecture entry id, which the track links to. */
  id: string;
  /** False for week 10, the one week the course teaches no trick. */
  hasTrick: boolean;
  /** Assessments due in this week. */
  due: SemesterDue[];
}

export interface SemesterBlockWeeks extends SemesterBlock {
  weeks: SemesterWeek[];
}

/**
 * Every assessment in the order a student meets it: the weekly piece first,
 * because it starts in week 1, then the rest in the order they fall due.
 */
export async function getAssessmentWeights(): Promise<(SemesterDue & { week: number })[]> {
  const assessments = await getPublishedCollection("assessments");
  const startWeek = (entry: (typeof assessments)[number]): number =>
    entry.data.cadence === "weekly" ? 0 : entry.data.week;
  return assessments
    .sort((a, b) => startWeek(a) - startWeek(b))
    .map((assessment) => ({
      title: assessment.data.title,
      id: assessment.id,
      weight: assessment.data.weight,
      week: assessment.data.week,
      weekly: assessment.data.cadence === "weekly",
    }));
}

/** The twelve weeks, grouped into their blocks. */
export async function getSemester(): Promise<SemesterBlockWeeks[]> {
  const lectures = await getPublishedCollection("lectures");
  const sessions = await getPublishedCollection("sessions");
  const dueByWeek = new Map<number, SemesterDue[]>();
  for (const assessment of await getAssessmentWeights()) {
    // A weekly piece falls due nowhere in particular, so it gets no badge.
    if (assessment.weekly) continue;
    const { week, ...rest } = assessment;
    dueByWeek.set(week, [...(dueByWeek.get(week) ?? []), rest]);
  }

  const weeks: SemesterWeek[] = lectures
    .map((lecture) => {
      const week = lecture.data.week;
      // `trick` rides through the loose schema untyped. Its absence is the
      // fact the track exists to show, so it is read, not assumed.
      const trick = sessions.find((session) => session.data.week === week)?.data.trick;
      return {
        week,
        title: lecture.data.title,
        id: lecture.id,
        hasTrick: typeof trick === "string" && trick.length > 0,
        due: dueByWeek.get(week) ?? [],
      };
    })
    .sort((a, b) => a.week - b.week);

  return semesterBlocks.map((block) => ({
    ...block,
    weeks: weeks.filter((week) => week.week >= block.from && week.week <= block.to),
  }));
}
