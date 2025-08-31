import { useContext } from "react";
import { AppContext } from "./App";
import styles from '../styles/adminDashboard.module.css';

function AdminDashboard() {
    const { profile } = useContext(AppContext);


    return (
        <div className={styles.container}>
            <h1 className={styles.greeting}>Welcome, {profile!["first_name"]}!</h1>
            <section className={styles["verify-student-creds-section"]}>
                <h2 className={styles["section-heading"]}>Verify Student Credentials</h2>
                <div className={styles["section-content"]}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dignissimos praesentium temporibus aliquid laborum dolor. Deserunt autem animi vel unde quas vero. Reiciendis aliquam consequatur nisi enim itaque deleniti repudiandae.</p>
                </div>
            </section>
            <section className={styles["resolve-student-reports-redirect"]}>
                <h2>Resolve Reports from Students</h2>
            </section>
        </div>
    );
}

export default AdminDashboard;