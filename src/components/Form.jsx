// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useCityContext } from "../contexts/CitiesContext";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const { lat, lng } = useUrlPosition();
	const [emoji, setEmoji] = useState("");
	const [isLoadingFormData, setIsLoadingFormData] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [geoCodingError, setGeoCodingError] = useState("");
	const navigate = useNavigate();

	const { addCity, isLoading, getCurrentCity } = useCityContext();

	useEffect(() => {
		if (!lat || !lng) return;
		async function fetchData() {
			try {
				setIsLoadingFormData(true);
				setGeoCodingError("");
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				if (!res.ok) throw new Error("failed to load data");
				const data = await res.json();
				if (!data.countryCode)
					throw new Error("That doesn't seem to be a country");
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
				console.log(data);
			} catch (error) {
				console.error(error.message);
				setGeoCodingError(error.message);
			} finally {
				setIsLoadingFormData(false);
			}
		}
		fetchData();
	}, [lat, lng]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!cityName || !date) return;
		const newCity = {
			id: uuidv4(),

			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};
		await addCity(newCity);
		navigate("../cities");
	}
	if (isLoadingFormData) return <Spinner />;
	if (!lat || !lng)
		return <Message message="Start by clicking somewhere on the map" />;
	if (geoCodingError) return <Message message={geoCodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input
					id="date"
					onChange={(e) => setDate(e.target.value)}
					value={date}
				/> */}
				<DatePicker
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat={"dd/MM/yyyy"}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type={"primary"}>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
