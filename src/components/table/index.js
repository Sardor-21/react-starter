import React, { useState } from "react";
import { Table, Tooltip } from "antd";

import { ReactComponent as DeleteIcon } from "./icons/delete.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as ConfirmIcon } from "./icons/confirm.svg";

import "./style.scss";
import { useTranslation } from "react-i18next";

function TableWithActions({
	hasConfirm,
	hasEdit,
	hasDelete,
	onConfirm,
	onEdit,
	onDelete,
	removeKey,
	onChange,
	pagination,
	columns,
	dataSource,
	rowSelection,
	rowKey,
	rowIdxKey,

	...rest
}) {
	const { t } = useTranslation();

	columns = columns.filter(item => item.noView !== true);
	const components = {
		header: {
			row: props => {
				return (
					<tr {...props}>
						{props.children}
						{dataSource?.length && hasConfirm ? <th className={`th`} style={{ width: 10 }} /> : null}
						{dataSource?.length && hasEdit ? <th className={`th`} style={{ width: 10 }} /> : null}
						{dataSource?.length && hasDelete ? <th className={`th`} style={{ width: 10 }} /> : null}
					</tr>
				);
			}
		},
		body: {
			row: row => {
				const item = dataSource?.find(item => item[rowKey] === row["data-row-key"]);
				return (
					<tr {...row}>
						{row.children}
						{dataSource?.length && hasConfirm ? (
							<td style={{ width: 10 }}>
								<Tooltip title={t("Подтвердить")}>
									<div className="action-btn confirm-btn" onClick={() => onConfirm(item)}>
										<ConfirmIcon height={16} width={16} />
									</div>
								</Tooltip>
							</td>
						) : null}
						{dataSource?.length && hasEdit ? (
							<td style={{ width: 10 }}>
								<Tooltip title={t("Редактировать")}>
									<div className="action-btn edit-btn" onClick={() => onEdit(item)}>
										<EditIcon height={16} width={16} />
									</div>
								</Tooltip>
							</td>
						) : null}
						{dataSource?.length && hasDelete ? (
							<td style={{ width: 10 }}>
								<Tooltip title={t("Удалить")}>
									<div className="action-btn delete-btn" onClick={() => onDelete(item)}>
										<DeleteIcon height={16} width={16} />
									</div>
								</Tooltip>
							</td>
						) : null}
					</tr>
				);
			}
		}
	};

	return (
		<Table
			{...{
				components,
				onChange,
				pagination,
				columns,
				dataSource,
				rowSelection,
				rowKey,
				...rest
			}}
		/>
	);
}

export default TableWithActions;
