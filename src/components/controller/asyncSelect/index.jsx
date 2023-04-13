import { get } from "lodash";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AsyncPaginate } from "react-select-async-paginate";
import { queryBuilder, http } from "@/services";
import PropTypes from "prop-types";
import cx from "classnames";
const ControllerAsyncSelect = ({
	name,
	onChange,
	url,
	loadOptionsParams,
	filterParams,
	loadOptionsKey,
	extraOptions,
	isSearchable,
	isClearable,
	isDisabled,
	placeholder,
	optionLabel,
	optionValue,
	required,
	label,
	className,
	options,
	isMulti,
	menuPlacement
}) => {
	const {
		register,
		setValue,
		control,
		formState: { errors }
	} = useFormContext();
	const value = useWatch({
		control,
		name
	});

	const loadOptions = async (searchQuery, prevOptions, { page }) => {
		const { data } = await http.get(
			queryBuilder(url, {
				page,
				filter: filterParams,
				...loadOptionsParams(searchQuery)
			})
		);

		return {
			options: loadOptionsKey
				? typeof loadOptionsKey === "function"
					? [...extraOptions, ...loadOptionsKey(get(data, "data"))]
					: [...extraOptions, ...get(data.data, loadOptionsKey, [])]
				: get(data, "data"),
			hasMore: get(data, "meta.currentPage", 1) < get(data, "meta.pageCount", 1),
			additional: { page: get(data, "meta.currentPage", 1) + 1 }
		};
	};
	const classNames = cx(
		"field-container async-field",
		// field.name && touched[field.name] && errors[field.name] && "has-error",
		className
	);

	const customStyles = {
		menu: props => ({
			...props,
			zIndex: 10
		}),
		control: props => ({
			...props,
			minHeight: "38px",
			// border: errors[name] ? "1px solid red" : "",
			"&:hover": {
				borderColor: "#4096ff",
				borderInlineEndWidth: 1
			},
			"&:focus": {
				boxShadow: "0 0 20px 80px red"
			}
			// borderColor: touched[field.name] && errors[field.name] ? "#f5222d" : "#d9d9d9"
		}),
		placeholder: props => ({
			...props,
			color: "#bfbfbf",
			fontWeight: 500
		}),
		singleValue: props => ({
			...props,
			fontWeight: 500
		}),
		option: props => ({
			...props,
			fontWeight: 500
		})
	};
	return (
		<div className={`${classNames}  mb-15`}>
			{label && <div className="ant-label">{label}</div>}
			<AsyncPaginate
				{...register(`${name}`, { required: required })}
				loadOptions={loadOptions}
				debounceTimeout={300}
				styles={customStyles}
				value={value}
				getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
				onChange={option => {
					if (typeof onChange === "function") {
						onChange(option);
						setValue(name, option);
					} else setValue(name, option);
				}}
				isSearchable={isSearchable}
				isClearable={isClearable}
				isDisabled={isDisabled}
				placeholder={placeholder}
				additional={{
					page: 1
				}}
				{...{ isMulti, options, placeholder, isSearchable, menuPlacement }}
			/>
		</div>
	);
};
ControllerAsyncSelect.propTypes = {
	isSearchable: PropTypes.bool,
	isClearable: PropTypes.bool,
	isDisabled: PropTypes.bool,
	loadOptionsParams: PropTypes.func,
	onChange: PropTypes.func
};
ControllerAsyncSelect.defaultProps = {
	optionValue: "id"
};

export default ControllerAsyncSelect;
