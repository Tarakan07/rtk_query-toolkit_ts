import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type TPosts = {
	id: number;
	title: string;
	body: string;
};

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://jsonplaceholder.typicode.com",
	}),
	endpoints: (build) => ({
		fetchAllPosts: build.query<TPosts[], number>({
			query: (limit: number = 10) => ({
				url: "/posts",
				params: {
					_limit: limit,
				},
			}),
		}),
	}),
});
