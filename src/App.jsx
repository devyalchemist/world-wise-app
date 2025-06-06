import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Form from "./components/Form";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
// import PageNav from "./components/PageNav";

function App() {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountry() {
			try {
				setIsLoading(true);
				const result = await fetch("http://localhost:8000/cities");
				if (!result.ok)
					throw new Error("An error occured while fetching data!");
				const data = await result.json();
				setIsLoading(false);
				console.log(cities, isLoading);
				setCities(data);
			} catch (err) {
				alert(err.message);
			} finally {
				setIsLoading(false);
			}
		}
		fetchCountry();
	}, []);
	return (
		<>
			{/* <PageNav /> */}

			<BrowserRouter>
				<Routes>
					<Route path="product" element={<Product />} />
					<Route path="pricing" element={<Pricing />} />
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<PageNotFound />} />
					<Route path="login" element={<Login />} />
					<Route path="app" element={<AppLayout />}>
						<Route index element={<Navigate replace to="cities" />} />
						<Route
							path="cities"
							element={<CityList cities={cities} isLoading={isLoading} />}
						/>
						<Route path="cities/:id" element={<City />} />
						<Route
							path="countries"
							element={<CountryList cities={cities} isLoading={isLoading} />}
						/>
						<Route path="form" element={<Form />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
