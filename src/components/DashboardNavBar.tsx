import styles from '../styles/dashboardNavBar.module.css';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
    { to: '/dashboard', label: 'My Dashboard' },
    { to: '/dashboard/my-access', label: 'My Access' },
    { to: '/dashboard/wishlist', label: 'Wishlist' },
];

function DashboardNavBar() {
    const location = useLocation();

    return (
        <div className={styles.navbar}>
            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <Link
                        key={tab.to}
                        to={tab.to}
                        className={`${styles.tab} ${location.pathname === tab.to ? styles.active : ''}`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default DashboardNavBar;