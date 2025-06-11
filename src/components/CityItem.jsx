import { useCityContext } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
		weekday: "long",
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteItem } = useCityContext();
	const {
		cityName,
		emoji,
		date,
		id,
		position: { lng, lat },
	} = city;
	async function handleDelete(e) {
		e.preventDefault();
		await deleteItem(id);
	}
	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					currentCity.id === id ? styles["cityItem--active"] : ""
				}`}
				to={`${id}?lng=${lng}&lat=${lat}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleDelete}>
					&times;
				</button>
			</Link>
		</li>
	);
}

// CityItem.propTypes = {
// 	city: PropTypes.shape({
// 		cityName: PropTypes.string,
// 	}),
// };
export default CityItem;
