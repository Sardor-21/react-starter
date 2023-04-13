import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-oks";
import cx from "classnames";
import { FileManager } from "components";
import "./style.scss";

const CkeditorField = ({ placeholder, label, className, field, form: { errors, setFieldValue, setFieldTouched, touched }, message = "Требуется ввод" }) => {
	const classNames = cx("field-container ant-row ant-form-item", touched[field.name] && errors[field.name] && "has-error", className);
	const editorEl = useRef(null);
	const [fmVisible, toggleFm] = useState(false);
	const insertImage = ({ url = "", alt = "" }) => {
		const editor = editorEl.current.editor;
		const content = `<img src='${url}' alt='${alt}'/>`;

		const viewFragment = editor.data.processor.toView(content);
		const modelFragment = editor.data.toModel(viewFragment);
		editor.model.insertContent(modelFragment);
	};

	const appendImageButton = () => {
		const btn = document.createElement("div");

		btn.className = "image-upload-btn";
		btn.onclick = () => toggleFm(true);
		const selector = document.querySelector(".ck-file-dialog-button");

		selector && selector.appendChild(btn);
	};

	return (
		<div className={classNames}>
			{fmVisible && <FileManager visible={fmVisible} onCancel={() => toggleFm(false)} addImage={insertImage} />}
			{label && <div className="ant-label">{label}</div>}
			<CKEditor
				ref={editorEl}
				editor={ClassicEditor}
				onReady={() => {
					appendImageButton();
				}}
				config={{
					heading: {
						options: [
							{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
							{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
							{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
							{ model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" }
						]
					},
					removePlugins: ["MediaEmbedToolbar"],
					fontSize: {
						defaultLabel: "17px",
						options: [
							{
								title: "tiny",
								model: "11px"
							},
							{
								title: "small",
								model: "14px"
							},
							{
								title: "default",
								model: "17px"
							},
							{
								title: "big",
								model: "20px"
							},
							{
								title: "huge",
								model: "23px"
							}
						]
					},
					toolbar: {
						items: [
							"heading",
							"|",
							"bold",
							"italic",
							"link",
							"bulletedList",
							"numberedList",
							"|",
							"indent",
							"outdent",
							"|",
							"imageUpload",
							"blockQuote",
							"insertTable",
							"undo",
							"redo",
							"alignment",
							"code",
							"codeBlock",
							"fontBackgroundColor",
							"fontColor",
							"fontSize",
							"fontFamily",
							"highlight",
							"horizontalLine",
							"removeFormat",
							"underline"
						]
					},
					image: {
						toolbar: ["imageTextAlternative", "|", "imageStyle:alignLeft", "imageStyle:full", "imageStyle:alignRight", "imageStyle:alignCenter"],

						styles: ["full", "alignLeft", "alignCenter", "alignRight"]
					},
					table: {
						contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableCellProperties", "tableProperties"]
					},
					placeholder: placeholder,
					codeBlock: {
						languages: [
							{
								language: "javascript",
								label: "JavaScript",
								class: "js javascript js-code"
							}
						]
					},
					link: {
						decorators: {
							addClassStyle1: {
								mode: "manual",
								label: "Highlight link",
								attributes: {
									class: "highlight-link"
								}
							},
							openInNewTab: {
								mode: "manual",
								label: "Open in a new tab",
								attributes: {
									target: "_blank",
									rel: "noopener noreferrer"
								}
							}
						}
					}
				}}
				onBlur={() => setFieldTouched(field.name, true)}
				data={field.value}
				onChange={(event, editor) => {
					setFieldValue(field.name, editor.getData());
				}}
			/>
			{touched[field.name] && errors[field.name] && <small className="ant-form-explain">{message}</small>}
		</div>
	);
};

export default CkeditorField;
