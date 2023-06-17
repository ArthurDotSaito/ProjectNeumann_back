import { notFoundError } from '@/errors/notFound-error';
import postsRepository from '@/repositories/posts-repositories';
import getSortedPostsData from '@/utils/posts';

async function createPostFromData() {
	const sortedPostsData = getSortedPostsData();

	if (!sortedPostsData) throw notFoundError();

	await postsRepository.createPostFromData(sortedPostsData);
}

async function getAllPosts() {
	const posts = await postsRepository.getAllPosts();
	if (!posts) throw notFoundError();

	return posts;
}

const postsServices = {
	createPostFromData,
	getAllPosts,
};

export default postsServices;
