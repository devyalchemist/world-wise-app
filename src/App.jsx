import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

// dist/assets/index-d05ae526.css   30.35 kB │ gzip:   5.10 kB
// dist/assets/index-717dbc68.js   510.42 kB │ gzip: 149.26 kB

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// const Pricing = lazy()

import CityList from "./components/CityList";
import Form from "./components/Form";
// import { useEffect, useState } from "react";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountryList from "./components/CountryList";
import City from "./components/City";
import { AuthProvider } from "./contexts/useAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import PageNav from "./components/PageNav";

function App() {
	return (
		<>
			<AuthProvider>
				<CitiesProvider>
					<BrowserRouter>
						<Suspense fallback={<SpinnerFullPage />}>
							<Routes>
								<Route path="product" element={<Product />} />
								<Route path="pricing" element={<Pricing />} />
								<Route path="/" element={<HomePage />} />
								<Route path="*" element={<PageNotFound />} />
								<Route path="login" element={<Login />} />
								<Route
									path="app"
									element={
										// <ProtectedRoute>
										<AppLayout />
										// </ProtectedRoute> */}
									}>
									<Route index element={<Navigate replace to="cities" />} />
									<Route path="form" element={<Form />} />
									<Route path="cities" element={<CityList />} />
									<Route path="cities/:id" element={<City />} />
									<Route path="countries" element={<CountryList />} />
								</Route>
							</Routes>
						</Suspense>
					</BrowserRouter>
				</CitiesProvider>
			</AuthProvider>
		</>
	);
}

export default App;
