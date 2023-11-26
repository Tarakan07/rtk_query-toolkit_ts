import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TPosts = {
	id: number;
	title: string;
	body: string;
};

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		// baseUrl: "https://jsonplaceholder.typicode.com",
		baseUrl: "http://localhost:5000",
	}),
	tagTypes: ["Post", "Delete"],
	endpoints: (build) => ({
		fetchAllPosts: build.query<TPosts[], number>({
			query: (limit: number = 10) => ({
				url: "/posts",
				params: {
					_limit: limit,
				},
			}),
			providesTags: (result) => ["Post", "Delete"],
		}),
		createPost: build.mutation<TPosts, TPosts>({
			query: (post) => ({
				url: "/posts",
				method: "POST",
				body: post,
			}),
			invalidatesTags: ["Post"],
		}),
		deletePost: build.mutation<TPosts, number>({
			query: (id) => ({
				url: `/posts/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Delete"],
		}),
	}),
});
