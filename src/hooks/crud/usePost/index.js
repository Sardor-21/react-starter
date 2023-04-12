import { useMutation } from "@tanstack/react-query";
import { http, queryBuilder } from "@/services";

async function postData({ url, data, params, method = "post", onSuccess = () => {}, onError = () => {} }) {
	return await http[method](queryBuilder(url, params), data)
		.then(data => onSuccess(data))
		.catch(err => onError(err));
}

const usePost = () => useMutation(postData);

export default usePost;
