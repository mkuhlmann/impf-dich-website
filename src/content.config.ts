import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const newsCollection = defineCollection({
	loader: glob({ pattern: '**/*.md*', base: './src/content/news' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string().default('Impf Dich'),
			publishedAt: z.date().optional(),
			heroImage: image().optional(),
			slug: z.string(),
		}),
});

export const collections = {
	news: newsCollection,
};
