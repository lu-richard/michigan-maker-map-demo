import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../types/types";
import Card from "../components/Card";
import styles from '../styles/catalog.module.css';

function MakerspaceCatalog() {
    const { makerspaces }: OutletContext = useOutletContext();

    return (
        <>
            <p>This is the makerspace catalog</p>
            <div className={styles.grid}>
                {makerspaces.map((makerspace) => <Card key={makerspace["makerspace_id"]} makerspace={makerspace} /> )}
            </div>
        </>
    );
}

export default MakerspaceCatalog;