import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/useAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("jack@example.com");
	const [password, setPassword] = useState("qwerty");
	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	console.log(isAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			navigate("/app", { replace: true });

			console.log("navigate");
		}
	}, [isAuthenticated, navigate]);

	function handleSubmit(e) {
		e.preventDefault();
		if (email && password) {
			login(email, password);
		}
	}

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type="primary" onClick={handleSubmit}>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
