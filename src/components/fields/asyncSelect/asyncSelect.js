import React from "react";
import { get } from "lodash";
import { AsyncPaginate } from "react-select-async-paginate";
import { api, queryBuilder } from "services";
import PropTypes from "prop-types";
import cx from "classnames";

const ControllerAsyncSelect = ({
	loadOptionsUrl,
	loadOptionsParams,
	filterParams,
	loadOptionsKey,
	extraOptions,
	isSearchable,
	isClearable,
	isDisabled,
	placeholder = "Выберите...",
	optionLabel,
	optionValue,
	label,
	className,
	options,
	isMulti,
	message = "Выбор обязателно",
	menuPlacement,
	field,
	form: { errors, setFieldValue, setFieldTouched, touched }
}) => {
	const loadOptions = async (searchQuery, prevOptions, { page }) => {
		const { data } = await api.get(
			queryBuilder(loadOptionsUrl, {
				page,
				filter: filterParams,
				...loadOptionsParams(searchQuery)
			})
		);

		return {
			options: loadOptionsKey
				? typeof loadOptionsKey === "function"
					? [...extraOptions, ...loadOptionsKey(get(data, "data"))]
					: [...extraOptions, ...get(data, "data", [])]
				: get(data, "data"),
			hasMore: get(data, "current_page", 1) < get(data, "last_page", 1),
			additional: { page: get(data, "current_page", 1) + 1 }
		};
	};
	const classNames = cx("field-container async-field", field.name && touched[field.name] && errors[field.name] && "has-error", className);

	const customStyles = {
		menu: props => ({
			...props,
			zIndex: 10
		}),
		control: props => ({
			...props,
			minHeight: "38px",
			boxShadow: "",
			border: field.value ? "" : touched[field.name] && errors[field.name] && "1px solid #f5222d",
			"&:hover": {
				borderColor: !field.value && touched[field.name] && errors[field.name] ? "#f5222d" : "#4096ff",
				borderInlineEndWidth: 1
			}
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
		<div className={`${classNames}  mb-20`}>
			{label && <div className="ant-label">{label}</div>}
			<AsyncPaginate
				id={field.name}
				key={field.name}
				name={field.name}
				loadOptions={loadOptions}
				debounceTimeout={300}
				styles={customStyles}
				value={field.value}
				onBlur={() => setFieldTouched(field.name, true)}
				getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
				onChange={option => {
					setFieldValue(field.name, option);
				}}
				noOptionsMessage={() => "Результатов не найдено"}
				isSearchable={isSearchable}
				isClearable={isClearable}
				isDisabled={isDisabled}
				placeholder={placeholder}
				additional={{
					page: 1
				}}
				{...{ isMulti, options, placeholder, isSearchable, menuPlacement }}
			/>
			{field.value ? "" : touched[field.name] && errors[field.name] && <small className="async-select__error">{message}</small>}
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
