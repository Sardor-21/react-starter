import React, { useState } from "react";

import "./style.scss";
import { Modal } from "antd";

// import FMFolders from "./components/fmFolders";
import FMList from "./components/fmList";
import FMSettings from "./components/fmSettings";

import get from "lodash/get";

const FileManager = ({
	addImage,
	// watermark = false,
	author_id,
	visible = false,
	onCancel = () => {},
	isDocument
}) => {
	const [isLoading, setLoading] = useState(false);
	const [size, setSize] = useState("front");
	const [alt, setAltText] = useState("");
	const [selected, setSelected] = useState(null);
	const [filterType, setFilterType] = useState(isDocument ? "documents" : "images");
	const url = get(selected, `thumbnails.low.src`, "");
	return (
		<Modal
			className="file-manager"
			open={visible}
			onOk={() => {
				addImage({ url, alt, selected });
				onCancel();
				setTimeout(() => {
					setAltText("");
					setSelected(null);
				}, 300);
			}}
			onCancel={onCancel}
			closable={true}
			destroyOnClose
			title="File Manager"
			width={1048}>
			<div className="fm-block">
				<FMList
					{...{
						selected,
						author_id,
						setSelected,
						filterType,

						setLoading,
						isLoading
					}}
				/>
				<FMSettings
					{...{
						size,
						setSize,
						selected,
						setAltText,
						filterType,
						setFilterType
					}}
				/>
			</div>
		</Modal>
	);
};

export default FileManager;
