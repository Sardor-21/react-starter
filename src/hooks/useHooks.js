import { get, truncate, isArray, uniqBy } from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import qs from "qs";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
const useHooks = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const params = useParams();
	const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	const navigate = useNavigate();
	// const dispatch = useDispatch();

	return { query, location, params, get, truncate, isArray, t, navigate, uniqBy, qs };
};

export default useHooks;
