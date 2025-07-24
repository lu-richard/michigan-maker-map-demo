import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className={styles["navbar"]}>
            <div className={styles["logo"]}>
                <h1>Michigan Maker Map</h1>
                <h3>University of Michigan</h3>
            </div>
            <div className={styles.tabs}>
                <Link to='map' className={styles.tab}>Map</Link>
                <Link to='makerspaces' className={styles.tab}>Find a Makerspace</Link>
                <Link to='equipment' className={styles.tab}>Find an Equipment</Link>
                <Link to='dashboard' className={styles.tab}>My Dashboard</Link>
                <Link to='askmaizey' className={styles.tab}>Ask MAIZEY</Link>
                <Link to='blog' className={styles.tab}>Blog</Link>
            </div>
        </div>
    );
}

export default Navbar;