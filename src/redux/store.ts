import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/UserSlice";
import { postApi } from "../services/postsServices";

const rootReducers = combineReducers({
	userData: userDataReducer,
	[postApi.reducerPath]: postApi.reducer,
});

export const store = () => {
	return configureStore({
		reducer: rootReducers,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(postApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
