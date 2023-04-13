import config from "@/config";

export const initialSystem = {
  currentLangCode: config.DEFAULT_LANGUAGE,
};

export const systemReducer = (set) => {
  return {
    changeLang: (action) => {
      return set(() => {
        return {
          system: {
            currentLangCode: action,
          },
        };
      });
    },
  };
};
