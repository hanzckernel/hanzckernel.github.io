import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().optional(),
		url: z.string().url().optional(),
		github: z.string().url().optional(),
		tags: z.array(z.string()).default([]),
		publishDate: z.date().optional(),
	}),
});

const papers = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().optional(),
		pdfUrl: z.string().optional(),
		texUrl: z.string().optional(),
		tags: z.array(z.string()).default([]),
		publishDate: z.date().optional(),
	}),
});

const interests = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		images: z.array(z.string()).default([]),
		order: z.number().default(0),
	}),
});

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		updatedDate: z.date().optional(),
		image: z.string().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = {
	projects,
	papers,
	interests,
	blog,
};
