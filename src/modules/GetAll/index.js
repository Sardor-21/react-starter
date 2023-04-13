import { useGetAll } from "@/hooks";
import React from "react";

const GetAll = ({ children, name, url, dataKey, params, queryParams, onSuccess = () => {}, onError = () => {} }) => {
	const data = useGetAll({ name, url, params, onSuccess, onError, queryParams });
	return <div>{children({ items: data })}</div>;
};

export default GetAll;
