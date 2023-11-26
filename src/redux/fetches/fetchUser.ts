import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { TUser } from "../slices/UserSlice";

export const fetchUsers = createAsyncThunk(
	"users/getUsers",
	async (_, thunkApi) => {
		try {
			// const res = await axios.get(
			// 	"https://jsonplaceholder.typicode.com/user2s"
			// );
			const res: AxiosResponse = await new Promise(async (resolve, reject) => {
				try {
					const getData = await axios.get<TUser[]>(
						"https://jsonplaceholder.typicode.com/users"
					);

					setTimeout(() => {
						resolve(getData);
					}, 1000);
				} catch (error) {
					setTimeout(() => {
						reject(error);
					}, 1000);
				}
			});

			return res.data;
		} catch (error) {
			console.log(error);
			return thunkApi.rejectWithValue("Reject fetch users");
		}
	}
);
