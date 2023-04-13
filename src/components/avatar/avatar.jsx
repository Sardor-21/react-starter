import React from "react";
import avatar from "./avatar.svg";
import pattern from "assets/images/pattern.jpg";
import "./avatar.scss";
import cx from "classnames";

const Avatar = ({ className, size, image, hasBadge, isProduct, isRectangle }) => {
	const classNames = cx("avatar", `avatar--${size}`, isRectangle ? "avatar--rectangle" : "", className);

	return (
		<div className={classNames}>
			{isProduct ? <img src={image ? image : pattern} alt="" /> : <img src={image ? image : avatar} alt="" />}

			{hasBadge ? <span className="avatar__badge" /> : null}
		</div>
	);
};

export default Avatar;
