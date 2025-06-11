import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/");
		}
	}, [navigate, isAuthenticated]);
	return <> {isAuthenticated ? children : null}</>;
}

export default ProtectedRoute;
