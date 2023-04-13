import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";
const ControllerSelect = ({ name, optionValue, optionLabel, isDisabled, isMulti, isSearchable, isClearable, options, menuPlacement, placeholder }) => {
	const {
		register,
		setValue,
		formState: { errors }
	} = useFormContext();

	return (
		<div>
			<Select
				options={options}
				{...register(`${name}`)}
				name={name}
				getOptionLabel={option => (typeof optionLabel === "function" ? optionLabel(option) : option[optionLabel])}
				getOptionValue={option => (typeof optionValue === "function" ? optionValue(option) : option[optionValue])}
				onChange={option => {
					setValue(name, option);
				}}
				isDisabled={isDisabled}
				isMulti={isMulti}
				isSearchable={isSearchable}
				isClearable={isClearable}
				menuPlacement={menuPlacement}
				placeholder={placeholder}
			/>
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
