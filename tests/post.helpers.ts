import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'src/articles');
const numberOfFakeArticles = 10;

const generateFakeArticle = () => {
	const name = faker.lorem.slug();
	const title = faker.lorem.sentence();
	const date = faker.date.past().toISOString();
	const content = faker.lorem.paragraphs();

	return `---
name: ${name}
title: ${title}
date: ${date}
---
${content}`;
};

const generateFakeArticles = () => {
	const fakeArticles = Array.from({ length: numberOfFakeArticles }, generateFakeArticle);

	fakeArticles.forEach((fakeArticle, index) => {
		const filename = `${index + 1}.md`;
		const filePath = path.join(postsDirectory, filename);
		fs.writeFileSync(filePath, fakeArticle, 'utf8');
	});
};

const cleanupFakeArticles = () => {
	const fileNames = fs.readdirSync(postsDirectory);

	fileNames.forEach((fileName) => {
		if (fileName.match(/^\d+\.md$/)) {
			const filePath = path.join(postsDirectory, fileName);
			fs.unlinkSync(filePath);
		}
	});
};

export default async function getSortedPostsDataHelper() {
	generateFakeArticles();

	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const filePath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			name: fileName.replace(/\.md$/, ''),
			title: data.title,
			date: data.date,
			content,
			formattedContent: marked(content),
		};
	});

	allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));

	cleanupFakeArticles();

	return allPostsData;
}
