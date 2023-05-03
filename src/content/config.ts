import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		author: z.string().default('Impf Dich'),
		publishedAt: z.date().optional(),
	}),
});

export const collections = {
	news: newsCollection,
};
