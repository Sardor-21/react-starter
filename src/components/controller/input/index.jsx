import { Input, InputNumber } from "antd";
import React from "react";
import { useWatch, useFormContext } from "react-hook-form";
import cx from "classnames";
import { get } from "lodash";

const ControllerInput = ({ onChange = () => {}, name, label, minLength, maxLength, appendFunc, type }) => {
	const {
		register,
		control,
		setValue,
		getValues,
		formState: { errors }
	} = useFormContext();
	const value = useWatch({
		control,
		name
	});
	const classes = cx(
		"form-field ant-form-item-control"
		// touched[field.name] && errors[field.name] && "has-error",
		// className
	);

	return (
		<div className="ant-row ant-form-item mb-15">
			<div className={classes}>
				{label && <div className="ant-label">{label}</div>}

				{type === "number" ? (
					<div className="fields">
						<InputNumber
							{...register(`${name}`, { ...appendFunc })}
							size="large"
							className={`w100 fields__input ${value ? null : errors[name] ? "fields__error" : ""}`}
							value={value}
							type={"number"}
							min={1}
							onChange={e => {
								onChange(e);
								setValue(name, e);
							}}
						/>
						{value
							? null
							: errors[name] && (
									<span className="fields__error-message">
										{get(errors, `[${name}].message`) ? get(errors, `[${name}].message`) : "Обезательно поля"}
									</span>
							  )}
					</div>
				) : (
					<div className="fields">
						<Input
							size="large"
							type={type}
							value={value}
							className={`w100 fields__input ${value ? null : errors[name] ? "fields__error" : ""}`}
							{...register(`${name}`, { required: true })}
							minLength={minLength}
							maxLength={maxLength}
							onChange={e => {
								onChange(e.target.value);
								setValue(name, e.target.value);
							}}
						/>
						{value
							? null
							: errors[name] && (
									<span className="fields__error-message">
										{get(errors, `[${name}].message`) ? get(errors, `[${name}].message`) : "Обезательно поля"}
									</span>
							  )}
					</div>
				)}
			</div>
		</div>
	);
};

export default ControllerInput;
