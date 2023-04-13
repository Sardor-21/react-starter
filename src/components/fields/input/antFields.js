import React from "react";
import { Form, Input, TimePicker, Select, Radio, TreeSelect, InputNumber, DatePicker } from "antd";
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CreateAntField = AntComponent => ({
	field,
	form,
	hasFeedback,
	label,
	selectOptions,
	submitCount,
	type,
	style,
	message = "Требуется ввод",
	onChange,
	size = "large",
	autoComplete = "off",
	placeholder,
	containerClass = "",
	formItemClassName,
	min,
	max,
	...props
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const touchedError = hasError && touched;
	const errorMessage = form.errors[field.name];
	const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
	const onChangeInner = value => form.setFieldValue(field.name, value);
	const onBlur = () => form.setFieldTouched(field.name, true);
	return (
		<div className={`field-container ${containerClass}`}>
			<FormItem
				label={false}
				className={formItemClassName}
				hasFeedback={(hasFeedback && submitted) || (hasFeedback && touched) ? true : false}
				help={touchedError ? errorMessage : false}
				// rules={[
				// 	{
				// 		message: "dfsdfsdf"
				// 	}
				// ]}
				validateStatus={touchedError ? "error" : "success"}
				{...{ style }}>
				{label && <div className="ant-label">{label}</div>}
				<AntComponent
					{...field}
					{...props}
					{...{ type, defaultValue: field.value }}
					size={size}
					autoComplete={autoComplete}
					placeholder={placeholder}
					onBlur={onBlur}
					min={min ? min : type === "number" ? 0 : min}
					max={max}
					onKeyDown={e => {
						if (
							type === "number" &&
							(e.code === "Minus" ||
								e.code === "NumpadSubtract" ||
								e.code === "NumpadAdd" ||
								e.code === "NumpadDecimal" ||
								e.code === "Period" ||
								e.code === "KeyE")
						) {
							e.preventDefault();
						}
					}}
					onChange={onChange ? onChange : type ? onInputChange : onChangeInner}>
					{selectOptions &&
						selectOptions.map(option => (
							<Option key={option.value} value={option.value}>
								{option.name}
							</Option>
						))}
				</AntComponent>
			</FormItem>
		</div>
	);
};

export const AntSelect = CreateAntField(Select);
export const AntInput = CreateAntField(Input);
export const AntInputNumber = CreateAntField(InputNumber);
export const AntTextarea = CreateAntField(Input.TextArea);
export const AntRadio = CreateAntField(Radio);
export const AntTreeSelect = CreateAntField(TreeSelect);
export const AntPassword = CreateAntField(Input.Password);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntRangePicker = CreateAntField(RangePicker);
