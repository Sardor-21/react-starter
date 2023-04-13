import { useGetOne } from "@/hooks";
import React from "react";

const GetOne = ({ children, name, url, dataKey, params, queryParams, onSuccess = () => {}, onError = () => {} }) => {
	const data = useGetOne({ name, url, params, onSuccess, onError, queryParams });
	return <div>{children({ item, ...data })}</div>;
};

export default GetOne;
