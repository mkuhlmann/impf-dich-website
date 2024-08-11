import TurndownService from 'turndown';
import fs from 'fs';
import path from 'path';
const turndownService = new TurndownService();

const newsPath = './src/content/news';

function getFirstGroup(regexp: RegExp, str: string) {
	const array = [...str.matchAll(regexp)];
	if (array.length == 0) return null;
	return array[0][1] ?? null;
}

const getBasenameFormUrl = (urlStr: string) => {
	const url = new URL(urlStr);
	return path.basename(url.pathname);
};

async function downloadImage(articlePath: string, imageUrl: string) {
	let imagePath = articlePath + '/' + getBasenameFormUrl(imageUrl);
	console.log(`${imageUrl} --> ${imagePath}`);
	if (!fs.existsSync(imagePath)) {
		await Bun.write(imagePath, await fetch(imageUrl));
	} else {
		console.log('already downloaded, skipping');
	}
}

async function main() {
	for (let page = 1; page <= 17; page++) {
		console.log(`grabbing page ${page}`);

		let html = await (await fetch(`https://impf-dich.org/de/news/browse/${page}.html`)).text();

		let matches = [...html.matchAll(/\<a href\="https\:\/\/impf\-dich\.org\/de\/news\/(.*?)"/g)];

		for (let match of matches) {
			let slug = match[1];
			console.log(`grabbing article ${slug}`);

			html = await (await fetch(`https://impf-dich.org/de/news/${slug}`)).text();

			let articleMatch = getFirstGroup(/\<article\>.*?\<div class\="content neos\-nodetypes\-text"\>(.*?)\<\/article\>/gms, html);

			let articleDate = getFirstGroup(/"datePublished"\:"(.*?)T00\:00\:00\+00\:00",/g, html);
			let articleTitle = getFirstGroup(/\<title\>(.*?) \-.*?\<\/title\>/gms, html);
			let heroImage = getFirstGroup(/\<figure class\="blog\-entry\-image blog\-header"\>\<img title\=".*?src=\"(.*?)"/g, html);
			let heroImageLocal: string | undefined;
			let heroImageMd = '';

			if (articleMatch && articleDate && articleTitle) {
				articleTitle = decodeURIComponent(articleTitle);
				let articleHtml = articleMatch;
				let articleMd = turndownService.turndown(articleHtml);

				let articlePath = `${newsPath}/${articleDate.substring(0, 4)}/${articleDate}-${slug}`;

				fs.mkdirSync(articlePath, { recursive: true });

				let imageMatches = articleMd.matchAll(/\https\:\/\/impf-dich.*?\.(jpeg|jpg|png|svg|gif|pdf)/g);
				for (let imageMatch of imageMatches) {
					let imageUrl = imageMatch[0];
					await downloadImage(articlePath, imageUrl);
					articleMd = articleMd.replace(imageUrl, './' + getBasenameFormUrl(imageUrl));
				}

				if (heroImage) {
					await downloadImage(articlePath, heroImage);
					heroImageLocal = getBasenameFormUrl(heroImage);
					heroImageMd = 'heroImage: ./' + heroImageLocal;
				}

				let md = `---
title: '${articleTitle}'
layout: '@/layouts/Page.astro'
slug: ${slug}
publishedAt: ${articleDate}
${heroImageMd}
---

${articleMd}`;

				await Bun.write(articlePath + '/index.md', md);
			}
		}
	}
}
