import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const starStep = z.object({
  body: z.string(),
  points: z.array(z.string()).default([]),
});

const project = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    type: z.enum(['game', 'tool', 'web', 'jam']),
    year: z.number().int(),
    role: z.string(),
    engine: z.string().optional(),
    languages: z.array(z.string()).default([]),
    duration: z.string().optional(),
    players: z.string().optional(),
    press: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    hero: z.string(),
    heroAlt: z.string(),
    screenshots: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    links: z
      .object({
        play: z.string().url().optional(),
        source: z.string().url().optional(),
        itch: z.string().url().optional(),
        steam: z.string().url().optional(),
      })
      .default({}),
    star: z.object({
      situation: starStep,
      task: starStep,
      action: starStep,
      result: starStep.extend({
        metrics: z
          .array(z.object({ label: z.string(), value: z.string() }))
          .default([]),
      }),
    }),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().int().optional(),
    relatedProjects: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { project, blog };
