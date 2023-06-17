import { notFoundError } from '@/errors/notFound-error';
import postsRepository from '@/repositories/posts-repositories';
import getSortedPostsData from '@/utils/posts';

async function createPostFromData() {
	const sortedPostsData = getSortedPostsData();

	if (!sortedPostsData) throw notFoundError();

	await postsRepository.createPostFromData(sortedPostsData);
}

const postsServices = {
	createPostFromData,
};

export default postsServices;
