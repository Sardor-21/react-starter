import React from "react";
import { useSelector } from "react-redux";
import config from "config";
// import { useLocation } from "react-router-dom";
// import get from "lodash/get";
import { helpers } from "services";
import cx from "classnames";

const SelectLang = () => {
	// const location = useLocation();
	const currentLangCode = useSelector(state => state.system.currentLangCode);
	const languages = config.API_LANGUAGES;
	// let activeLang = languages.find(l => l.code === currentLangCode);
	// let restLangs = languages.filter(l => l.code !== currentLangCode);

	// const locationPath = location.pathname.split("/");
	// const slug = locationPath[2];

	const changeLang = langCode => {
		if (currentLangCode !== langCode) {
			let item = null;
			let key = "slug";
			// if (post) {
			// 	item = post;
			// } else if (page) {
			// 	item = page;
			// }

			window.history.pushState("", "", helpers.generateNewPath(langCode, item, key));
			window.location.reload();
		}
	};

	return (
		<div className="header-top__lang">
			{languages.map((lang, key) => (
				<React.Fragment key={key}>
					<span
						className={cx("header-top__lang-item", lang.code === currentLangCode ? "active" : "")}
						onClick={() => lang.code !== currentLangCode && changeLang(lang.code)}>
						{lang.code}
					</span>
					&nbsp;&nbsp;&nbsp;
				</React.Fragment>
			))}
		</div>
	);
};

export default SelectLang;
