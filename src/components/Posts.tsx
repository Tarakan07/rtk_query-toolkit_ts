import React from "react";
import { postApi, TPosts } from "../services/postsServices";

const Posts = () => {
	const {
		data: posts,
		isLoading,
		isError,
		refetch,
	} = postApi.useFetchAllPostsQuery(20, { pollingInterval: 20000 });
	const [createPost, {}] = postApi.useCreatePostMutation();
	const [deletePost] = postApi.useDeletePostMutation();
	if (isLoading) {
		return <div>loading...</div>;
	}
	if (isError) {
		return <div>error</div>;
	}

	const handCreatePost = async () => {
		await createPost({
			title: "created post",
			body: "lalalla",
		} as TPosts);
	};
	const handDeletePost = async (id: number) => {
		await deletePost(id);
	};
	return (
		<div style={{ width: "45%" }}>
			<p>Posts</p>
			<button onClick={() => refetch()}>Refetch</button>
			<button onClick={handCreatePost}>create post</button>
			<div>
				{posts?.map((post) => {
					return (
						<div key={post.id}>
							<h3>
								{post.title}-{post.id}
							</h3>
							<p>{post.body}</p>
							<button onClick={() => handDeletePost(post.id)}>delete</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Posts;
