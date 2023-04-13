import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

const InputLogin = ({ title, placeholder, type, name }) => {
	const {
		register,
		control,
		formState: { errors }
	} = useFormContext();
	const value = useWatch({
		control,
		name
	});
	return (
		<div className={`form-field__group ${value && value.length > 0 ? "form-field__focused" : ""}`}>
			{title && <label className="form-field__label">{title}</label>}
			<input className="form-field__input" {...register(`${name}`)} {...{ placeholder, type }} />
			{/* {touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{t(errors[field.name])}</div>} */}
		</div>
	);
};

export default InputLogin;
