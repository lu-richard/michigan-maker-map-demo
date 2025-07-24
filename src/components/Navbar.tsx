import styles from '../styles/navbar.module.css';

function Navbar() {
    return (
        <div className={styles["navbar"]}>
            <div>
                <h1>Michigan Maker Map</h1>
                <h3>University of Michigan</h3>
            </div>
        </div>
    );
}

export default Navbar;