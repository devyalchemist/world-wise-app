import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
	useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCityContext } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition,
	} = useGeolocation();
	const { cities } = useCityContext();
	const [mapPosition, setMapPosition] = useState(
		geoLocationPosition || [40, 0]
	);
	const { lat, lng } = useUrlPosition();

	useEffect(() => {
		if (lat && lng) {
			console.log(lat, lng);
			setMapPosition([lat, lng]);
			// setFormMapPosition([lat, lng])
		}
	}, [lat, lng]);
	useEffect(() => {
		if (geoLocationPosition)
			setMapPosition([geoLocationPosition.lat, geoLocationPosition.lat]);
	}, [geoLocationPosition]);
	// const { lat, lng } = currentCity?.position;

	return (
		<div className={styles.mapContainer}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your Location"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={13}
				scrollWheelZoom={true}
				className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => {
					return (
						<Marker
							key={city.id}
							position={[city.position.lat, city.position.lng]}>
							<Popup>
								<span>{city.emoji}</span> <span>{city.cityName}</span>
							</Popup>
						</Marker>
					);
				})}
				{/* <Marker position={mapPosition}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

// function FormNavigate() {
// 	const { addCity } = useCityContext();

// 	const changePosition = useNavigate();
// 	const [randomizer, setRandomizer] = useState(0);

// 	function createCity(val) {
// 		setRandomizer((prev) => prev + 1);
// 		const cityObject = {
// 			cityName: "Fakecity" + randomizer.toString(),
// 			country: "Fakecity" + randomizer.toString(),
// 			emoji: "FF",
// 			date: "2027-10-31T15:59:59.138Z",
// 			notes: "My favorite city so far!",
// 			position: {
// 				lat: val.lat,
// 				lng: val.lng,
// 			},
// 			id: Math.floor(Math.random() * 1000000),
// 		};
// 		addCity(cityObject);
// 	}
// 	useMapEvent({
// 		click: (e) => {
// 			changePosition(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
// 			createCity({ lat: e.latlng.lat, lng: e.latlng.lng });
// 		},
// 	});
// 	return null;
// }
function DetectClick() {
	const changePosition = useNavigate();

	useMapEvent({
		click: (e) => {
			changePosition(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
		},
	});
	return null;
}
export default Map;
