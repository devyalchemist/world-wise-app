import { createContext, useContext, useReducer } from "react";

const authContext = createContext();
const initialState = {
	isAuthenticated: false,
	details: null,
};
const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, isAuthenticated: true, details: action.payload };
		case "logout":
			return { ...state, isAuthenticated: false, details: null };
		default:
			throw new Error("The action type doesn't match any of the parameters");
	}
}

function AuthProvider({ children }) {
	const [{ isAuthenticated, details }, dispatch] = useReducer(
		reducer,
		initialState
	);

	function login(email, password) {
		if (!email || !password) return;
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		}
	}
	function logout() {
		dispatch({ type: "logout" });
	}
	return (
		<authContext.Provider value={{ isAuthenticated, details, login, logout }}>
			{children}
		</authContext.Provider>
	);
}

function useAuth() {
	const context = useContext(authContext);
	if (context === undefined)
		throw new Error("The context was used outside the scope of the Provider");
	return context;
}

export { useAuth, AuthProvider };
