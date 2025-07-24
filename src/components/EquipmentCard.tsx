import type { EquipmentCardProps } from "../types/types";
import styles from '../styles/card.module.css';

function EquipmentCard({ equipment }: EquipmentCardProps) {
    return (
        <div className={styles.card}>
            <h1 className={styles.name}>{equipment.name}</h1>
            <p>{equipment.building}</p>
            <p>{equipment.rooms.map((room, index) => <span key={room}>{room}{index < equipment.rooms.length - 1 && ', '}</span>)}</p>
        </div>
    );
}

export default EquipmentCard;