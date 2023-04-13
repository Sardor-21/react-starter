import React from "react";
import cx from "classnames";
import { Icon } from "components";

const OutlineButtonComponent = ({
	title = "",
	buttonType = "button",
	type = "primary",
	size = "md",
	className = "",
	rounded = false,
	loading = false,
	loadingIcon = "oval",
	disabled = false,
	children,
	tooltip,
	...otherProps
}) => {
	const classNames = cx(
		"btn mr-2 dark:bg-dark-3",
		rounded && ` btn-rounded btn-${type}-soft`,
		size === "md" ? "" : `btn-${size}`,
		type && `btn-outline-${type}`,
		className ? className : ""
	);

	return (
		<button type={buttonType} className={classNames} disabled={disabled} {...otherProps} title={tooltip}>
			{title && <>{title}</>} {children && <>{children}</>}
			{loading && <Icon name={loadingIcon} spinner={loading} fill="#fff" className={`ml-2 ${size === "lg" ? "w-5 h-5" : "w-4 h-4 "}`} />}
		</button>
	);
};

export default OutlineButtonComponent;
