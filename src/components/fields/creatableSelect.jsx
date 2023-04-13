import React, { useState } from "react";
import { Select, notification } from "antd";
// import Actions from "modules/entity/actions";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import uniqBy from "lodash/uniqBy";

const CreatableTagSelect = ({ setFieldValue, values, initialValue }) => {
	const [tagLoading, setTagLoading] = useState(false);
	const [tags, setTags] = useState(initialValue);

	const { t } = useTranslation();
	const dispatch = useDispatch();

	// const createTag = (title) => {
	//   setTagLoading(true);
	//   dispatch(Actions.Form.request({
	//     method: 'post',
	//     entity: 'tag',
	//     name: 'create',
	//     url: `/admin/tags`,
	//     values: {
	//       status: 1,
	//       title: title
	//     },
	//     cb: {
	//       success: (data) => {
	//         notification["success"]({
	//           message: t("Успешно"),
	//           duration: 2
	//         });
	//         setTags([data, ...tags]);
	//         setFieldValue("tags", [...values.tags, String(data.id)]);
	//       },
	//       error: () => {
	//         notification["error"]({
	//           message: t("Что-то пошло не так"),
	//           duration: 2
	//         });
	//       },
	//       finally: () => {
	//         setTagLoading(false);
	//       },
	//     }
	//   }))
	// };

	// const loadTags = (searchValue) => {
	//   dispatch(Actions.LoadOne.request({
	//     id: '#searchTag',
	//     primaryKey: '#searchTag',
	//     entity: 'tag',
	//     name: `tags-s`,
	//     url: `/admin/tags`,
	//     dataKey: 'data',
	//     params: {
	//       extra: {title: searchValue}
	//     },
	//     normalizeData: false,
	//     cb: {
	//       success: (data) => {
	//         setTags(uniqBy([...data.data, ...tags], 'id'))
	//       },
	//       error: () => {
	//         notification["error"]({
	//           message: t("Что-то пошло не так"),
	//           duration: 2
	//         });
	//       },
	//       finally: () => {
	//       },
	//     }
	//   }))
	// };

	const { Option } = Select;
	const options = tags.map(tag => <Option key={tag.id}>{tag.title}</Option>);

	return (
		<div className="field-container mb-20">
			<div className="ant-label">{t("Тег")}</div>
			<Select
				mode="tags"
				size={"large"}
				placeholder={t("Введите теги")}
				style={{ width: "100%" }}
				onChange={value => {}}
				onSelect={value => {
					let findFromOptions = tags.find(t => t.title === value);
					if (!Number(value)) {
						if (findFromOptions) {
							setFieldValue("tags", [...values.tags, String(findFromOptions.id)]);
						} else {
							// createTag(value)
						}
					} else {
						setFieldValue("tags", [...values.tags, value]);
					}
				}}
				tokenSeparators={[","]}
				filterOption={false}
				loading={tagLoading}
				value={values.tags}
				// onSearch={searchValue => loadTags(searchValue)}
				onDeselect={option => {
					const newArray = values.tags.filter(t => t !== option);
					setFieldValue("tags", newArray);
				}}>
				{options}
			</Select>
		</div>
	);
};

export default CreatableTagSelect;
