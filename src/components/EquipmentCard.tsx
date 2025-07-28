import type { EquipmentCardProps } from "../types/types";
import styles from '../styles/equipmentCard.module.css';

function EquipmentCard({ equipmentCard }: EquipmentCardProps) {
    return (
        <div className={styles.card}>
            <h1 className={styles.type}>{equipmentCard["equipment_type"]}</h1>
            <h2 className={styles.name}>{equipmentCard["equipment_model_name"]}</h2>
            <div className={styles.location}>
                <p>{equipmentCard.building}</p>
                {equipmentCard.rooms && <p>{equipmentCard.rooms.map((room, index) => <span key={room}>{room}{index < equipmentCard.rooms!.length - 1 && ', '}</span>)}</p>}
            </div>
            {equipmentCard.capabilities && <p>{equipmentCard.capabilities.map((capability, index) => <span key={capability}>{capability}{index < equipmentCard.capabilities!.length - 1 && ', '}</span>)}</p>}
        </div>
    );
}

export default EquipmentCard;