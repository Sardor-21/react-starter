// import { usePost } from "hooks/crud";
// import { get } from "lodash";
// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// const FileUpload = ({ multiple }) => {
// 	const { mutate, data } = usePost();
// 	const onDrop = useCallback(files => {
// 		let formData = new FormData();
// 		files.forEach((file, i) => formData.append(`files[${i}]`, file));

// 		mutate({
// 			url: `/filemanager/uploads`,
// 			method: "post",
// 			data: formData
// 		});
// 		// Do something with the files
// 	}, []);
// 	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
// 	return (
// 		<div {...getRootProps()}>
// 			<input {...getInputProps()} multiple={multiple} />
// 			{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
// 			{get(data, "data", []).map((item, idx) => (
// 				<img key={idx} src={get(item, "thumbnails.normal.src")} alt="" />
// 			))}
// 		</div>
// 	);
// };

// export default FileUpload;

// import React from "react";
// import axios from "axios";
// import { Upload } from "antd";
// import { storage } from "services";
// import get from "lodash/get";

// const UploadImage = props => {
// 	const token = storage.get("token");
// 	const { setProgress } = props;

// 	const config = {
// 		onUploadProgress: function(progressEvent) {
// 			const { loaded, total } = progressEvent;
// 			let percent = Math.floor((loaded * 100) / total);
// 			setProgress(percent);
// 		},
// 		headers: {
// 			Authorization: `Bearer ${token}`
// 		}
// 	};

// 	// const {acceptAll, activeFolderId, watermark, author_id} = props;
// 	const { acceptAll, activeFolderId, author_id } = props;

// 	const customRequest = options => {
// 		const data = new FormData();
// 		data.append("files", options.file);
// 		if (activeFolderId) {
// 			data.append("folder_id", activeFolderId);
// 		}
// 		// if (watermark) {
// 		// 	data.append("watermark", "1");
// 		// }
// 		if (author_id) {
// 			data.append("author_id", author_id);
// 		}

// 		axios
// 			.post(options.action, data, config)
// 			.then(res => {
// 				options.onSuccess(res.data, options.file);
// 			})
// 			.catch(err => {});
// 	};

// 	const onPreview = file => {
// 		let url = "";
// 		if (file.url) {
// 			url = file.preview;
// 		} else {
// 			const keys = [get(file, "response", {})];
// 			url = get(file, ["response", keys[0], "link"]);
// 		}
// 		return window.open(url);
// 	};

// 	return (
// 		<Upload
// 			accept={acceptAll ? "" : "image/png,image/jpeg,image/jpeg,image/bmp,image/svg"}
// 			{...props}
// 			{...{
// 				customRequest,
// 				onPreview
// 			}}
// 		/>
// 	);
// };

// export default UploadImage;
