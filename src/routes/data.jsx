import { lazy } from "react";

import Layout from "@/layouts";
import Home from "@/pages/home";

export const mainRoutes = {
	layout: <Layout />,
	home: <Home />
};

export const routes = [
	{
		path: "/",
		element: <></>
	}
];
