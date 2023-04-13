import React from "react";
import cx from "classnames";
import { Icon } from "components";

const DefaultButtonComponent = ({
	title = "",
	buttonType = "button",
	type = "blue",
	size = "md",
	className = "",
	rounded = false,
	loading = false,
	loadingIcon = "oval",
	prepend,
	append,
	tooltip,
	children,
	...otherProps
}) => {
	const classNames = cx("btn me-2", size === "md" ? "" : `btn-${size}`, rounded && `btn-rounded-${type}`, type && `btn-${type}`, className ? className : "");

	return (
		<button type={buttonType} className={classNames} {...otherProps} disabled={loading} title={tooltip}>
			{prepend && prepend}
			{title && <>{title}</>} {children && <>{children}</>}{" "}
			{loading && <Icon name={loadingIcon} spinner={loading} fill="#fff" className={`ms-2 ${size === "lg" ? "w-5 h-5" : "w-4 h-4 "}`} />}
			{append && append}
		</button>
	);
};

export default DefaultButtonComponent;
