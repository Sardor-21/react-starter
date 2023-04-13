import React from "react";

import PropTypes from "prop-types";
import cx from "classnames";
import InputMask from "react-input-mask";
import { useTranslation } from "react-i18next";

const Text = ({ className, label, placeholder, disabled, readOnly, type, mask, field, form: { touched, errors }, ...props }) => {
	const { t } = useTranslation();
	const classes = cx("form-field ant-form-item-control", touched[field.name] && errors[field.name] && "has-error", className);
	return (
		<div className="ant-row ant-form-item">
			<div className={classes}>
				{label && <label className="form-field__label ant-label">{label}</label>}
				<InputMask
					disabled={disabled}
					formatChars={{
						"9": "[0-9]",
						a: "[0-9]",
						b: "[0-2]",
						c: "[0-5]",
						A: "[A-Z]"
					}}
					className="w100 form-field__input ant-input ant-input-lg input-mask"
					mask={mask}
					type={type}
					placeholder={t(placeholder)}
					readOnly={readOnly}
					{...field}
					{...props}
					name={field.name}
					value={field.value}
				/>
				{touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{t(errors[field.name])}</div>}
			</div>
		</div>
	);
};

Text.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["text", "password"]),
	className: PropTypes.string,
	mask: PropTypes.string,
	disabled: PropTypes.bool
};

Text.defaultProps = {
	label: "",
	placeholder: "",
	type: "text",
	className: null,
	mask: "+999999999999",
	disabled: false
};

export default Text;
