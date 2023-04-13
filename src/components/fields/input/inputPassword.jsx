import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import cx from "classnames";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const PasswordInputLogin = ({
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
	const [isVisible, setVisible] = useState(false);
	const toggleVisible = () => setVisible(!isVisible);
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
				<input
					className={classes}
					{...{ placeholder }}
					type={isVisible ? "text" : "password"}
					{...field}
					value={fieldValue}
					{...props}
					autoComplete={"off"}
					disabled={disabled}
				/>
				{!field.value && extra && <span className="form-extra">{extra}</span>}
				<div className="form-field__password-show" onClick={toggleVisible}>
					{isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
				</div>
			</div>
			{touched[field.name] && errors[field.name] && <small className="form-field__error ant-form-explain">{t(message)}</small>}
		</div>
	);
};

PasswordInputLogin.propTypes = {
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

PasswordInputLogin.defaultProps = {
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

export default PasswordInputLogin;

// import React, { useState } from "react";
// import { useFormContext, useWatch } from "react-hook-form";

// const PasswordInputLogin = ({ type, title, placeholder, name }) => {
// 	// const [isVisible, setVisible] = useState(false);
// 	// const toggleVisible = () => setVisible(!isVisible);

// 	// const {
// 	// 	register,
// 	// 	control,
// 	// 	formState: { errors }
// 	// } = useFormContext();
// 	// if (isVisible) {
// 	// 	type = "text";
// 	// }
// 	// const value = useWatch({
// 	// 	control,
// 	// 	name
// 	// });

// 	return (
// 		<></>
// 		// <div className={`form-field__group ${value && value.length > 0 ? "form-field__focused" : ""}`}>
// 		// 	{title && <label className="form-field__label">{title}</label>}
// 		// 	<input className="form-field__input" {...{ type }} {...register(`${name}`)} {...{ placeholder }} />
// 		// 	<div className="form-field__password-show" onClick={toggleVisible} />
// 		// 	{/* {touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{t(errors[field.name])}</div>} */}
// 		// </div>
// 	);
// };

// export default PasswordInputLogin;
