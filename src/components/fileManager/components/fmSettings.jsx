import React, { useEffect, useState } from "react";
import { Radio, Button, Input, Modal } from "antd";
import get from "lodash/get";
// import EntityActions from "modules/entity/actions";
import { useTranslation } from "react-i18next";
import { useDelete,  usePost } from "hooks/crud";
import { useQueryClient } from "@tanstack/react-query";

const FmSettings = ({ selected, filterType, setFilterType }) => {
	const [fileTitle, setFileTitle] = useState({ title: get(selected, "title"), id: "" });
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const { mutate } = useDelete();

	const { mutate: updateAction } = usePost({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["filemanager"] });
		}
	});

	useEffect(() => {
		setFileTitle({ title: get(selected, "title"), id: get(selected, "id") });
	}, [get(selected, "title")]);

	const { t } = useTranslation();

	const changeFileName = () => {
		updateAction({ url: `/filemanager/${fileTitle.id}`, method: "put", data: { title: fileTitle.title } });
	};

	const onDeleteHandler = id => {
		Modal.confirm({
			title: t("Вы действительно хотите удалить?"),
			okText: t("да"),
			okType: "danger",
			cancelText: t("нет"),
			confirmLoading: true,
			onOk: () => {
				setLoading(true);
				mutate({
					url: `/filemanager/${id}`,
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: [`allFiles-${filterType}`] });
						setLoading(false);
					},
					onError: () => {
						setLoading(false);
					}
				});
			}
		});
	};

	const onEnter = event => {
		if (event.keyCode === 13) {
			changeFileName();
		}
	};

	return (
		<div className="fm-settings">
			<div style={{ marginBottom: "20px" }}>
				<div className="label">Фильтр</div>
				<Radio.Group
					defaultValue={filterType}
					onChange={e => {
						setFilterType(e.target.value);
					}}>
					<Radio value="images">Картинки</Radio>
					<Radio value="documents">Документы</Radio>
				</Radio.Group>
			</div>
			{selected && (
				<>
					<div style={{ marginBottom: "30px" }}>
						<div className="label">Переименовать названия</div>
						<Input
							name="alt"
							placeholder="текст"
							value={fileTitle.title}
							onChange={e => setFileTitle(p => ({ ...p, title: e.target.value }))}
							onKeyDown={e => onEnter(e)}
						/>
					</div>
					<div className="delete-image">
						<div className="label">Так же можете удалить картинку.</div>
						<Button type="primary" htmlType="button" danger onClick={() => onDeleteHandler(get(selected, "id"))} loading={loading}>
							Удалить
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default FmSettings;
