import React from "react";
import { postApi, TPosts } from "../services/postsServices";
import { userAction } from "../redux/slices/UserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const Posts = () => {
	const {
		data: posts,
		isLoading,
		isError,
		refetch,
	} = postApi.useFetchAllPostsQuery(20, { pollingInterval: 20000 });
	const [createPost, {}] = postApi.useCreatePostMutation();
	const [deletePost] = postApi.useDeletePostMutation();
	const { cart } = useAppSelector((state) => state.userData);
	const dispatch = useAppDispatch();
	const { add_to_cart, clear_cart } = userAction();

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
			<button onClick={() => dispatch(clear_cart())}>clear cart</button>

			<div>
				<p>Cart:</p>
				<div>
					{cart &&
						cart.map((el) => {
							return <p key={el.id}>{el.title}</p>;
						})}
				</div>
			</div>
			<div>
				{posts?.map((post) => {
					return (
						<div key={post.id}>
							<h3>
								{post.title}-{post.id}
							</h3>
							<p>{post.body}</p>
							<button
								onClick={() => {
									dispatch(add_to_cart(post));
								}}
							>
								add to cart
							</button>
							<button onClick={() => handDeletePost(post.id)}>delete</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Posts;
