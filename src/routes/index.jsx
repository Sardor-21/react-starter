import React from "react";
import { routes, mainRoutes } from "./data";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const RoutesWrapper = () => {
	// const suspenseData = routes.reduce(
	// 	(total, curr) => [...total, { ...curr, element: <Suspense fallback="">{get(curr, "element")}</Suspense>, errorElement: <>Error page</> }],
	// 	[]
	// );
	const router = createBrowserRouter([
		{
			path: "/",
			element: mainRoutes.layout,
			children: [{ index: true, element: mainRoutes.home }]
		}
	]);
	return <RouterProvider router={router} />;
};

export default RoutesWrapper;
