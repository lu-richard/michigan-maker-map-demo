import type { EquipmentCardProps } from "../types/types";
import styles from '../styles/equipmentCard.module.css';
import supabase from "../lib/supabase";

function EquipmentCard({ equipmentCard }: EquipmentCardProps) {
    let coverImage: string | null = null;

    if (equipmentCard["manufacturer_image_urls"] && equipmentCard["manufacturer_image_urls"].length > 0) {
        const { data } = supabase
            .storage
            .from('equipment-model-photos')
            .getPublicUrl(equipmentCard["manufacturer_image_urls"][0]);
        
        coverImage = data.publicUrl;
    }

    return (
        <div className={styles.card}>
            {coverImage && <img src={coverImage} />}
            <h1 className={styles.type}>{equipmentCard["equipment_type"]}</h1>
            <h2 className={styles.name}>{equipmentCard["equipment_model_name"]}</h2>
            <div className={styles.location}>
                <p>{equipmentCard.building}</p>
                {equipmentCard.rooms && <p>{equipmentCard.rooms.map((room, index) => <span key={room}>{room}{index < equipmentCard.rooms!.length - 1 && ', '}</span>)}</p>}
            </div>
            <p className={styles.functions}>Functions</p>
            {equipmentCard.capabilities && <p>{equipmentCard.capabilities.map((capability, index) => <span key={capability}>{capability}{index < equipmentCard.capabilities!.length - 1 && ', '}</span>)}</p>}
        </div>
    );
}

export default EquipmentCard;