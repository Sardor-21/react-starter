import useHooks from "@/hooks/useHooks";
import i18next from "i18next";
import React from "react";

const Home = () => {
	const { t } = useHooks();
	const changeLanguage = lng => {
		i18next.changeLanguage(lng);
	};
	return <div>{t("Salom")}</div>;
};

export default Home;
