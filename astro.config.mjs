import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	site: 'https://impf-dich.org',
	integrations: [tailwind(), astroImageTools, mdx(), sitemap(), vue()],
});
