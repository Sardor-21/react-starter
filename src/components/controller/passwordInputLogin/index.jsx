import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PasswordInputLogin = ({ type, title, placeholder, name }) => {
	// const [isVisible, setVisible] = useState(false);
	// const toggleVisible = () => setVisible(!isVisible);

	// const {
	// 	register,
	// 	control,
	// 	formState: { errors }
	// } = useFormContext();
	// if (isVisible) {
	// 	type = "text";
	// }
	// const value = useWatch({
	// 	control,
	// 	name
	// });

	return (
		<></>
		// <div className={`form-field__group ${value && value.length > 0 ? "form-field__focused" : ""}`}>
		// 	{title && <label className="form-field__label">{title}</label>}
		// 	<input className="form-field__input" {...{ type }} {...register(`${name}`)} {...{ placeholder }} />
		// 	<div className="form-field__password-show" onClick={toggleVisible} />
		// 	{/* {touched[field.name] && errors[field.name] && <div className="form-field__error ant-form-explain">{t(errors[field.name])}</div>} */}
		// </div>
	);
};

export default PasswordInputLogin;
