import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { get } from "lodash";
const ControllerSelect = ({
	optionValue,
	optionLabel,
	isDisabled,
	isMulti,
	isSearchable,
	label,
	isClearable,
	options,
	menuPlacement,
	placeholder,
	field,
	onChange = () => {},
	message = "Выбор обязателно",
	form: { errors, setFieldValue, setFieldTouched, touched }
}) => {
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
	const value = field.value ? options.find(option => typeof optionValue === "string" && option[optionValue] === field.value) : field.value;
	return (
		<div className="mb-20">
			{label && <div className="ant-label">{label}</div>}

			<Select
				styles={customStyles}
				options={options}
				value={value}
				name={get(field, "name")}
				optionValue={optionValue}
				getValue={option => typeof optionValue === "string" && option[optionValue]}
				onBlur={() => setFieldTouched(field.name, true)}
				getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
				isDisabled={isDisabled}
				isMulti={isMulti}
				onChange={option => {
					onChange(option ? option[optionValue] : null);
					setFieldValue(field.name, option ? option[optionValue] : null);
				}}
				isSearchable={isSearchable}
				isClearable={isClearable}
				menuPlacement={menuPlacement}
				placeholder={placeholder}
			/>
			{field.value ? "" : touched[field.name] && errors[field.name] && <small className="async-select__error">{message}</small>}
		</div>
	);
};
ControllerSelect.propTypes = {
	optionValue: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	optionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
	isDisabled: PropTypes.bool,
	isMulti: PropTypes.bool,
	isSearchable: PropTypes.bool,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	menuPlacement: PropTypes.string
};
ControllerSelect.defaultValue = {
	optionValue: "id",
	optionLabel: "label",
	menuPlacement: "bottom"
};
export default ControllerSelect;
