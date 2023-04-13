import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Text = ({ className, title, placeholder, type, field, form: { touched, errors }, ...props }) => {
	const { t } = useTranslation();
	return (
		<div className={`form-field__group ${field.value && field.value.length > 0 ? "form-field__focused" : ""}`}>
			{title && <label className="form-field__label">{title}</label>}
			<input className="form-field__input" {...{ placeholder, type }} {...field} {...props} />
			{touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{t(errors[field.name])}</div>}
		</div>
	);
};

Text.propTypes = {
	title: PropTypes.string,
	type: PropTypes.oneOf(["text", "password"]),
	className: PropTypes.string,
	placeholder: PropTypes.string
};

Text.defaultProps = {
	title: "",
	placeholder: "",
	type: "text",
	className: null
};

export default Text;
