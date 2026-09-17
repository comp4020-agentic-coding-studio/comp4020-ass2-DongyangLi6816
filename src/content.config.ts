import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema } from "astro-course-university/schemas";

const weekSchema = z.coerce.number().int().min(1).max(12);
const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });
const teacherRefs = z.array(reference("people")).min(1);

const weightedMarking = z
  .object({
    mode: z.literal("weighted"),
    criteria: z
      .array(z.object({ name: z.string().trim().min(1), weight: z.number().positive() }))
      .min(1),
  })
  .superRefine((marking, ctx) => {
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `criterion weights sum to ${total}, not 100`,
      });
    }
  });

const holisticMarking = z.object({
  mode: z.literal("holistic"),
  description: z.string().trim().min(40),
});

// What each grade looks like for this piece, top band first. Five rows, the
// ANU grades, each with the mark range it covers and a sentence a marker
// could hold a script against.
const gradeBands = z
  .array(
    z.object({
      grade: z.enum(["HD", "D", "CR", "P", "N"]),
      range: z.string().trim().min(1),
      expectation: z.string().trim().min(20),
    }),
  )
  .length(5);

export const collections = {
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
      })
      .loose(),
  }),

  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        due: z.coerce.date(),
        weight: z.coerce.number().positive().max(100),
        marking: z.discriminatedUnion("mode", [weightedMarking, holisticMarking]).optional(),
        // A weekly piece is marked at every stand-up and has no single due
        // date; `week` and `due` then name the last stand-up it is marked at.
        cadence: z.enum(["weekly"]).optional(),
        bands: gradeBands.optional(),
      })
      .loose(),
  }),

  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
        slides: z
          .string()
          .regex(/^\/decks\/[a-z0-9-]+\/$/)
          .optional(),
      })
      .loose(),
  }),

  // The twelve engineers whose packets Assessments 2 and 3 are argued from
  // and whose team Assessment 4 designs for. A dossier is a content node like
  // any other, so it carries `related:` edges and appears in the API.
  team: defineCollection({
    loader: courseNodeLoader("team"),
    schema: courseNodeSchema
      .extend({
        level: z.string().trim().min(1),
        tenure: z.string().trim().min(1),
        owns: z.string().trim().min(1).optional(),
        numbers: z.object({
          ticketsClosed: z.number().int().nonnegative(),
          prsMerged: z.number().int().nonnegative(),
          incidentsHandled: z.number().int().nonnegative(),
          statusActiveHoursPerWeek: z.number().nonnegative(),
          meetingsAttendedPercent: z.number().int().min(0).max(100),
          docComments: z.number().int().nonnegative(),
          channelPosts: z.number().int().nonnegative(),
          directMessages: z.number().int().nonnegative(),
        }),
      })
      .loose(),
  }),

  people: defineCollection({
    loader: courseNodeLoader("people"),
    schema: ({ image }) =>
      z
        .object({
          title: z.string().trim().min(1),
          description: z.string().trim().min(40),
          role: z.string().trim().min(1),
          contact: z.string().trim().min(1).optional(),
          affiliation: z.string().trim().min(1).optional(),
          email: z.email().optional(),
          url: z.url().optional(),
          photo: image().optional(),
          photoAlt: z.string().trim().optional(),
          published: z.coerce.boolean().default(true),
        })
        .superRefine((person, ctx) => {
          if (person.photo && !person.photoAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["photoAlt"],
              message: "describe the photo when one is supplied",
            });
          }
        }),
  }),
};
