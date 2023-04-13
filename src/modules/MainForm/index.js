import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";
import isArray from "lodash/isArray";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import { usePost } from "@/hooks";

const MainForm = ({ url, method, params, children, fields, onSuccess = () => {}, onError = () => {} }) => {
	const { mutate, isSuccess, isLoading } = usePost();
	const queryClient = useQueryClient();
	return (
		<Formik
			initialValues={
				isArray(fields)
					? fields.reduce(
							(prev, curr) => ({
								...prev,
								[curr.name]: get(curr, "value", "")
							}),
							{}
					  )
					: {}
			}
			enableReinitialize={true}
			validationSchema={() => {
				if (!isArray(fields)) {
					return Yup.object().shape({});
				}

				let validationFields = {};

				fields.forEach(field => {
					let validationField;

					switch (field.type) {
						case "string":
							validationField = Yup.string().typeError("Must be a string");
							break;
						case "object":
							validationField = Yup.object();
							break;
						case "number":
							validationField = Yup.number().typeError("Must be a number");
							break;
						case "array":
							validationField = Yup.array();
							break;
						case "boolean":
							validationField = Yup.boolean();
							break;
						case "date":
							validationField = Yup.date();
							break;
						default:
							validationField = Yup.string();
					}

					if (field.required) {
						validationField = validationField.required("Требуется ввод");
					}

					if (field.min) {
						validationField = validationField.min(field.min, "Слишком короткий!");
					}

					if (field.max) {
						validationField = validationField.max(field.max, "Слишком длинный!");
					}

					validationField = validationField.nullable();

					validationFields[field.name] = validationField;
				});

				return Yup.object().shape(validationFields);
			}}
			onSubmit={(values, { resetForm }) => {
				values = { ...values };
				fields.forEach(field => {
					if (field.hasOwnProperty("onSubmitValue")) {
						if (typeof field.onSubmitValue === "function") {
							if (field.hasOwnProperty("onSubmitKey")) {
								values[field.onSubmitKey] = field.onSubmitValue(values[field.name], values);
								delete values[field.name];
							} else {
								values[field.name] = field.onSubmitValue(values[field.name], values);
							}
						}
					}
					if (field.hasOwnProperty("disabled")) {
						if (field.disabled) {
							delete values[field.name];
						}
					}
				});
				mutate({
					url,
					data: values,
					method,
					params,
					onSuccess: data => {
						onSuccess(get(data, "data"), resetForm, queryClient);
					},

					onError: error => {
						onError(error, resetForm, queryClient);
					}
				});
			}}>
			{({ handleSubmit, submitForm, values, isSubmitting, setFieldValue, setFieldError, setFieldTouched, touched, errors }) => {
				return (
					<form
						onSubmit={handleSubmit}
						onKeyPress={event => {
							// if (event.which === 13 && disableOnEnter) {
							// 	event.preventDefault();
							// }
						}}>
						{children({
							handleSubmit,
							submitForm,
							values,
							isSubmitting,
							setFieldValue,
							setFieldError,
							setFieldTouched,
							isSuccess,
							isLoading,
							errors
						})}
					</form>
				);
			}}
		</Formik>
	);
};
MainForm.propTypes = {
	url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
	params: PropTypes.object,
	onSuccess: PropTypes.func,
	onError: PropTypes.func
};
export default MainForm;
