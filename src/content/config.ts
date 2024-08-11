import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string().default('Impf Dich'),
			publishedAt: z.date().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = {
	news: newsCollection,
};
