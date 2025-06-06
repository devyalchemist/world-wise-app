import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
function CountryList({ isLoading, cities }) {
	if (isLoading) return <Spinner />;
	if (!cities.length)
		return <Message message={"Add your first city by clicking on the map"} />;
	// const countries = [];
	// cities.forEach((city) => {
	// 	if (!countries.map((e) => e.country).includes(city.countries)) {
	// 		countries.push(city);
	// 	}
	// });
	//alternative to the first option
	const countries = cities.reduce((arr, city) => {
		if (!arr.map((val) => val.country).includes(city.country))
			return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);
	console.log(countries);
	return (
		<div className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem key={country.country} country={country} />
			))}
		</div>
	);
}

// CountriesList.propTypes = {
// 	isLoading: PropTypes.bool.isRequired,
// 	cities: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// 			name: PropTypes.string.isRequired,
// 		})
// 	).isRequired,
// };
export default CountryList;
