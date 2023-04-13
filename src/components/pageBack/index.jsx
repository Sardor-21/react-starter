import { Button } from "antd";
import React, { memo } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

const PageBack = ({ btnClick, title, className, backClick, btnTitle = "Добавить", hasBtn, hasBack = true }) => {
	const classNames = cx("bb-breadcrumb", className);
	const navigate = useNavigate();
	return (
		<div className="d-flex justify-content-between align-items-center mb-20">
			<div className="title-md d-flex align-items-center">
				{/* {hasBack && <Breadcrumb className="mb-0" backClick={() => backClick()} />} */}
				{hasBack && (
					<div className={`mb-0 ${classNames}`}>
						<div className="bb-breadcrumb__prev-btn" onClick={backClick ? backClick : () => navigate(-1)} />
					</div>
				)}

				{title}
			</div>
			{hasBtn && (
				<Button type="primary" size="large" className="fs-14 fw-300 ml-10" htmlType="button" onClick={btnClick}>
					{btnTitle}
				</Button>
			)}
		</div>
	);
};

export default memo(PageBack);
