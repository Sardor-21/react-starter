import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import get from "lodash/get";
import { Fields } from "components";
import config from "config";
import { useQueryClient } from "@tanstack/react-query";

const FmUpload = ({ isLoading, watermark, author_id, setLoading, filterType }) => {
	const [files, setValue] = useState([]);
	const [progress, setProgress] = useState("");
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (progress === 100)
			setTimeout(() => {
				setVisible(false);
				setProgress("");
				setVisible(true);
			}, 1000);
	}, [progress]);

	const queryClient = useQueryClient();
	const saveEntity = () => {
		queryClient.invalidateQueries({ queryKey: ["filemanager"] });
	};
	return (
		<div className="fm-upload">
			<Fields.UploadImage
				action={`${config.API_ROOT}/filemanager/uploads`}
				listType={"picture-card"}
				// activeFolderId={activeFolder ? activeFolder.id : ""}
				showUploadList={false}
				defaultFileList={files}
				multiple
				acceptAll
				errorCb={() => setLoading(false)}
				setProgress={setProgress}
				watermark={watermark}
				author_id={author_id}
				disabled={isLoading}
				onChange={({ file }) => {
					setLoading(true);
					let fileList = [];
					[get(file, "response", {})].forEach(f => {
						if (file.status === "done") {
							setLoading(false);
							fileList = [
								{
									...f,
									uid: f.id,
									url: get(f, "link"),
									name: f.title
								}
							];
						}
					});
					setValue([...fileList]);
					saveEntity(fileList);
				}}
				onRemove={file => {
					const keys = Object.keys(get(file, "response", {}));
					setValue([...files].filter(f => f.uid !== keys[0]));
				}}>
				<div>
					{isLoading ? (
						<div className="fm-loading">
							<div className="fm-loading__indicator" style={{ width: visible && progress > 0 ? `${progress}%` : `${0}` }} />
							{visible && progress > 0 ? <span>{progress}%</span> : null}
						</div>
					) : (
						<>
							<PlusOutlined />
							<div className="ant-upload-text">{"Загрузите"}</div>
						</>
					)}
				</div>
			</Fields.UploadImage>
		</div>
	);
};

export default FmUpload;
