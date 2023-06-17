import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

import { BlogPost } from '@/types';

const postsDirectory = path.join(process.cwd(), 'src/articles');

export default async function getSortedPostsData() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fn) => {
		const name = fn.replace(/\.md$/, '');

		const fullPath = path.join(postsDirectory, fn);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const matterResult = matter(fileContents);

		const blogPost: BlogPost = {
			name,
			title: matterResult.data.title,
			date: matterResult.data.date,
			content: matterResult.content,
			formattedContent: marked(matterResult.content),
		};

		return blogPost;
	});

	return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
