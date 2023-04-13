import React from "react";
import { Input } from "antd";
import { useFormContext } from "react-hook-form";
const Textarea = ({ name, label, rows, maxLength, minLength }) => {
	const {
		register,
		setValue,
		formState: { errors }
	} = useFormContext();

	const { TextArea } = Input;
	return (
		<div className="mb-15">
			{label && <div className="ant-label">{label}</div>}
			<TextArea {...register(`${name}`)} rows={rows} onChange={e => setValue(name, e.target.value)} maxLength={maxLength} minLength={minLength} />
		</div>
	);
};

export default Textarea;
