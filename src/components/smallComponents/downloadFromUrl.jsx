import React, { useState } from "react";
// import { Icon, notification } from "antd";
import styled from "styled-components";
// import ModuleActions from "modules/entity/actions";

const DownloadFromUrl = ({ className, text, filterType }) => {
	const [value, setValue] = useState("");

	// const onEnter = (event) => {
	//   if (event.keyCode === 13) {
	//       setLoading(true);
	//       dispatch(ModuleActions.Form.request({
	//         entity: "files",
	//         name: `allFiles-${filterType}`,
	//         url: '/filemanager/uploads-url',
	//         method: 'post',
	//         values: {
	//           url: value
	//         },
	//         normalizeData: data => {
	//           return {
	//             ...data,
	//             uid: data.id,
	//             url: get(data, "link"),
	//             name: data.title
	//           }
	//         },
	//         primaryKey: "id",
	//         prependData: true,
	//         cb: {
	//           success: () => {},
	//           error: () => {
	//             notification["error"]({
	//               message: t("Что-то пошло не так"),
	//               duration: 2
	//             });
	//           },
	//           finally: () => {
	//             setLoading(false);
	//             setValue("")
	//           },
	//         }
	//       }))
	//   }
	// };

	return (
		<SearchInput className={className}>
			<input
				type="search"
				onChange={e => {
					setValue(e.target.value);
				}}
				placeholder={text}
				value={value}
				// onKeyDown={(e) => onEnter(e)}
			/>
			{/* <Icon type="download" /> */}
		</SearchInput>
	);
};

export default DownloadFromUrl;

const SearchInput = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: 220px;
	border-radius: 4px;
	border: solid 1px rgb(210, 210, 210);
	background-color: rgb(250 250 250);
	position: relative;
	overflow: hidden;
	input {
		width: 100%;
		background-color: transparent;
		display: inline-block;
		height: 100%;
		line-height: 40px;
		outline: none 0;
		padding: 0 30px 0 10px;
		border: none 0;
	}
	.anticon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
`;
