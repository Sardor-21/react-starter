import axios from "axios";

import config from "@/config";

const http = axios.create({
	baseURL: config.baseURL,
	timeout: 30000
});

http.interceptors.request.use(
	request => {
		return request;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default http;
