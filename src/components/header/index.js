import { Button, Drawer } from "antd";
import React from "react";
// import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import "./style.scss";
import { get } from "lodash";
const Header = ({
	title,
	btnClick = () => {},
	btnTitle = "Добавить",
	hasBtn = true,
	hasFilter,
	filter,
	setFilter,
	children,
	meta,
	shape,
	filterWith,
	filterTitle = "Фильтр",
	btnType = "primary",
	size = "large",
	backClick,
	hasBack
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const clearForm = () => {
		navigate({
			search: qs.stringify({}, { encode: false })
		});
	};

	const to = get(meta, "currentPage", 0) * Number(get(meta, "perPage", 0));
	const from = to - Number(get(meta, "perPage", 0)) + 1;
	const total = get(meta, "totalCount", 0);
	return (
		<div className="d-flex justify-content-between align-items-center mb-20">
			<div className="d-flex align-items-center">
				{hasBack && (
					<div className={`mb-0 bb-breadcrumb`}>
						<div className="bb-breadcrumb__prev-btn" onClick={backClick ? backClick : () => navigate(-1)} />
					</div>
				)}
				<div className="title-md">{title}</div>
			</div>
			{meta && (
				<div>
					Показаны от {from} до {to < total ? to : total} из {total} записей
				</div>
			)}
			<div className="d-flex align-items-center">
				{hasBtn && (
					<Button type={btnType} size={size} className=" fw-300 ml-10" htmlType="button" onClick={btnClick} shape={shape}>
						{btnTitle}
					</Button>
				)}
				{hasFilter ? (
					<div className={`ml-2`}>
						{location.search !== "" ? <Button className="ml-10" size={"large"} onClick={() => clearForm()} icon={<CloseOutlined />} /> : null}
						<Button className="ml-10" icon={<FilterOutlined />} onClick={() => setFilter(true)} size={"large"} />
					</div>
				) : null}
			</div>
			{hasFilter && filter && (
				// ReactDOM.createPortal(
				// 	<div className={`filter-container`}>
				// 		<div className="filter-container__overlay" onClick={() => setFilter(false)} />
				// 		<div className="filter dark:bg-dark-3">
				// 			<div
				// 				onClick={() => {
				// 					setFilter(false);
				// 				}}></div>
				// 			<div className="p-10">{children}</div>
				// 		</div>
				// 	</div>,
				// 	document.getElementById("modal-root")
				// )}
				<Drawer title={filterTitle} placement="right" width={filterWith} onClose={() => setFilter(false)} open={filter}>
					{children}
				</Drawer>
			)}
		</div>
	);
};

export default Header;
