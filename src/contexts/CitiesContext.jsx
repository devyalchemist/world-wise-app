import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { getApiBase } from "../../utils/envApi";
const initialState = {
	cities: [],
	isLoading: false,
	currentCity: {},
	error: "",
};
const CityContext = createContext();
const BASE_URL = getApiBase();

function reducer(state, action) {
	switch (action.type) {
		case "cities/loaded":
			return { ...state, cities: action.payload, isLoading: false };
		case "city/created":
			return {
				...state,
				cities: [...state.cities, action.payload],
				currentCity: action.payload,
			};
		case "city/deleted":
			return {
				...state,
				cities: state.cities.filter((city) => city.id !== action.payload),
				isLoading: false,
			};
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: action.payload };
		case "rejected":
			return { ...state, isLoading: false, error: action.payload };
		case "loading":
			return { ...state, isLoading: true };
		case "resetCity":
			return { ...state, currentCity: {} };
		default:
			throw new Error("No parameters match the action");
	}
}

function CitiesProvider({ children }) {
	// const [cities, setCities] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [currentCity, setCurrentCity] = useState({});
	// const [currentPosition, setCurrentPosition] = useState({});

	const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
		reducer,
		initialState
	);
	function resetCurrentCity() {
		dispatch({ type: "resetCity" });
	}
	useEffect(() => {
		async function fetchCountry() {
			dispatch({ type: "loading" });
			try {
				const result = await fetch(`${BASE_URL}/cities`);
				if (!result.ok)
					throw new Error("An error occured while fetching data!");
				const data = await result.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch (err) {
				dispatch({ type: "rejected", payload: err.message });
			}
		}
		fetchCountry();
	}, []);

	const getCurrentCity = useCallback(
		async function getCurrentCity(id) {
			if (Number(id) === currentCity.id) return;
			dispatch({ type: "loading" });

			try {
				const result = await fetch(`${BASE_URL}/cities/${id}`);
				if (!result.ok)
					throw new Error("An error occured while fetching cities!");
				const data = await result.json();
				dispatch({ type: "city/loaded", payload: data });
			} catch (err) {
				dispatch({ type: "rejected", payload: err.message });
			}
		},
		[currentCity.id]
	);

	async function deleteItem(val) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${BASE_URL}/cities/${val}`, {	
				method: "DELETE",
			});
			dispatch({ type: "city/deleted", payload: val });
		} catch (err) {
			console.error(err.message);
		}
	}
	
	async function addCity(val) {
		dispatch({ type: "loading" });

		try {
			const result = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(val),
				headers: { "Content-Type": "application/json" },
			});
			if (!result.ok) throw new Error("An error occured while creating city!");
			const data = await result.json();
			dispatch({ type: "city/created", payload: data });
			dispatch({ type: "city/loaded", payload: data });
		} catch (err) {
			dispatch({ type: "rejected", payload: err.message });
		}
	}
	// function clearCurrentCity() {
	// 	setCurrentCity({});
	// }

	return (
		<CityContext.Provider
			value={{
				cities,
				isLoading,
				getCurrentCity,
				currentCity,
				error,
				resetCurrentCity,
				// clearCurrentCity,
				// currentPosition,
				addCity,
				deleteItem,
			}}>
			{children}
		</CityContext.Provider>
	);
}

function useCityContext() {
	const value = useContext(CityContext);
	if (value === undefined)
		throw new Error("The variable was used outside the scope of the context");
	return value;
}
export { CitiesProvider, useCityContext };
