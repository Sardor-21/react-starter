import { useMutation } from "@tanstack/react-query";
import { http, queryBuilder } from "@/services";

async function deleteData({ url, params, onSuccess = () => {}, onError = () => {} }) {
	return await http
		.delete(queryBuilder(url, params))
		.then(data => onSuccess(data))
		.catch(err => onError(err));
}

const useDelete = () => useMutation(deleteData);

export default useDelete;
