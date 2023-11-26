import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../fetches/fetchUser";
export type TUser = {
	id: number;
	name: string;
	email: string;
};

type TUserState = {
	user: TUser[];
	count?: number;

	loading: boolean;
	error: string;
};

const initialState: TUserState = {
	user: [],
	count: 0,
	loading: false,
	error: "",
};

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		increment: (state, action: PayloadAction<number>) => {
			state.count = state.count != undefined ? state.count + action.payload : 0;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state: TUserState) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state: TUserState, action) => {
				if (action.payload) {
					state.user = action.payload && action.payload;
				}
				state.loading = false;
			})
			.addCase(fetchUsers.rejected, (state: TUserState, action) => {
				state.error = action.payload as string;
				state.loading = false;
				// if (action.payload) {
				// 	state.error = action.error.message;
				// }
			});
	},
});

const { reducer: userDataReducer } = userSlice;
export const userAction = () => userSlice.actions;
export default userDataReducer;
