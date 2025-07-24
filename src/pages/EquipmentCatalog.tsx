import styles from '../styles/catalog.module.css';
import { useState } from 'react';
import type { OutletContext } from '../types/types';
import { useOutletContext } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';

function EquipmentCatalog() {
    const [searchValue, setSearchValue] = useState("");
    const { equipment, makerspaces }: OutletContext = useOutletContext();

    return (
        <div className={styles.container}>
            <h1 className={styles["main-heading"]}>U-M Equipment</h1>
            <input type="text" value={searchValue} placeholder="Search equipment by model, make, type, function, material, or  other specifications" className={styles["search-bar"]} onChange={(e) => setSearchValue(e.target.value)} />
            <div className={styles["equipment-grid"]}>
                {Object.values(equipment).map((eq) => <EquipmentCard key={eq["equipment_id"]} equipment={{ id: eq["equipment_id"], name: eq["equipment_name"], building: makerspaces[eq["makerspace_id"]].building, rooms: makerspaces[eq["makerspace_id"]].rooms }} />)}
            </div>
        </div>
    );
}

export default EquipmentCatalog;