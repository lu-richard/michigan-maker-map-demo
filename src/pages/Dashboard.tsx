import DashboardNavBar from '../components/DashboardNavBar';
import styles from '../styles/dashboard.module.css';
import { useOutletContext } from 'react-router-dom';
import type { OutletContext } from '../types/types'; // <-- Import OutletContext

function Dashboard() {
    const context = useOutletContext<OutletContext>();
    console.log('Outlet context in Dashboard:', context);
    const { profile } = context || {};
    console.log('Profile data:', profile);

    return (
        <>
            <DashboardNavBar />
            <div className={styles.container}>
                <h1 className={styles.header}>Welcome Back, {profile?.first_name ? profile.first_name : 'User'}!</h1>
                <div className={styles.section}>
                    <h2>Completed Trainings</h2>
                </div>
                <div className={styles.section}>
                    <h2>Suggested Trainings</h2>
                    {/* write a suggestions engine for this */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;