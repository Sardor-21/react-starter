import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "@/hooks";
import { useEffect, useMemo } from "react";

const Form = ({ children, fields = [], url, method, params, onSuccess = () => {}, onError = () => {}, validateQuery = "" }) => {
	const form = useForm({
		mode: "onBlur",
		defaultValues: useMemo(() => {
			return fields?.reduce((prev, curr) => ({ ...prev, [curr.name]: curr.value }), {});
		}, [fields])
	});
	const { handleSubmit, control } = form;

	useEffect(() => {
		form.reset(fields?.reduce((prev, curr) => ({ ...prev, [curr.name]: curr.value }), {}));
	}, [fields]);

	const queryClient = useQueryClient();

	const { mutate, isSuccess, isLoading } = usePost({
		onSuccess: data => {
			onSuccess(get(data, "data"));
			queryClient.invalidateQueries(validateQuery);
		},
		onError: data => {
			onError(get(data, "data"));
		}
	});

	const onSubmit = data => {
		let values = data;
		fields.forEach(field => {
			if (field.hasOwnProperty("onSubmitValue")) {
				if (typeof field.onSubmitValue === "function") {
					values[field.name] = field.onSubmitValue(values[field.name], values);
				}
			}
		});
		mutate({
			url,
			data: values,
			method,
			params
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{children({
				...form,
				isSuccess,
				isLoading
			})}
			<DevTool control={control} />
		</form>
	);
};

export default Form;
