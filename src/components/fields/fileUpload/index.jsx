import React, { useEffect, useState } from "react";
import { PlusOutlined, FileImageOutlined, FrownOutlined } from "@ant-design/icons";
import { Modal, notification, Spin, Upload } from "antd";
import { useDelete,  usePost } from "hooks/crud";
import { get } from "lodash";

const App = ({ form: { setFieldValue, setFieldTouched, touched, errors }, limit = 1, field, className, label, message = "Файл не загружен" }) => {
	const [previewOpen, setPreviewOpen] = useState({ modal: false, title: "", url: "" });

	const newData =
		get(field, "value")?.length > 0 &&
		get(field, "value").map(item => {
			const url = get(item, "domain") + get(item, "folder") + get(item, "file");
			return {
				...item,
				uid: get(item, "id"),
				name: get(item, "title"),
				url
			};
		});
	const [fileList, setFileList] = useState(newData || []);
	useEffect(() => {
		setFileList(newData || []);
	}, [get(field, "value")]);
	const handlePreview = async file => {
		setPreviewOpen({ url: file.url || file.preview, modal: true, title: file.name || file.url.substring(file.url.lastIndexOf("/") + 1) });
	};
	const { mutate: deleteMutate } = useDelete();
	const deleteData = file => {
		deleteMutate({
			url: `/filemanager/${file}`,
			onSuccess: () => {
				const filterData = fileList.filter(item => item.id !== file);
				setFileList(filterData);
				setFieldValue(get(field, "name"), filterData?.length > 0 ? filterData : "");
			}
		});
	};
	const { mutate, isLoading } = usePost({
		onSuccess: data => {
			const newData = get(data, "data").map(item => {
				const url = get(item, "domain") + get(item, "folder") + get(item, "file");
				return {
					...item,
					url
				};
			});
			setFieldValue(get(field, "name"), [...get(field, "value"), ...newData]);

			notification.success({
				message: "Успешно добавлено",
				icon: <FileImageOutlined style={{ color: "green" }} />
			});
		},
		onError: err => {
			notification.error({
				message: get(err, "message") ? get(err, "message") : "Что-то пошло не так",
				icon: <FrownOutlined style={{ color: "red" }} />
			});
		}
	});

	const onDrop = file => {
		let formData = new FormData();
		formData.append(`files[${0}]`, file);
		mutate({
			url: `/filemanager/uploads`,
			method: "post",
			data: formData
		});
	};
	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				className="ant-label"
				style={{
					marginTop: 8
				}}>
				Загрузить
			</div>
		</div>
	);
	return (
		<div className={`${className} mt-10 mb-10`}>
			{label && <div className="ant-label">{label}</div>}
			<Upload
				name={field.name}
				disabled={isLoading}
				customRequest={options => {
					// console.log(options);
				}}
				className={fileList.length ? "" : touched[field.name] && errors[field.name] ? "ant-upload-select__error" : ""}
				maxCount={1}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				data={file => {
					onDrop(file);
				}}
				onBlur={() => setFieldTouched(field.name, true)}
				onRemove={value => {
					deleteData(value.id);
				}}>
				{/* {isLoading ?  : uploadButton} */}
				{isLoading ? <Spin /> : fileList.length >= limit ? null : uploadButton}
			</Upload>
			{fileList.length ? null : touched[field.name] && errors[field.name] && <small className="async-select__error">{message}</small>}

			<Modal
				open={previewOpen.modal}
				title={previewOpen.title}
				footer={null}
				onCancel={() => {
					setPreviewOpen({ modal: false, title: "", url: "" });
				}}>
				{previewOpen?.url?.includes("mp4") ? (
					<>
						<video width="100%" height="240" controls>
							<source src={previewOpen?.url} type="video/mp4" />
							<source src={previewOpen?.url} type="video/ogg" />
						</video>
					</>
				) : (
					<img
						alt="example"
						style={{
							width: "100%"
						}}
						src={previewOpen.url}
					/>
				)}
			</Modal>
		</div>
	);
};
export default App;
