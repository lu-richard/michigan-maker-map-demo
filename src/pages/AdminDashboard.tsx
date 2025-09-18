import { useContext } from "react";
import { AppContext } from "./App";
import styles from '../styles/adminDashboard.module.css';

function AdminDashboard() {
    const { profile } = useContext(AppContext);

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.tab}>
                    <p className={styles["tab-name"]}>Dashboard</p>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <p className={styles["tab-name"]}>My Tasks</p>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <p className={styles["tab-name"]}>Usage Statistics</p>
                    <div className={styles["hover-line"]}></div>
                </div>
            </div>
            <div className={styles.container}>
                <h1 className={styles.greeting}>Welcome back, {profile!["first_name"]}!</h1>
                <div className={styles["main-content"]}>
                    <section className={styles["latest-notifications"]}>
                        <h3 className={styles["section-heading"]}>Latest Notifications</h3>
                    </section>
                    <section>
                        <h3 className={styles["section-heading"]}>Design Lab Usage</h3>
                    </section>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;