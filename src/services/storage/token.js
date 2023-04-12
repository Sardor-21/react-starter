import { getStorage } from "./storage";

const getToken = () => {
	return getStorage().getItem("token");
};

const setToken = (token) => {
	return getStorage().setItem("token", token);
};

const removeToken = () => {
	return getStorage().removeItem("token");
};

export default { getToken, setToken, removeToken };
