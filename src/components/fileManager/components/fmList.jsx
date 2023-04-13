import React, { useState } from "react";
import { helpers } from "services";
import { get } from "lodash";
import useIntersectionObserver from "./loadMore";
import { Input } from "components/smallComponents";
import FMUpload from "./fmUpload";
import { useGetInfiniteScroll } from "hooks/crud";
import { Button, notification } from "antd";

const FmList = ({ selected, setSelected, watermark, author_id, filterType, setLoading, isLoading, activeFolder }) => {
	const [queryP, setQueryP] = useState("");

	const { data, fetchNextPage, hasNextPage } = useGetInfiniteScroll({
		name: `allFiles-${filterType}`,
		url: "/filemanager",
		params: {
			limit: 20,
			sort: "-id",
			extra: {
				title: queryP,
				ext: filterType === "images" ? ["jpg", "jpeg", "JPG", "PNG", "JPEG", "png", "svg"] : ["docx", "xsl", "xslx", "txt", "doc", "pdf"]
			}
		}
	});

	const copyToClipboard = str => {
		var input = document.createElement("input");
		input.value = str;
		document.body.appendChild(input);
		input.select();
		document.execCommand("copy");
		document.body.removeChild(input);

		notification["success"]({
			message: "Упешно скопирован",
			duration: 2
		});
	};

	const loadMoreButtonRef = React.useRef();
	useIntersectionObserver({
		target: loadMoreButtonRef,
		onIntersect: fetchNextPage,
		enabled: hasNextPage
	});
	return (
		<div className="fm-list__wrapper">
			<div className="inputs-row">
				<Input name="alt" placeholder="Фотобанк ID" value={queryP} onChange={e => setQueryP(e.target.value)} size={"large"} />
			</div>
			{filterType === "images" ? (
				<div className="fm-list">
					<FMUpload {...{ setLoading, watermark, author_id, isLoading, filterType }} />
					{data?.pages?.map(item =>
						item?.data?.map((chilItem, idx) => (
							<div
								className={`image-file ${get(selected, "id") === chilItem.id ? "selected" : ""}`}
								key={idx}
								onClick={() => setSelected(chilItem)}>
								<img src={get(chilItem, "thumbnails.small.src")} alt="" className="image-file__item" />
								<div className="image-file__title">{get(chilItem, "title")}</div>
							</div>
						))
					)}
					<div style={{ height: 0 }}>
						<button
							ref={loadMoreButtonRef}
							style={{ opacity: "0" }}
							onClick={() => {
								fetchNextPage();
							}}
							disabled={!hasNextPage}></button>
					</div>
				</div>
			) : (
				<div className="fm-list__doc">
					<FMUpload {...{ watermark, setLoading, isLoading, filterType, activeFolder }} />
					{data?.pages?.map(item =>
						item?.data?.map((chilItem, idx) => (
							<div
								className={`doc-file ${get(selected, "id") === chilItem.id ? "selected" : ""}`}
								key={chilItem.id}
								onClick={() => setSelected(chilItem)}>
								<div className="doc-file__item">
									<div className="doc-file__ext">{get(chilItem, "ext")}</div>
									<div className="doc-file__content">
										<div className="doc-file__title">{get(chilItem, "title")}</div>
										<div className="d-flex fs-12">
											<div className="w-50p pr-10 d-flex">
												{/*<div className="fw-500">Размер:</div>*/}
												<div className="">{helpers.formatBytes(get(chilItem, "size"))}</div>
											</div>
											<div className="w-50p pl-10 d-flex">
												{/*<div className="fw-500">Дата:</div>*/}
												<div className="">{helpers.formatDate(get(chilItem, "created_at"))}</div>
											</div>
											<div className="copy-to-clipboard">
												<Button
													type="primary"
													size="small"
													icon="copy"
													style={{
														marginLeft: "10px"
													}}
													onClick={() => copyToClipboard(get(chilItem, "thumbnails.small.src"))}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						))
					)}
					<div style={{ height: 0 }}>
						<button
							ref={loadMoreButtonRef}
							style={{ opacity: "0" }}
							onClick={() => {
								fetchNextPage();
							}}
							disabled={!hasNextPage}></button>
					</div>
				</div>
			)}
		</div>
	);
};
export default FmList;
