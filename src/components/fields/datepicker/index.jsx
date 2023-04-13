import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import cx from "classnames";
import PropTypes from "prop-types";
import ReactInputMask from "react-input-mask";
import { range } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import "react-datepicker/dist/react-datepicker.css";

import "./style.scss";

const DatePickerComponent = ({
	label,
	isRequired,
	form: { touched, errors, setFieldValue, setFieldTouched },
	field,
	variant = "small",
	inputClassname,
	className,
	size = "normal",
	format,
	popperPlacement = "bottom-end",
	calendarStartDay = 1,
	placeholder = "YYYY-MM-DD",
	popperClassName,
	today,
	minDate,
	maxDate,
	handleBlur = () => {},
	showTimeSelect,
	timeIntervals,
	selectToday = false,
	infoText,
	...props
}) => {
	const { t } = useTranslation();

	moment();

	const selected = field.value ? moment(field.value).toDate() : selectToday ? new Date() : undefined;
	const headerDate = selected ? selected : new Date();

	const years = range(headerDate.getFullYear() - 100, headerDate.getFullYear() + 100, 1);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	useEffect(() => {
		if (selectToday && !field.value) {
			setFieldValue(field.name, new Date());
		}
	}, []);

	const getMask = () => {
		return format
			.replaceAll("y", "9")
			.replaceAll("M", "9")
			.replaceAll("d", "9")
			.replaceAll("H", "9")
			.replaceAll("s", "9")
			.replaceAll("m", "9");
	};

	return (
		<div className={`${className} form-group day-picker mb-20 day-picker-${size}`}>
			{label && <div className="form-field__label ant-label">{label}</div>}
			<div className={`day-picker__container`}>
				<DatePicker
					{...{ minDate, maxDate }}
					showFullMonthYearPicker
					placeholderText={placeholder}
					calendarStartDay={calendarStartDay}
					popperPlacement={popperPlacement}
					dateFormat={format}
					selected={selected}
					customInput={<ReactInputMask className="dark:bg-dark-1" mask={getMask()} />}
					className={cx(inputClassname, variant, touched[field.name] && errors[field.name] && "errors")}
					popperClassName={cx("z-index-99 border-r-5", popperClassName)}
					portalId="main-content"
					todayButton={
						today && (
							<Button size="md" styles="outline" type="secondary" style={{ margin: "0 auto", borderRadius: "5px", minWidth: "120px" }}>
								{t("Сегодня")}
							</Button>
						)
					}
					onChange={date => {
						setFieldValue(field.name, date);
					}}
					onBlur={() => {
						setTimeout(() => {
							selected && handleBlur();
						}, 10);
						setFieldTouched(field.name, true);
					}}
					renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
						<div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
							<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="react-datepicker__prev">
								{"<"}
							</button>
							<select className="dark:bg-dark-1" value={date.getFullYear()} onChange={({ target: { value } }) => changeYear(value)}>
								{years.map(option => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>

							<select
								className="dark:bg-dark-1"
								value={months[date.getMonth()]}
								onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}>
								{months.map(option => (
									<option key={option} value={option}>
										{t(option)}
									</option>
								))}
							</select>

							<button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="react-datepicker__next">
								{">"}
							</button>
						</div>
					)}
					timeCaption="Выберите время"
					timeFormat="HH:mm"
					showTimeSelect={showTimeSelect}
					timeIntervals={timeIntervals}
					{...props}
				/>
				{/* <img className={cx("day-picker__img", variant)} src={require("assets/images/icons/calendar.svg")} alt="Choose date" /> */}
			</div>

			{touched[field.name] && errors[field.name] && (
				<span className="simple-select__error" style={{ color: "#ff4d4f" }}>
					{errors[field.name]}
				</span>
			)}
		</div>
	);
};

DatePickerComponent.propTypes = {
	label: PropTypes.string,
	isRequired: PropTypes.bool,
	form: PropTypes.shape({
		touched: PropTypes.object,
		errors: PropTypes.object,
		setFieldValue: PropTypes.func,
		setFieldTouched: PropTypes.func,
		setFieldError: PropTypes.func
	}),
	variant: PropTypes.oneOf(["extra-small", "small", "normal"]),
	inputClassname: PropTypes.string,
	className: PropTypes.string,
	format: PropTypes.string,
	popperPlacement: PropTypes.string,
	calendarStartDay: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
	placeholder: PropTypes.string,
	popperClassName: PropTypes.string,
	today: PropTypes.bool,
	disabled: PropTypes.bool,
	timeIntervals: PropTypes.number,
	showTimeSelect: PropTypes.bool
};

DatePickerComponent.defaultProps = {
	label: "Date",
	isRequired: true,
	variant: "small",
	inputClassname: "",
	className: "",
	format: "yyyy-MM-dd",
	popperPlacement: "bottom-end",
	calendarStartDay: 1,
	placeholder: "dd.MM.yyyy",
	popperClassName: "",
	today: true,
	disabled: false,
	timeIntervals: 15,
	showTimeSelect: false
};

export default DatePickerComponent;
