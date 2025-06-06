import PropTypes from "prop-types";
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
	const {
		cityName,
		emoji,
		date,
		id,
		position: { lng, lat },
	} = city;
	return (
		<li>
			<Link className={styles.cityItem} to={`${id}?lng=${lng}&lat=${lat}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn}>&times;</button>
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
