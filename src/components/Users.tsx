import React, { useEffect } from "react";
import { fetchUsers } from "../redux/fetches/fetchUser";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { userAction } from "../redux/slices/UserSlice";

const Users = () => {
	const { user, count, error, loading } = useAppSelector(
		(state) => state.userData
	);

	const dispatch = useAppDispatch();
	const { increment } = userAction();
	useEffect(() => {
		dispatch(fetchUsers());
	}, []);
	if (loading) {
		return <div>loading...</div>;
	}
	if (error) {
		return <div>error:{error}</div>;
	}
	return (
		<div className="users" style={{ width: "50%" }}>
			<div>
				<p>count:{count}</p>
				<button onClick={() => dispatch(increment(2))}>incr</button>
			</div>
			<div>
				{user.map((us) => {
					return (
						<div key={us.id}>
							{us.name}:{us.email}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Users;
