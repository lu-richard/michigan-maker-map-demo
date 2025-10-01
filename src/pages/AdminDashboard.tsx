import { Outlet, Link } from 'react-router-dom';
import styles from '../styles/adminDashboard.module.css';

function AdminDashboard() {
    return (
        <>
            <div className={styles.navbar}>
                <Link to='/admindashboard' className={styles.tab}>
                    <p className={styles["tab-name"]}>Notifications</p>
                    <div className={styles["hover-line"]}></div>
                </Link>
                <Link to='training' className={styles.tab}>
                    <p className={styles["tab-name"]}>Training</p>
                    <div className={styles["hover-line"]}></div>
                </Link>
                <Link to='usage' className={styles.tab}>
                    <p className={styles["tab-name"]}>Usage Statistics</p>
                    <div className={styles["hover-line"]}></div>
                </Link>
            </div>
            <Outlet />
        </>
    );
}

export default AdminDashboard;