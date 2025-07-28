import type { EquipmentCardProps } from "../types/types";
import styles from '../styles/equipmentCard.module.css';

function EquipmentCard({ equipment }: EquipmentCardProps) {
    return (
        <div className={styles.card}>
            <h1 className={styles.type}>{equipment.type}</h1>
            <h2 className={styles.name}>{equipment.name}</h2>
            <div className={styles.location}>
                <p>{equipment.building}</p>
                <p>{equipment.rooms.map((room, index) => <span key={room}>{room}{index < equipment.rooms.length - 1 && ', '}</span>)}</p>
            </div>
        </div>
    );
}

export default EquipmentCard;