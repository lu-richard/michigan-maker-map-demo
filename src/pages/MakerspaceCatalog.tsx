import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../types/types";
import MakerspaceCard from "../components/MakerspaceCard";
import styles from '../styles/catalog.module.css';
import { useState } from "react";

function MakerspaceCatalog() {
    const [searchValue, setSearchValue] = useState("");
    const { makerspaces }: OutletContext = useOutletContext();

    return (
        <div className={styles.container}>
            <h1 className={styles["main-heading"]}>U-M Makerspaces</h1>
            <input type="text" value={searchValue} placeholder="Search makerspaces by name, description, location, equipment, theme, or audience" className={styles["search-bar"]} onChange={(e) => setSearchValue(e.target.value)} />
            <div className={styles.grid}>
                {makerspaces.map((makerspace) => <MakerspaceCard key={makerspace["makerspace_id"]} makerspace={makerspace} /> )}
            </div>
        </div>
    );
}

export default MakerspaceCatalog;