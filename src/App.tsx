import React from "react";

import Users from "./components/Users";
import Posts from "./components/Posts";

const App = () => {
	return (
		<div
			style={{ display: "flex", justifyContent: "space-between", width: "60%" }}
		>
			<Users />
			<Posts />
		</div>
	);
};

export default App;
