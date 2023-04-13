import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cx from "classnames";

const InputLogin = ({
	touchedColor,
	error,
	size,
	className,
	containerClassName,
	placeholder,
	isCheck,
	disabled,
	type,
	inputClassName,
	field,
	label,
	extra,
	message,
	hasborder,
	form: { touched, errors },
	tooltip,
	hasReader,
	icon,
	...props
}) => {
	const fieldValue = field.value ? field.value : "";
	const { t } = useTranslation();
	const classes = cx(
		"form-field__input",
		size && `form-input__${size}`,
		className,
		!errors[field.name] && Boolean(field.value) && `--touched ${touchedColor}`
	);
	const classOfContainer = cx("form-inputarea", touched[field.name] && errors[field.name] && "error", "filter-inputarea");
	const classesWrap = cx("form-field__group", containerClassName, disabled && "is-disable");

	return (
		<div className={classesWrap}>
			{label && <label className={`form-field__label ${field.value ? "label-top" : ""}`}>{label}</label>}
			<div className={classOfContainer}>
				{icon && (
					<div className="input-icon">
						<img src={icon} alt="" />
					</div>
				)}
				<input className={classes} {...{ placeholder, type }} {...field} value={fieldValue} {...props} autoComplete={"off"} disabled={disabled} />
				{!field.value && extra && <span className="form-extra">{extra}</span>}
			</div>
			{touched[field.name] && errors[field.name] && <small className="form-field__error ant-form-explain">{t(message)}</small>}
		</div>
	);
};

InputLogin.propTypes = {
	label: PropTypes.string,
	type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url"]),
	className: PropTypes.string,
	placeholder: PropTypes.string,
	extra: PropTypes.string,
	isCheck: PropTypes.bool,
	size: PropTypes.oneOf(["big", "small"]),
	hasborder: PropTypes.bool,
	error: PropTypes.string,
	tooltip: PropTypes.string,
	hasReader: PropTypes.bool,
	touchedColor: PropTypes.oneOf(["normal", "white"])
};

InputLogin.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null,
	isCheck: false,
	extra: "",
	size: "big",
	hasborder: false,
	error: "Please, fill the input",
	hasReader: false,
	touchedColor: "normal"
};

export default InputLogin;
