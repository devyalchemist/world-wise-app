import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
function CityList({ isLoading, cities }) {
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
