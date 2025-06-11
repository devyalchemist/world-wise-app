import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCityContext } from "../contexts/CitiesContext";
import { useEffect } from "react";
import { useAuth } from "../contexts/useAuthContext";
import { useNavigate } from "react-router-dom";
function CityList() {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [navigate, isAuthenticated]);
	const { isLoading, cities } = useCityContext();
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message={"Add your first city by clicking on the map"} />;
	return (
		<div className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</div>
	);
}

// CityList.propTypes = {
// 	isLoading: PropTypes.bool.isRequired,
// 	cities: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// 			name: PropTypes.string.isRequired,
// 		})
// 	).isRequired,
// };
export default CityList;
