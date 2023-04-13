import React, { useRef } from "react";
import get from "lodash/get";
import "./styles.scss";
import cx from "classnames";
import { DeleteOutlined } from "@ant-design/icons";

const TableComponent = ({ columns = [], rowKey = "id", dataSource = [], isFetched = false, deleteAction, className, onRowClick, onSave }) => {
	const classes = cx(`intro-y col-span-12 overflow-auto ${onRowClick ? "cursor-pointer" : ""}`, !isFetched && "--loading", className && className);
	const input = useRef(null);

	return (
		<div className={classes}>
			<table className="table table-report main-table ">
				<thead className="main-table-thead">
					<tr className="main-table-tr bg-gray-700 dark:bg-dark-1 text-white">
						{columns.map((col, i) => (
							<th key={i} className={`main-table-th ${get(col, "className")}`}>
								{get(col, "title")}
							</th>
						))}
						{deleteAction && <th className="whitespace-nowrap w-50" />}
					</tr>
				</thead>
				{dataSource.length > 0 && (
					<tbody>
						{dataSource.map(item => {
							return (
								<tr key={item[rowKey]} className="editable__row">
									{columns.map((col, i) => (
										<td key={i} className={`${get(col, "className")} editable__td`}>
											{col.editable && (
												<div
													className={"editable__input"}
													suppressContentEditableWarning={true}
													contentEditable={true}
													ref={input}
													defaultValue={item[col.dataIndex]}
													onKeyDown={event => {
														if (col.editable && (event.keyCode === 13 || event.which === 13)) {
															onSave({
																id: get(item, "id"),
																language: col.dataIndex,
																translation: get(event.target, "textContent")
															});

															if (document.activeElement instanceof HTMLElement) {
																document.activeElement.blur();
															}
														}
													}}>
													{item[col?.dataIndex]}
												</div>
											)}
											{!col.editable && col?.render(item[col?.dataIndex], item)}
										</td>
									))}
									{deleteAction && (
										<td className="editable__td w-50">
											{deleteAction && (
												<div className="cursor-pointer d-flex justify-content-end" onClick={() => deleteAction(item)}>
													<DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
												</div>
											)}
										</td>
									)}
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
		</div>
	);
};

export default TableComponent;
