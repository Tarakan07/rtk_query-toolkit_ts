import React from "react";
import { postApi } from "../services/postsServices";

const Posts = () => {
	const {
		data: posts,
		isLoading,
		isError,
		refetch,
	} = postApi.useFetchAllPostsQuery(2, { pollingInterval: 20000 });

	if (isLoading) {
		return <div>loading...</div>;
	}
	if (isError) {
		return <div>error</div>;
	}
	return (
		<div style={{ width: "45%" }}>
			<p>Posts</p>
			<button onClick={() => refetch()}>Refetch</button>
			<div>
				{posts?.map((post) => {
					return (
						<div key={post.id}>
							<h3>{post.title}</h3>
							<p>{post.body}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Posts;
