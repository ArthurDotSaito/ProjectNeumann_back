import { notFoundError } from '@/errors/notFound-error';
import postsRepository from '@/repositories/posts-repositories';
import getSortedPostsData from '@/utils/posts';

async function createPostFromData() {
	const sortedPostsData = await getSortedPostsData();

	if (!sortedPostsData) throw notFoundError();

	await postsRepository.createPostFromData(sortedPostsData);
}

async function getAllPosts() {
	const posts = await postsRepository.getAllPosts();
	if (!posts) throw notFoundError();

	return posts;
}

async function getPostById(postId: number) {
	const post = await postsRepository.getPostById(postId);
	if (!post) throw notFoundError();

	return post;
}

const postsServices = {
	createPostFromData,
	getAllPosts,
	getPostById,
};

export default postsServices;
