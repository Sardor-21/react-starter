import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

import "./style.scss";
const Layout = () => {
	const [isCollapsed, setCollapse] = useState(true);
	useEffect(() => {
		const close = e => {
			if (e.ctrlKey && e.keyCode === 66) {
				if (isCollapsed) {
					setCollapse(false);
				} else {
					setCollapse(true);
				}
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [isCollapsed]);
	return (
		<div className={`m-layout ${isCollapsed ? "m-layout--collapsed" : ""}`}>
			<Sidebar {...{ isCollapsed, setCollapse }} />
			<div className="m-wrapper">
				<div className="m-content">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
