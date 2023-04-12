import { useQuery } from "@tanstack/react-query";
import { http, queryBuilder } from "@/services";
async function getOne({ queryKey }) {
	// const { url, params } = queryKey[1].args;
	const { url, params } = queryKey[1].args;
	const res = await http.get(queryBuilder(url, params));
	return res.data;
}

const useGetOne = args => {
	const { name, onSuccess = () => {}, onError = () => {}, queryOption } = args;
	const data = useQuery({
		queryKey: [name, { args }],
		queryFn: getOne,
		onSuccess,
		onError,
		...queryOption
	});
	return { ...data };
};

export default useGetOne;
