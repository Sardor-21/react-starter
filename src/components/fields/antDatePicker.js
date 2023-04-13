import React from "react";

import PropTypes from "prop-types";
import cx from "classnames";
import { DatePicker } from "antd";

const AntDatePicker = ({
	className,
	label,
	placeholder,
	onChange,
	disabled,
	field,
	message = "Дата не выбрана",
	form: { touched, errors, setFieldTouched, setFieldValue },
	...props
}) => {
	const classes = cx("form-field ant-form-item mb-15", touched[field.name] && errors[field.name] && "has-error", className);
	return (
		<div className={classes}>
			{label && <label className="form-field__label ant-label">{label}</label>}
			<DatePicker
				placeholder={placeholder}
				disabled={disabled}
				onBlur={() => setFieldTouched(field.name, true)}
				onChange={onChange}
				// value={field.value ? field.value : null}
				{...props}
			/>
			{touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{message}</div>}
		</div>
	);
};

AntDatePicker.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool
};

AntDatePicker.defaultProps = {
	label: "",
	placeholder: "",
	className: null,
	disabled: false
};

export default AntDatePicker;
