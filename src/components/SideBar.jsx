import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function SideBar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<footer className={styles.footer}>
				<p className={styles.copyright}>
					&copy; Copyright {new Date().getFullYear()} by Worldwise company .inc
				</p>
			</footer>
		</div>
	);
}

export default SideBar;
