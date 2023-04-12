import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import config from "@/config";

// import oz from "locales/oz/translation.json";
// import uz from "locales/uz/translation.json";
// import ru from "locales/ru/translation.json";
// import en from "locales/en/translation.json";
const availableLanguages = ["oz", "uz", "ru", "en"];

// const oz = require("locales/oz/translation.json");
// const uz = require("locales/uz/translation.json");
// const ru = require("locales/ru/translation.json");
// const en = require("locales/en/translation.json");

// const resources = {
// 	en: { translation: { ...en } },
// 	ru: { translation: { ...ru } },
// 	uz: { translation: { ...uz } },
// 	oz: { translation: { ...oz } }
// };

i18n
	// load translation using http -> see /public/locales
	// learn more: https://github.com/i18next/i18next-http-backend
	.use(Backend)
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		// resources,
		lng: "uz",
		fallbackLng: "uz",
		debug: false,
		whiteList: availableLanguages,
		interpolation: {
			escapeValue: false // not needed for react as it escapes by default
		},
		saveMissing: false,
		backend: {
			// loadPath: `${config.baseURL}`,
			// addPath: `${config.baseURL}`
		}
	});

export default i18n;
