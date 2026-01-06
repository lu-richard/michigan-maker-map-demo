import CoverImage from '../assets/jpgs/makerspace.jpeg';
import FindMakerspaceImage from '../assets/jpgs/find_makerspace.jpg';
import FindEquipmentImage from '../assets/jpgs/find_equipment.jpeg';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className={styles.container}>
            <img src={CoverImage} className={styles["cover-image"]} />
            <div className={styles["text-content"]}>
                <h1 className={styles["main-heading"]}>Welcome to <span className={styles.emphasis}>MAKE MICHIGAN!</span></h1>
                <ul className={styles.list}>
                    <li className={styles.point}>Explore every public facility on North Campus to see what’s available</li>
                    <li className={styles.point}>See guided training pathways to know exactly what’s needed for access</li>
                    <li className={styles.point}>Track your certifications through a personal dashboard</li>
                    <li className={styles.point}>Receive real-time support from a custom U-M Maizey AI assistant</li>
                    <li className={styles.point}>Report issues such as broken tools or missing supplies</li>
                    <li className={styles.point}>Contribute to safer, more confident maker communities</li>
                </ul>
            </div>
            <div className={styles.cards}>
                <Link to='makerspaces' className={styles.card}>
                    <h3 className={styles["card-heading"]}>Find a Facility</h3>
                    <img src={FindMakerspaceImage} className={styles["card-image"]} />
                </Link>
                <Link to='equipment' className={styles.card}>
                    <h3 className={styles["card-heading"]}>Find Equipment</h3>
                    <img src={FindEquipmentImage} className={styles["card-image"]} />
                </Link>
            </div>
        </div>
    );
}

export default Home;