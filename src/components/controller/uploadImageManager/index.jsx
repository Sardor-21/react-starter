import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useDelete, usePost } from "hooks/crud";
import { get } from "lodash";

const App = () => {
	const [previewOpen, setPreviewOpen] = useState({ modal: false, title: "", url: "" });
	const [fileList, setFileList] = useState([]);

	const handlePreview = async file => {
		setPreviewOpen({ url: file.url || file.preview, modal: true, title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1) });
	};
	const { mutate: deleteMutate } = useDelete();
	const deleteData = file => {
		deleteMutate({
			url: `/filemanager/${file}`,
			onSuccess: () => {
				setFileList([...fileList.filter(item => item.id !== file)]);
			}
		});
	};
	const { mutate } = usePost({
		onSuccess: data => {
			const newData = get(data, "data").map(item => {
				return {
					...item,
					url: get(item, "thumbnails.low.src")
				};
			});
			setFileList([...fileList, ...newData]);
		}
	});

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8
				}}>
				Upload
			</div>
		</div>
	);
	const onDrop = file => {
		let formData = new FormData();
		formData.append(`files[${0}]`, file);
		mutate({
			url: `/filemanager/uploads`,
			method: "post",
			data: formData
		});
	};

	return (
		<>
			<Upload
				customRequest={options => {
					// console.log(options);
				}}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				data={file => {
					onDrop(file);
				}}
				onRemove={value => {
					deleteData(value.id);
				}}>
				{fileList.length >= 8 ? null : uploadButton}
			</Upload>
			<Modal
				open={previewOpen.modal}
				title={previewOpen.title}
				footer={null}
				onCancel={() => {
					setPreviewOpen({ modal: false, title: "", url: "" });
				}}>
				<img
					alt="example"
					style={{
						width: "100%"
					}}
					src={previewOpen.url}
				/>
			</Modal>
		</>
	);
};
export default App;
